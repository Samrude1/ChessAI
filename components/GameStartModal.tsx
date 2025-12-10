import React from 'react';
import { PIECE_COMPONENTS } from '../constants';

interface GameStartModalProps {
    onSelectSide: (side: 'w' | 'b') => void;
}

const GameStartModal: React.FC<GameStartModalProps> = ({ onSelectSide }) => {
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

                    <div className="grid grid-cols-2 gap-8 relative z-20">
                        <button 
                            onClick={() => onSelectSide('w')}
                            className="group flex flex-col items-center gap-6 p-6 border-2 border-theme bg-theme-dim hover:bg-theme hover:text-black transition-all duration-200"
                        >
                             <div 
                                className="w-20 h-20 transition-all"
                             >
                                {PIECE_COMPONENTS['wK']}
                            </div>
                            <span className="font-bold text-2xl uppercase tracking-widest">Initiate</span>
                            <span className="text-sm opacity-80">(Play White)</span>
                        </button>

                        <button 
                            onClick={() => onSelectSide('b')}
                            className="group flex flex-col items-center gap-6 p-6 border-2 border-theme bg-theme-dim hover:bg-theme hover:text-black transition-all duration-200"
                        >
                            <div 
                                className="w-20 h-20 transition-all"
                             >
                                {PIECE_COMPONENTS['bK']}
                            </div>
                            <span className="font-bold text-2xl uppercase tracking-widest">React</span>
                            <span className="text-sm opacity-80">(Play Black)</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameStartModal;