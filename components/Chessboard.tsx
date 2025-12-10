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

                // Theme: Phosphor Blue & Black
                // Light squares = Dark Blue-Grey (#0a1f29)
                // Dark squares = Pure Black (#000)
                const bgClass = isLightSquare ? 'bg-[#0a1f29]' : 'bg-black';

                cols.push(
                    <div
                        key={squareName}
                        onClick={() => handleSquareClick(squareName)}
                        className={`w-full h-full flex items-center justify-center relative select-none
                            ${bgClass} border-[0.5px] border-[#80dfff]/10
                            ${isCheck ? 'bg-red-900/50 animate-pulse' : ''}`}
                    >
                        {/* Coordinates: Increased size (text-lg) for better readability */}
                        {orientation === 'w' && c === 0 && <span className="absolute top-0.5 left-1 text-lg sm:text-xl text-[#80dfff] font-mono font-bold z-10">{rankChar}</span>}
                        {orientation === 'w' && r === 7 && <span className="absolute bottom-0 right-1 text-lg sm:text-xl text-[#80dfff] font-mono font-bold z-10">{fileChar}</span>}

                        {/* Highlight Last Move */}
                        {isLastMove && <div className="absolute inset-0 bg-[#80dfff]/20 border border-[#80dfff]"></div>}

                        {/* Highlight Selection */}
                        {isSelected && <div className="absolute inset-0 bg-[#80dfff]/30 border-2 border-[#80dfff]"></div>}

                        {/* Piece */}
                        <div
                            className="z-10 w-full h-full p-1 sm:p-2 transform transition-transform duration-100"
                        >
                            {piece && PIECE_COMPONENTS[`${piece.color}${piece.type.toUpperCase()}`]}
                        </div>

                        {/* Move Indicators */}
                        {isPossibleMove && !isCapture && (
                            <div className="absolute w-3 h-3 bg-[#80dfff] rounded-sm z-20 shadow-[0_0_8px_#80dfff] opacity-80"></div>
                        )}
                        {isCapture && (
                            <div className="absolute inset-0 border-4 border-[#80dfff] z-20">
                                <div className="absolute top-0 right-0 text-base font-bold bg-[#80dfff] text-black px-1 tracking-wider">TARGET</div>
                            </div>
                        )}
                    </div>
                );
            }
            rows.push(<div key={r} className="flex flex-1 w-full">{cols}</div>);
        }
        return rows;
    }

    return (
        <div className="flex flex-col w-full h-full border-4 border-[#80dfff]/30 shadow-[0_0_15px_rgba(128,223,255,0.2)]">
            {renderGrid()}
        </div>
    );
};

export default Chessboard;