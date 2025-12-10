import React from 'react';
import { Chess } from 'chess.js';
import { PIECE_COMPONENTS } from '../constants';

interface CapturedPiecesProps {
    game: Chess;
    playerColor: 'w' | 'b';
}

const CapturedPieces: React.FC<CapturedPiecesProps> = ({ game, playerColor }) => {
    const history = game.history({ verbose: true });
    const whiteCaptured: string[] = [];
    const blackCaptured: string[] = [];

    history.forEach(move => {
        if (move.captured) {
            if (move.color === 'w') {
                blackCaptured.push(move.captured);
            } else {
                whiteCaptured.push(move.captured);
            }
        }
    });

    const sortOrder = { q: 1, r: 2, b: 3, n: 4, p: 5 };
    const sorter = (a: string, b: string) => sortOrder[a as keyof typeof sortOrder] - sortOrder[b as keyof typeof sortOrder];

    whiteCaptured.sort(sorter);
    blackCaptured.sort(sorter);

    const renderRow = (pieces: string[], color: 'w' | 'b', label: string) => (
        <div className="flex flex-col mb-3">
            <span className="text-lg text-theme uppercase tracking-wider mb-2 font-bold opacity-90">[{label}]</span>
            <div className="flex flex-wrap gap-2 items-center min-h-[32px]">
                {pieces.length === 0 && <span className="text-lg text-theme opacity-80 italic">NO DATA</span>}
                {pieces.map((p, i) => (
                    <div
                        key={i}
                        className="w-8 h-8"
                    >
                        {PIECE_COMPONENTS[`${color}${p.toUpperCase()}`]}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-2">
            {renderRow(blackCaptured, 'b', 'ENEMIES NEUTRALIZED')}
            {renderRow(whiteCaptured, 'w', 'FRIENDLY LOSSES')}
        </div>
    );
};

export default CapturedPieces;