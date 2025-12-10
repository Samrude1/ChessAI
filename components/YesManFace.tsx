import React from 'react';
import { Mood } from '../types';

interface YesManFaceProps {
    mood: Mood;
    className?: string;
}

const YesManFace: React.FC<YesManFaceProps> = ({ mood, className = "w-16 h-16" }) => {
    return (
        <svg 
            viewBox="0 0 32 32" 
            className={`${className} select-none`} 
            shapeRendering="crispEdges" // Ensures pixel-art look
        >
            {/* Monitor/Face Background */}
            <rect x="2" y="3" width="28" height="26" rx="3" fill="#000508" stroke="currentColor" strokeWidth="2" />
            <rect x="4" y="5" width="24" height="22" fill="#000508" />
            
            {/* Scanline overlay (subtle) */}
            <line x1="4" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            <line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            <line x1="4" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />

            {/* --- NEUTRAL (Classic Smile) --- */}
            {mood === 'neutral' && (
                <g fill="currentColor">
                    {/* Eyes */}
                    <rect x="9" y="10" width="2" height="3" />
                    <rect x="21" y="10" width="2" height="3" />
                    
                    {/* Crinkly Smile */}
                    <rect x="7" y="18" width="2" height="1" />
                    <rect x="8" y="19" width="2" height="1" />
                    <rect x="10" y="20" width="12" height="1" />
                    <rect x="22" y="19" width="2" height="1" />
                    <rect x="23" y="18" width="2" height="1" />
                    
                    {/* Cheek Dimples */}
                    <rect x="6" y="17" width="1" height="1" opacity="0.7" />
                    <rect x="25" y="17" width="1" height="1" opacity="0.7" />
                </g>
            )}
            
            {/* --- THINKING (Processing/Loading) --- */}
            {mood === 'thinking' && (
                <g fill="currentColor">
                     {/* Eyes (Narrowed/Focusing) */}
                    <rect x="9" y="12" width="2" height="1" />
                    <rect x="21" y="12" width="2" height="1" />

                    {/* Mouth (Straight Line) */}
                    <rect x="10" y="21" width="12" height="1" />

                    {/* Binary Sweat / Processing bubbles */}
                    <rect x="14" y="8" width="1" height="1" className="animate-bounce" style={{animationDuration: '1s'}} />
                    <rect x="17" y="8" width="1" height="1" className="animate-bounce" style={{animationDuration: '1s', animationDelay: '0.2s'}} />

                    {/* Loading Bar Eyes? No, just keep it simple */}
                </g>
            )}

            {/* --- EXCITED (Check/Win) --- */}
            {mood === 'excited' && (
                 <g fill="currentColor">
                    {/* Eyes (Wide Open) */}
                    <rect x="8" y="9" width="3" height="4" />
                    <rect x="21" y="9" width="3" height="4" />
                    
                    {/* Mouth (Big Open Grin) */}
                    <path d="M8 18 h16 v1 h-1 v1 h-1 v1 h-1 v1 h-8 v-1 h-1 v-1 h-1 v-1 h-1 v-1 h-2 z" />
                    
                    {/* Teeth */}
                    <rect x="10" y="18" width="2" height="1" fill="#000" />
                    <rect x="14" y="18" width="4" height="1" fill="#000" />
                    <rect x="20" y="18" width="2" height="1" fill="#000" />
                    
                    {/* "!" Alert */}
                    <rect x="15" y="5" width="2" height="3" className="animate-pulse" />
                </g>
            )}
        </svg>
    );
};

export default YesManFace;