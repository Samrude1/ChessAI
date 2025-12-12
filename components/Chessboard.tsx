import React, { useState, useMemo } from 'react';
import { Chess, type Square } from 'chess.js';
import { PIECE_COMPONENTS } from '../constants';

interface ChessboardProps {
    game: Chess;
    onMove: (move: { from: string; to: string; promotion?: string }) => boolean;
    orientation: 'w' | 'b';
}

const Chessboard: React.FC<ChessboardProps> = ({ game, onMove, orientation }) => {
    const [fromSquare, setFromSquare] = useState<Square | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);

    const board = useMemo(() => game.board(), [game.fen()]);

    const handleSquareClick = (square: Square) => {
        if (game.turn() !== orientation) {
            // Not player's turn
        }

        if (fromSquare) {
            const move = { from: fromSquare, to: square, promotion: 'q' };
            const isMoveValid = game.moves({ square: fromSquare, verbose: true }).some(m => m.to === square);

            if (isMoveValid) {
                const moveSuccessful = onMove(move);
                if (moveSuccessful) {
                    setFromSquare(null);
                    setPossibleMoves([]);
                }
            } else {
                const piece = getPieceAt(square);
                if (piece && piece.color === game.turn()) {
                    setFromSquare(square);
                    const moves = game.moves({ square, verbose: true });
                    setPossibleMoves(moves.map(m => m.to));
                } else {
                    setFromSquare(null);
                    setPossibleMoves([]);
                }
            }
        } else {
            const piece = getPieceAt(square);
            if (piece && piece.color === game.turn()) {
                setFromSquare(square);
                const moves = game.moves({ square, verbose: true });
                setPossibleMoves(moves.map(m => m.to));
            }
        }
    };

    const getPieceAt = (square: Square) => {
        return game.get(square);
    }

    const lastMove = game.history({ verbose: true }).slice(-1)[0];

    const renderGrid = () => {
        const rows = [];
        for (let r = 0; r < 8; r++) {
            const cols = [];
            for (let c = 0; c < 8; c++) {
                let fileIdx, rankIdx;

                if (orientation === 'w') {
                    rankIdx = 7 - r;
                    fileIdx = c;
                } else {
                    rankIdx = r;
                    fileIdx = 7 - c;
                }

                const fileChar = String.fromCharCode(97 + fileIdx);
                const rankChar = String(rankIdx + 1);
                const squareName = `${fileChar}${rankChar}` as Square;

                const piece = game.get(squareName);
                const isLightSquare = (rankIdx + fileIdx) % 2 !== 0;
                const isSelected = fromSquare === squareName;
                const isPossibleMove = possibleMoves.includes(squareName);
                const isLastMove = lastMove && (lastMove.from === squareName || lastMove.to === squareName);
                const isCheck = game.inCheck() && piece?.type === 'k' && piece?.color === game.turn();
                const isCapture = isPossibleMove && piece;


                // Light squares use theme color, dark squares are black
                const bgClass = !isLightSquare ? 'bg-black' : '';

                cols.push(
                    <div
                        key={squareName}
                        onClick={() => handleSquareClick(squareName)}
                        className={`w-full h-full flex items-center justify-center relative select-none
                            ${!isLightSquare ? 'bg-black' : ''}
                            ${isCheck ? 'animate-pulse border-2 border-theme' : ''}`}
                    >
                        {/* Light square background - as a separate layer */}
                        {isLightSquare && !isCheck && <div className="absolute inset-0 bg-theme-square-light pointer-events-none z-0"></div>}

                        {/* Check state background */}
                        {isCheck && <div className="absolute inset-0 bg-theme-check pointer-events-none z-0"></div>}

                        {/* Highlight Last Move - Corner Dots */}
                        {isLastMove && (
                            <>
                                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-theme rounded-full opacity-60 z-[1]"></div>
                                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-theme rounded-full opacity-60 z-[1]"></div>
                                <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 bg-theme rounded-full opacity-60 z-[1]"></div>
                                <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-theme rounded-full opacity-60 z-[1]"></div>
                            </>
                        )}

                        {/* Highlight Selection */}
                        {isSelected && <div className="absolute inset-0 border-2 border-theme bg-theme-highlight-strong z-[2]"></div>}

                        {/* Piece */}
                        <div
                            className="z-10 w-full h-full p-[2px] sm:p-1"
                        >
                            {piece && (PIECE_COMPONENTS[`${piece.color}${piece.type.toUpperCase()}`] || null)}
                        </div>

                        {/* Move Indicators */}
                        {isPossibleMove && !isCapture && (
                            <div className="absolute w-3 h-3 rounded-sm z-20 opacity-80" style={{ backgroundColor: 'var(--terminal-blue)', boxShadow: '0 0 8px var(--terminal-blue)' }}></div>
                        )}
                        {isCapture && (
                            <div className="absolute inset-0 border-4 border-theme z-20">
                                <div className="absolute top-0 right-0 text-base font-bold text-black px-1 tracking-wider" style={{ backgroundColor: 'var(--terminal-blue)' }}>TARGET</div>
                            </div>
                        )}
                    </div>
                );
            }
            rows.push(cols);
        }
        return rows;
    }

    return (
        <div
            className="w-full h-full border-4 grid"
            style={{
                borderColor: 'color-mix(in srgb, var(--terminal-blue) 30%, transparent)',
                boxShadow: '0 0 15px color-mix(in srgb, var(--terminal-blue) 20%, transparent)',
                gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
                gridTemplateRows: 'repeat(8, minmax(0, 1fr))'
            }}
        >
            {renderGrid().flat()}
        </div>
    );
};

export default Chessboard;