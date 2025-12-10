import React, { useEffect, useRef } from 'react';
import type { Commentary, Mood } from '../types';
import Spinner from './icons/Spinner';
import YesManFace from './YesManFace';
import { soundEngine } from '../services/soundService';

interface AICommentaryProps {
    commentaries: Commentary[];
    isLoading: boolean;
    isBotThinking: boolean;
    mood: Mood;
}

const AICommentary: React.FC<AICommentaryProps> = ({ commentaries, isLoading, isBotThinking, mood }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isLoading || isBotThinking) {
            const interval = setInterval(() => {
                soundEngine.playComputerProcessing();
            }, 800);
            return () => clearInterval(interval);
        }
    }, [isLoading, isBotThinking]);

    useEffect(() => {
        if (containerRef.current) {
            // Scroll to bottom when new messages arrive
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [commentaries, isLoading, isBotThinking]);

    return (
        <div className="flex flex-col h-full font-mono text-xl leading-relaxed relative min-h-0 bg-black">
            {/* Header with Giant Face - The 'Monitor' */}
            <div className="flex flex-col items-center justify-center py-2 lg:py-6 border-b-4 border-theme bg-[#000508] shrink-0 relative overflow-hidden group">

                {/* Decorative background grid for the 'monitor' area */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(var(--terminal-blue) 1px, transparent 1px), linear-gradient(90deg, var(--terminal-blue) 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}>
                </div>

                <div className="relative z-10 transition-transform duration-500 transform lg:group-hover:scale-105">
                    {/* Glow effect behind the face */}
                    <div className="absolute inset-0 bg-theme blur-3xl opacity-10 rounded-full animate-pulse"></div>

                    {/* The Face Itself - Much Bigger */}
                    <YesManFace
                        mood={mood}
                        className="w-24 h-24 lg:w-48 lg:h-48 xl:w-56 xl:h-56 text-theme drop-shadow-[0_0_15px_rgba(128,223,255,0.6)]"
                    />
                </div>

                <div className="z-10 text-center mt-2 lg:mt-4">
                    <h2 className="text-2xl lg:text-4xl font-bold glow-text tracking-widest uppercase">YES MAN v2.1</h2>
                    <div className="flex items-center justify-center gap-3 mt-1">
                        <span className={`h-2 w-2 lg:h-3 lg:w-3 rounded-full ${isBotThinking ? 'bg-yellow-400 animate-ping' : 'bg-theme animate-pulse'}`}></span>
                        <span className="text-sm lg:text-base opacity-90 tracking-[0.3em] font-bold text-theme shadow-black drop-shadow-md">
                            {isBotThinking ? "PROCESSING..." : "SYSTEM ONLINE"}
                        </span>
                    </div>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6 p-4"
                style={{ scrollBehavior: 'smooth' }}
            >
                {commentaries.length === 0 && !isLoading && (
                    <div className="text-theme mt-2 text-center opacity-90 animate-pulse text-xl lg:text-2xl">
                        <p>&gt; WAITING FOR INPUT...</p>
                        <p className="mt-2 text-base lg:text-lg opacity-70">"I'm just so happy to be here!"</p>
                    </div>
                )}

                {commentaries.map((c, index) => (
                    <div key={index} className="animate-fade-in border-l-4 border-theme pl-4 mb-4 bg-theme-dim/5 py-2">
                        <div className="flex items-center justify-between text-sm text-theme opacity-70 uppercase mb-2 tracking-widest font-bold border-b border-theme/30 pb-1">
                            <span>LOG_{c.moveNumber.toString().padStart(3, '0')}</span>
                            <span>{c.player === 'Human' ? 'USER' : 'AI'}</span>
                        </div>
                        <div className="text-theme text-xl lg:text-2xl drop-shadow-md leading-snug">
                            <span className="mr-2 font-bold text-theme opacity-50">&gt;</span>
                            {c.comment}
                        </div>
                    </div>
                ))}

                {isBotThinking && (
                    <div className="flex items-center text-theme animate-pulse text-lg lg:text-xl font-bold pl-4">
                        <span className="mr-2">&gt;</span>
                        <span className="opacity-80">ANALYZING BOARD STATE...</span>
                    </div>
                )}

                {isLoading && (
                    <div className="flex items-center text-theme mt-4 text-lg lg:text-xl font-bold pl-4">
                        <Spinner />
                        <span className="ml-3">GENERATING RESPONSE...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AICommentary;