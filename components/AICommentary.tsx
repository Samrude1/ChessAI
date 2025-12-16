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
    }, [commentaries]);

    return (
        <div className="flex flex-col h-full font-mono text-xl leading-relaxed relative min-h-0 bg-black">
            {/* Header with Giant Face - The 'Monitor' */}
            <div className="flex flex-col items-center justify-center border-b-4 border-theme bg-[#000508] shrink-0 relative overflow-hidden group h-[40%] min-h-[40%] max-h-[40%] w-full">

                {/* Decorative background grid for the 'monitor' area */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(var(--terminal-blue) 1px, transparent 1px), linear-gradient(90deg, var(--terminal-blue) 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}>
                </div>

                <div className={`relative z-10 transition-all duration-500 flex-shrink-0 mb-4 ${mood === 'confident' ? 'scale-110' :
                    mood === 'worried' ? 'animate-pulse' :
                        mood === 'desperate' ? 'animate-bounce' :
                            mood === 'excited' ? 'scale-105 animate-pulse' :
                                'scale-100'
                    }`}>
                    {/* Glow effect behind the face - changes with mood */}
                    <div className={`absolute inset-0 blur-3xl rounded-full animate-pulse ${mood === 'confident' ? 'bg-theme opacity-30' :
                        mood === 'worried' ? 'bg-theme opacity-20' :
                            mood === 'desperate' ? 'bg-theme opacity-25' :
                                mood === 'excited' ? 'bg-theme opacity-40' :
                                    'bg-theme opacity-10'
                        }`}></div>

                    {/* The Face Itself - MUCH BIGGER for dramatic presence */}
                    <YesManFace
                        mood={mood}
                        className="w-24 h-24 lg:w-48 lg:h-48 xl:w-56 xl:h-56 text-theme"
                    />
                </div>

                <div className="z-10 text-center w-full flex-shrink-0">
                    <h2 className="text-2xl lg:text-4xl font-bold glow-text tracking-widest uppercase">YES MAN v2.1</h2>
                    <div className="flex items-center justify-center gap-3 mt-1 h-6 lg:h-8">
                        <span className={`h-2 w-2 lg:h-3 lg:w-3 rounded-full ${isBotThinking ? 'bg-theme animate-ping' : 'bg-theme animate-pulse'}`}></span>
                        <span className="text-base lg:text-lg opacity-90 tracking-[0.3em] font-bold text-theme shadow-black drop-shadow-md whitespace-nowrap">
                            {isBotThinking ? "PROCESSING..." : "SYSTEM ONLINE"}
                        </span>
                    </div>

                    {/* Mood Indicator with personality */}
                    <div className="mt-2 h-6 lg:h-8">
                        <span className="text-base lg:text-lg opacity-70 text-theme uppercase tracking-wider block">
                            Mindset: <span className={`font-bold opacity-90 text-theme`}>{getMoodLabel(mood)}</span>
                        </span>
                    </div>

                    {/* Status Messages - Fixed height container to prevent layout shift */}
                    <div className="mt-2 h-8 w-full flex items-center justify-center overflow-hidden">
                        {isLoading ? (
                            <div className="flex items-center justify-center text-theme text-sm lg:text-base font-bold w-full px-4">
                                <Spinner />
                                <span className="ml-3 truncate">GENERATING RESPONSE...</span>
                            </div>
                        ) : isBotThinking ? (
                            <div className="flex items-center justify-center text-theme animate-pulse text-sm lg:text-base font-bold w-full px-4">
                                <span className="mr-2">&gt;</span>
                                <span className="opacity-80 truncate">ANALYZING BOARD STATE...</span>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6 p-4"
                style={{ scrollBehavior: 'smooth' }}
            >
                {commentaries.length === 0 && !isLoading && !isBotThinking && (
                    <div className="text-theme mt-2 text-center opacity-90 animate-pulse text-xl lg:text-2xl">
                        <p>&gt; WAITING FOR INPUT...</p>
                        <p className="mt-2 text-lg lg:text-xl opacity-70">"I'm just so happy to be here!"</p>
                    </div>
                )}

                {commentaries.map((c, index) => (
                    <div key={index} className="animate-fade-in pl-2 mb-4 bg-theme-dim/5 py-2">
                        <div className="flex items-center justify-between text-base text-theme opacity-70 uppercase mb-2 tracking-widest font-bold pb-1">
                            <span>LOG_{c.moveNumber.toString().padStart(3, '0')}</span>
                            <span>{c.player === 'Human' ? 'USER' : 'AI'}</span>
                        </div>
                        <div className="text-theme text-xl lg:text-2xl drop-shadow-md leading-snug">
                            <span className="mr-2 font-bold text-theme opacity-50">&gt;</span>
                            {c.comment}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AICommentary;