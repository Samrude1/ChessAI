import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import type { Move } from 'chess.js';
import Chessboard from './components/Chessboard';
import AICommentary from './components/AICommentary';
import MoveHistory from './components/MoveHistory';
import CapturedPieces from './components/CapturedPieces';
import GameStartModal from './components/GameStartModal';
import { findBestMove } from './services/chessEngine';
import { getAiCommentary } from './services/geminiService';
import { soundEngine } from './services/soundService';
import type { Commentary, Mood } from './types';

const App: React.FC = () => {
    const [game, setGame] = useState<Chess>(new Chess());
    const [gameVersion, setGameVersion] = useState(0);
    const [playerColor, setPlayerColor] = useState<'w' | 'b' | null>(null);
    const [commentaries, setCommentaries] = useState<Commentary[]>([]);
    const [isCommentaryLoading, setIsCommentaryLoading] = useState(false);
    const [isBotThinking, setIsBotThinking] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [status, setStatus] = useState("SYSTEM STANDBY...");

    const gameRef = useRef(game);
    gameRef.current = game;

    // Initialize Audio on first click to satisfy browser policies
    useEffect(() => {
        const initAudio = () => {
            soundEngine.init();
            soundEngine.startAmbience();
            window.removeEventListener('click', initAudio);
            window.removeEventListener('keydown', initAudio);
        };
        window.addEventListener('click', initAudio);
        window.addEventListener('keydown', initAudio);
        return () => {
            window.removeEventListener('click', initAudio);
            window.removeEventListener('keydown', initAudio);
        };
    }, []);

    const updateStatus = useCallback(() => {
        let newStatus = '';
        const turn = game.turn() === 'w' ? 'WHITE' : 'BLACK';

        if (game.isCheckmate()) {
            newStatus = `CRITICAL FAILURE: CHECKMATE. ${turn === 'WHITE' ? 'BLACK' : 'WHITE'} VICTORIOUS.`;
            setGameOver(true);
            soundEngine.playCheck(); // End game sound
        } else if (game.isDraw()) {
            newStatus = "STALEMATE DETECTED. GAME DRAWN.";
            setGameOver(true);
            soundEngine.playCheck();
        } else {
            newStatus = `> TURN: ${turn}`;
            if (game.inCheck()) {
                newStatus += ' [WARNING: KING UNDER THREAT]';
                soundEngine.playCheck();
            }
        }
        setStatus(newStatus);
    }, [game]);

    // Determine Yes Man's mood based on game state
    const getMood = (): Mood => {
        if (isBotThinking || isCommentaryLoading) return 'thinking';
        if (game.inCheck() || game.isCheckmate()) return 'excited';
        return 'neutral';
    };

    const startGame = (color: 'w' | 'b') => {
        soundEngine.playGameStart();
        const newGame = new Chess();
        setGame(newGame);
        setPlayerColor(color);
        setCommentaries([]);
        setGameOver(false);
        setIsBotThinking(false);
        setIsCommentaryLoading(false);
        setGameVersion(v => v + 1);
        setStatus("INITIALIZING NEW SIMULATION...");
    };

    const fetchCommentary = useCallback(async (pgn: string, lastMove: string, reason: string) => {
        if (!playerColor) return;

        setIsCommentaryLoading(true);
        try {
            const moveNumber = Math.ceil(gameRef.current.history().length / 2);
            // gameRef.current.turn() returns the player to move NEXT. 
            // So the player who JUST moved is the opposite.
            const nextTurn = gameRef.current.turn();
            const justMovedColor = nextTurn === 'w' ? 'b' : 'w';
            const playerType = justMovedColor === playerColor ? 'Human' : 'Bot';

            const comment = await getAiCommentary(pgn, lastMove, reason, playerType, playerColor);

            setCommentaries(prev => [...prev, { moveNumber, player: playerType, move: lastMove, comment }]);
            soundEngine.playComputerProcessing();
        } catch (error) {
            console.error("Error fetching commentary:", error);
        } finally {
            setIsCommentaryLoading(false);
        }
    }, [playerColor]);

    const decideOnCommentary = (move: Move): { shouldComment: boolean; reason: string } => {
        // Strict filtering to reduce spam: Only comment on significant events.

        if (gameRef.current.isCheckmate()) return { shouldComment: true, reason: 'Game over: Checkmate.' };
        if (gameRef.current.isDraw()) return { shouldComment: true, reason: 'Game over: Draw.' };

        // Check
        if (move.san.includes('+') || move.san.includes('#')) return { shouldComment: true, reason: 'Check.' };

        // Capture
        if (move.captured || move.flags.includes('c')) return { shouldComment: true, reason: 'Piece captured.' };

        // Promotion
        if (move.promotion || move.flags.includes('p')) return { shouldComment: true, reason: 'Pawn promotion.' };

        // Castling (Strategic move)
        if (move.san.includes('O-O')) return { shouldComment: true, reason: 'Castling.' };

        // Rarely comment on other moves to act alive (5% chance)
        if (Math.random() < 0.05) {
            return { shouldComment: true, reason: 'General gameplay observation. No specific tactic, just random chatter.' };
        }

        return { shouldComment: false, reason: '' };
    };

    const makeBotMove = useCallback(async () => {
        if (gameRef.current.isGameOver()) return;
        if (gameRef.current.turn() === playerColor) return;
        if (isBotThinking) return; // Prevent multiple simultaneous requests

        setIsBotThinking(true);
        try {
            const bestMove = await findBestMove(gameRef.current);

            if (bestMove) {
                if (!gameRef.current.isGameOver() && gameRef.current.turn() !== playerColor) {
                    const gameInstance = gameRef.current;
                    const result = gameInstance.move(bestMove.san);
                    if (result) {
                        setGame(gameInstance);
                        setGameVersion(v => v + 1);

                        if (result.captured) soundEngine.playCapture();
                        else soundEngine.playMove();

                        updateStatus();
                        const decision = decideOnCommentary(result);
                        if (decision.shouldComment) {
                            fetchCommentary(gameInstance.pgn(), result.san, decision.reason);
                        }

                        // Only set false AFTER successfully applying the move
                        setIsBotThinking(false);
                    } else {
                        // Move failed to apply
                        setIsBotThinking(false);
                    }
                } else {
                    setIsBotThinking(false);
                }
            } else {
                setIsBotThinking(false);
            }
        } catch (error) {
            console.error("Bot Move Error:", error);
            setIsBotThinking(false);
            setStatus("ERROR: AI NEURAL LINK SEVERED. REBOOT REQUIRED.");
        }
    }, [updateStatus, fetchCommentary, playerColor, isBotThinking]);

    const handlePlayerMove = (move: any): boolean => {
        if (gameOver || !playerColor) return false;
        if (game.turn() !== playerColor) return false;

        try {
            const result = game.move(move);
            if (result === null) return false;

            if (result.captured) soundEngine.playCapture();
            else soundEngine.playMove();

            setGameVersion(v => v + 1);
            updateStatus();

            const decision = decideOnCommentary(result);
            if (decision.shouldComment) {
                fetchCommentary(game.pgn(), result.san, decision.reason);
            }
            return true;
        } catch (e) {
            console.warn("Invalid move:", e);
            return false;
        }
    };

    useEffect(() => {
        if (playerColor && !gameOver) {
            if (game.turn() !== playerColor) {
                makeBotMove();
            }
        }
    }, [gameVersion, playerColor, gameOver, makeBotMove, game]);

    useEffect(() => {
        updateStatus();
    }, [updateStatus]);

    return (
        <div className="h-screen w-full relative overflow-hidden bg-black flex flex-col">
            {/* CRT Overlay Effects */}
            <div className="scanlines"></div>
            <div className="rgb-shift"></div>
            <div className="crt-noise"></div>
            <div className="crt-flicker"></div>
            <div className="crt-curve"></div>

            {!playerColor && <GameStartModal onSelectSide={startGame} />}

            <div className="flex-1 w-full h-full p-2 sm:p-4 flex flex-col lg:flex-row gap-2 lg:gap-4 relative z-10 overflow-hidden max-w-[1800px] mx-auto">

                {/* LEFT COLUMN: Data Log (Desktop) */}
                <aside className="hidden lg:flex flex-col lg:w-64 xl:w-80 gap-4 h-full overflow-hidden shrink-0">
                    <div className="terminal-border flex-1 flex flex-col p-3 bg-black min-h-0">
                        <div className="border-b-2 border-theme mb-2 pb-2">
                            <h2 className="text-2xl font-bold tracking-widest glow-text">DATA LOG</h2>
                        </div>
                        <MoveHistory game={game} />
                    </div>
                    <div className="terminal-border p-4 bg-black shrink-0">
                        <h2 className="text-xl font-bold border-b border-theme mb-3 pb-1 tracking-widest uppercase text-theme">Casualties</h2>
                        <CapturedPieces game={game} playerColor={playerColor || 'w'} />
                    </div>
                </aside>

                {/* CENTER: Chessboard */}
                {/* min-w-0 and flex-1 allows this to shrink/grow as needed, but we give it priority on mobile */}
                <main className="flex-1 flex flex-col min-h-0 min-w-0">
                    <header className="lg:hidden w-full flex justify-between items-center mb-2 px-2 border-b-2 border-theme pb-2 bg-black shrink-0">
                        <h1 className="text-2xl font-bold glow-text">ROBCO CHESS</h1>
                        <div className="text-lg bg-theme-dim text-theme px-2 py-1 font-bold border border-theme">{status}</div>
                    </header>

                    <div className="flex-1 flex items-center justify-center min-h-0 min-w-0 p-1 overflow-hidden">
                        {/* 
                            Board Container:
                            Using aspect-square, max-h-full, and max-w-full ensures it fits within 
                            whichever dimension is tighter (width or height), preventing overlap.
                        */}
                        <div className="relative terminal-border bg-black p-2 aspect-square max-h-full max-w-full flex items-center justify-center">
                            {/* Decorative 'bolts' */}
                            <div className="absolute top-1 left-1 w-2 h-2 bg-theme-dim rounded-full"></div>
                            <div className="absolute top-1 right-1 w-2 h-2 bg-theme-dim rounded-full"></div>
                            <div className="absolute bottom-1 left-1 w-2 h-2 bg-theme-dim rounded-full"></div>
                            <div className="absolute bottom-1 right-1 w-2 h-2 bg-theme-dim rounded-full"></div>

                            <div className="w-full h-full relative">
                                <Chessboard
                                    game={game}
                                    onMove={handlePlayerMove}
                                    orientation={playerColor || 'w'}
                                />

                                {gameOver && (
                                    <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center border-4 border-theme">
                                        <h2 className="text-4xl sm:text-5xl font-bold text-theme mb-4 glow-text text-center px-4 tracking-widest">
                                            GAME OVER
                                        </h2>
                                        <p className="mb-8 text-white text-xl sm:text-2xl font-mono text-center px-4">{status}</p>
                                        <button
                                            onClick={() => setPlayerColor(null)}
                                            className="px-6 py-3 sm:px-8 sm:py-4 bg-theme-dim text-theme font-bold text-xl sm:text-2xl hover:bg-theme hover:text-black border-2 border-theme uppercase tracking-wider transition-colors"
                                        >
                                            Reboot System
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Status / Captured */}
                    <div className="lg:hidden w-full mt-2 terminal-border p-2 bg-black shrink-0">
                        <CapturedPieces game={game} playerColor={playerColor || 'w'} />
                    </div>
                </main>

                {/* RIGHT COLUMN: AI Commentary */}
                {/* 
                   Mobile: h-[35vh] (Fixed height to prevent growing indefinitely)
                   Desktop: h-auto (Fills remaining height if needed, or flex-grown by parent)
                */}
                <aside className="flex flex-col w-full lg:w-80 xl:w-96 lg:h-full gap-4 shrink-0 h-[35vh] lg:h-auto lg:min-h-0">
                    <div className="terminal-border flex-1 flex flex-col p-4 bg-black relative overflow-hidden h-full min-h-0">
                        <AICommentary
                            commentaries={commentaries}
                            isLoading={isCommentaryLoading}
                            isBotThinking={isBotThinking}
                            mood={getMood()}
                        />
                    </div>

                    <div className="hidden lg:block terminal-border p-4 text-center bg-black shrink-0">
                        <p className="text-theme font-bold tracking-widest animate-pulse text-xl">{status}</p>
                        <button
                            onClick={() => setPlayerColor(null)}
                            className="mt-4 text-lg text-theme hover:text-white hover:underline decoration-dashed uppercase font-bold"
                        >
                            [ ABORT SIMULATION ]
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default App;