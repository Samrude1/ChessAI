import React, { useEffect, useRef } from 'react';
import { Chess } from 'chess.js';

interface MoveHistoryProps {
    game: Chess;
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ game }) => {
    const history = game.history();
    const scrollRef = useRef<HTMLDivElement>(null);

    const movePairs = [];
    for (let i = 0; i < history.length; i += 2) {
        movePairs.push({
            number: (i / 2) + 1,
            white: history[i],
            black: history[i + 1] || '-',
        });
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history.length]);

    return (
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-0" ref={scrollRef}>
            <table className="w-full text-left border-collapse">
                <thead className="text-theme bg-theme-dim border-b border-theme sticky top-0 z-10">
                    <tr>
                        <th className="px-2 py-2 w-12 text-lg font-bold bg-black">#</th>
                        <th className="px-2 py-2 text-lg font-bold bg-black">WHITE</th>
                        <th className="px-2 py-2 text-lg font-bold bg-black">BLACK</th>
                    </tr>
                </thead>
                <tbody className="text-xl font-mono">
                    {movePairs.map((pair) => (
                        <tr key={pair.number} className="hover:bg-theme-dim/50 transition-colors">
                            <td className="px-2 py-1 text-theme font-bold">{pair.number.toString().padStart(2, '0')}</td>
                            <td className="px-2 py-1 text-theme">{pair.white}</td>
                            <td className="px-2 py-1 text-theme">{pair.black}</td>
                        </tr>
                    ))}
                    {movePairs.length === 0 && (
                        <tr>
                            <td colSpan={3} className="px-2 py-12 text-center text-theme opacity-80 text-xl">
                                -- NO DATA --
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MoveHistory;