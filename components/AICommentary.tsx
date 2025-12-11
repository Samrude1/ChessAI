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

const getMoodLabel = (mood: Mood): string => {
    const labels: Record<Mood, string> = {
        confident: 'Confident',
        neutral: 'Happy',
        worried: 'Nervous',
        desperate: 'Panicking',
        thinking: 'Calculating',
        excited: 'Excited',
        defeated: 'Defeated'
    };
    return labels[mood];
};

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

                <div className={`relative z-10 transition-all duration-500 ${mood === 'confident' ? 'scale-110' :
                    mood === 'worried' ? 'animate-pulse' :
                        mood === 'desperate' ? 'animate-bounce' :
                            mood === 'excited' ? 'scale-105 animate-pulse' :
                                'scale-100'
                    }`}>
                    {/* Glow effect behind the face - changes with mood */}
                    <div className={`absolute inset-0 blur-3xl rounded-full animate-pulse ${mood === 'confident' ? 'bg-theme opacity-30' :
                        mood === 'worried' ? 'bg-blue-400 opacity-20' :
                            mood === 'desperate' ? 'bg-indigo-500 opacity-25' :
                                mood === 'excited' ? 'bg-theme opacity-40' :
                                    'bg-theme opacity-10'
                        }`}></div>

                    {/* The Face Itself - MUCH BIGGER for dramatic presence */}
                    <YesManFace
                        mood={mood}
                        className="w-40 h-40 lg:w-72 lg:h-72 xl:w-96 xl:h-96 text-theme drop-shadow-[0_0_30px_rgba(128,223,255,0.9)]"
                    />
                </div>

                <div className="z-10 text-center mt-2 lg:mt-4">
                    <h2 className="text-2xl lg:text-4xl font-bold glow-text tracking-widest uppercase">YES MAN v2.1</h2>
                    <div className="flex items-center justify-center gap-3 mt-1">
                        <span className={`h-2 w-2 lg:h-3 lg:w-3 rounded-full ${isBotThinking ? 'bg-cyan-400 animate-ping' : 'bg-theme animate-pulse'}`}></span>
                        <span className="text-base lg:text-lg opacity-90 tracking-[0.3em] font-bold text-theme shadow-black drop-shadow-md">
                            {isBotThinking ? "PROCESSING..." : "SYSTEM ONLINE"}
                        </span>
                    </div>

                    {/* Mood Indicator with personality */}
                    <div className="mt-2">
                        <span className="text-base lg:text-lg opacity-70 text-theme uppercase tracking-wider">
                            Mindset: <span className={`font-bold opacity-90 ${mood === 'confident' ? 'text-cyan-300' :
                                mood === 'worried' ? 'text-blue-300' :
                                    mood === 'desperate' ? 'text-indigo-400' :
                                        'text-theme'
                                }`}>{getMoodLabel(mood)}</span>
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
                        <p className="mt-2 text-lg lg:text-xl opacity-70">"I'm just so happy to be here!"</p>
                    </div>
                )}

                {commentaries.map((c, index) => (
                    <div key={index} className="animate-fade-in border-l-4 border-theme pl-4 mb-4 bg-theme-dim/5 py-2">
                        <div className="flex items-center justify-between text-base text-theme opacity-70 uppercase mb-2 tracking-widest font-bold border-b border-theme/30 pb-1">
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