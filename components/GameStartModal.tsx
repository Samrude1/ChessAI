import React, { useState } from 'react';
import { PIECE_COMPONENTS } from '../constants';

interface GameStartModalProps {
    onSelectSide: (side: 'w' | 'b', skillLevel: number) => void;
}

const GameStartModal: React.FC<GameStartModalProps> = ({ onSelectSide }) => {
    const [skillLevel, setSkillLevel] = useState(10);

    const getDifficultyLabel = (level: number) => {
        if (level <= 5) return 'BEGINNER';
        if (level <= 10) return 'INTERMEDIATE';
        if (level <= 15) return 'ADVANCED';
        return 'MASTER';
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
            <div className="bg-black border-4 border-theme p-1 max-w-xl w-full shadow-[0_0_30px_rgba(128,223,255,0.2)]">
                <div className="border-2 border-theme p-8 text-center relative overflow-hidden">

                    <h1 className="text-5xl font-bold text-theme mb-3 glow-text tracking-[0.2em] uppercase">
                        ROBCO INDUSTRIES
                    </h1>
                    <p className="text-theme mb-10 text-xl font-mono border-b border-theme pb-6 mx-12 opacity-80">
                        Unified Operating System v.2077
                    </p>

                    <p className="text-theme mb-8 animate-pulse text-2xl font-bold">
                        &gt; SELECT COMBAT PARAMETERS
                    </p>

                    {/* Difficulty Slider */}
                    <div className="mb-8 px-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-theme text-lg font-bold uppercase tracking-wider">AI THREAT LEVEL</span>
                            <span className="text-theme text-xl font-bold glow-text">{getDifficultyLabel(skillLevel)}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={skillLevel}
                            onChange={(e) => setSkillLevel(parseInt(e.target.value))}
                            className="w-full h-2 bg-theme-dim appearance-none cursor-pointer slider-thumb"
                            style={{
                                background: `linear-gradient(to right, var(--terminal-blue) 0%, var(--terminal-blue) ${(skillLevel / 20) * 100}%, rgba(128, 223, 255, 0.2) ${(skillLevel / 20) * 100}%, rgba(128, 223, 255, 0.2) 100%)`
                            }}
                        />
                        <div className="flex justify-between mt-2 text-base text-theme opacity-80">
                            <span>0</span>
                            <span>5</span>
                            <span>10</span>
                            <span>15</span>
                            <span>20</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 relative z-20">
                        <button
                            onClick={() => onSelectSide('w', skillLevel)}
                            className="group flex flex-col items-center gap-6 p-6 border-2 border-theme bg-theme-dim hover:bg-theme hover:text-black transition-all duration-200"
                        >
                            <div
                                className="w-20 h-20 transition-all"
                            >
                                {PIECE_COMPONENTS['wK']}
                            </div>
                            <span className="font-bold text-2xl uppercase tracking-widest">Initiate</span>
                            <span className="text-lg opacity-90">(Play White)</span>
                        </button>

                        <button
                            onClick={() => onSelectSide('b', skillLevel)}
                            className="group flex flex-col items-center gap-6 p-6 border-2 border-theme bg-theme-dim hover:bg-theme hover:text-black transition-all duration-200"
                        >
                            <div
                                className="w-20 h-20 transition-all"
                            >
                                {PIECE_COMPONENTS['bK']}
                            </div>
                            <span className="font-bold text-2xl uppercase tracking-widest">React</span>
                            <span className="text-lg opacity-90">(Play Black)</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameStartModal;