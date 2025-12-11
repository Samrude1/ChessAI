import React, { useState, useEffect } from 'react';
import { PIECE_COMPONENTS } from '../constants';

interface GameStartModalProps {
    onSelectSide: (side: 'w' | 'b', skillLevel: number) => void;
}

const GameStartModal: React.FC<GameStartModalProps> = ({ onSelectSide }) => {
    const [skillLevel, setSkillLevel] = useState(10);
    const [selectedTheme, setSelectedTheme] = useState<'blue' | 'green' | 'red'>(
        (localStorage.getItem('chessTheme') as 'blue' | 'green' | 'red') || 'blue'
    );
    const [selectedHue, setSelectedHue] = useState(parseInt(localStorage.getItem('chessThemeHue') || '195'));

    const themes = {
        blue: { name: 'PHOSPHOR BLUE', color: '#80dfff', rgb: '128, 223, 255' },
        green: { name: 'RADAR GREEN', color: '#33ff33', rgb: '51, 255, 51' },
        red: { name: 'ALERT RED', color: '#ff4444', rgb: '255, 68, 68' }
    };

    const applyTheme = (theme: 'blue' | 'green' | 'red') => {
        const root = document.documentElement;
        const themeData = themes[theme];
        root.style.setProperty('--terminal-blue', themeData.color);
        root.style.setProperty('--terminal-rgb', themeData.rgb);
        localStorage.setItem('chessTheme', theme);
        setSelectedTheme(theme);
    };

    const applyHueTheme = (hue: number) => {
        const color = `hsl(${hue}, 100%, 50%)`;
        const root = document.documentElement;
        root.style.setProperty('--terminal-blue', color);
        root.style.setProperty('--terminal-rgb', color);
        localStorage.setItem('chessThemeHue', hue.toString());
        // Update selected theme based on hue range
        if (hue >= 100 && hue <= 140) setSelectedTheme('green');
        else if (hue >= 180 && hue <= 220) setSelectedTheme('blue');
        else if (hue <= 20 || hue >= 340) setSelectedTheme('red');
    };

    // Apply saved theme on mount
    useEffect(() => {
        applyTheme(selectedTheme);
    }, []);

    const getDifficultyLabel = (level: number) => {
        if (level <= 5) return 'BEGINNER';
        if (level <= 10) return 'INTERMEDIATE';
        if (level <= 15) return 'ADVANCED';
        return 'MASTER';
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
            <div className="bg-black border-4 border-theme p-1 max-w-3xl w-full" style={{ boxShadow: '0 0 30px color-mix(in srgb, var(--terminal-blue) 20%, transparent)' }}>
                <div className="border-2 border-theme p-12 text-center relative overflow-hidden">

                    <h1 className="text-7xl font-bold text-theme mb-4 glow-text tracking-[0.2em] uppercase">
                        ROBCO INDUSTRIES
                    </h1>
                    <p className="text-theme mb-12 text-2xl font-mono border-b border-theme pb-8 mx-12 opacity-80">
                        Unified Operating System v.2077
                    </p>

                    <p className="text-theme mb-10 animate-pulse text-3xl font-bold">
                        &gt; SELECT COMBAT PARAMETERS
                    </p>

                    {/* Theme Hue Slider */}
                    <div className="mb-8 px-4">
                        <label className="block text-theme text-xl font-bold uppercase tracking-wider mb-4">
                            ⚙ TERMINAL HUE
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={selectedHue}
                            onChange={(e) => {
                                const hue = parseInt(e.target.value);
                                setSelectedHue(hue);
                                applyHueTheme(hue);
                            }}
                            className="w-full h-3 appearance-none rounded-full cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, color-mix(in srgb, var(--terminal-blue) 10%, #000) 0%, var(--terminal-blue) 50%, color-mix(in srgb, var(--terminal-blue) 10%, #000) 100%)`,
                                outline: 'none'
                            }}
                        />
                        <div className="text-theme text-sm mt-2 opacity-60">
                            CURRENT: {selectedTheme.toUpperCase()}
                        </div>
                    </div>

                    {/* Difficulty Slider */}
                    <div className="mb-10 px-4">
                        <label className="block text-theme text-xl font-bold uppercase tracking-wider mb-4">
                            OPPONENT DIFFICULTY: {skillLevel} - {getDifficultyLabel(skillLevel)}
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={skillLevel}
                            onChange={(e) => setSkillLevel(parseInt(e.target.value))}
                            className="w-full h-3 appearance-none bg-black rounded-full cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, color-mix(in srgb, var(--terminal-blue) 20%, transparent) 0%, color-mix(in srgb, var(--terminal-blue) 20%, transparent) ${((skillLevel - 1) / 19) * 100}%, transparent ${((skillLevel - 1) / 19) * 100}%, transparent 100%)`,
                                outline: 'none'
                            }}
                        />
                        <div className="flex justify-between text-theme text-sm mt-2 opacity-60">
                            <span>EASY</span>
                            <span>IMPOSSIBLE</span>
                        </div>
                    </div>

                    {/* Side Selection Buttons */}
                    <div className="flex gap-6 justify-center">
                        <button
                            onClick={() => onSelectSide('w', skillLevel)}
                            className="flex-1 max-w-xs bg-black border-4 border-theme text-theme px-8 py-6 text-2xl font-bold uppercase hover:bg-theme-dim transition-all shadow-theme"
                        >
                            [ PLAY WHITE ]
                        </button>
                        <button
                            onClick={() => onSelectSide('b', skillLevel)}
                            className="flex-1 max-w-xs bg-black border-4 border-theme text-theme px-8 py-6 text-2xl font-bold uppercase hover:bg-theme-dim transition-all shadow-theme"
                        >
                            [ PLAY BLACK ]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameStartModal;