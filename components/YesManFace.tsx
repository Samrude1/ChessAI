import React from 'react';
import { Mood } from '../types';

interface YesManFaceProps {
    mood: Mood;
    className?: string;
}

const YesManFace: React.FC<YesManFaceProps> = ({ mood, className = "w-16 h-16" }) => {
    return (
        <svg
            viewBox="0 0 80 80"
            className={`${className} select-none`}
            shapeRendering="crispEdges"
        >
            {/* Screen Background */}
            <rect x="0" y="0" width="80" height="80" fill="#000" />

            {/* Scanlines */}
            {[...Array(20)].map((_, i) => (
                <line
                    key={i}
                    x1="0"
                    y1={i * 4}
                    x2="80"
                    y2={i * 4}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    opacity="0.05"
                />
            ))}

            {/* --- NEUTRAL (Classic Smiley) --- */}
            {mood === 'neutral' && (
                <g fill="currentColor">
                    {/* Eyes */}
                    <rect x="20" y="25" width="8" height="8" />
                    <rect x="52" y="25" width="8" height="8" />

                    {/* Smile */}
                    <rect x="24" y="52" width="4" height="4" />
                    <rect x="28" y="54" width="4" height="4" />
                    <rect x="32" y="56" width="16" height="4" />
                    <rect x="48" y="54" width="4" height="4" />
                    <rect x="52" y="52" width="4" height="4" />
                </g>
            )}

            {/* --- THINKING --- */}
            {mood === 'thinking' && (
                <g fill="currentColor">
                    {/* Eyes looking up-right */}
                    <rect x="22" y="24" width="6" height="6" />
                    <rect x="20" y="26" width="2" height="2" opacity="0.3" />

                    <rect x="54" y="24" width="6" height="6" />
                    <rect x="52" y="26" width="2" height="2" opacity="0.3" />

                    {/* Neutral mouth */}
                    <rect x="28" y="52" width="24" height="4" />

                    {/* Thought bubble */}
                    <circle cx="64" cy="16" r="2" opacity="0.8" className="animate-pulse" />
                    <circle cx="68" cy="12" r="3" opacity="0.9" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <circle cx="72" cy="8" r="4" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                </g>
            )}

            {/* --- EXCITED --- */}
            {mood === 'excited' && (
                <g fill="currentColor">
                    {/* Wide eyes */}
                    <rect x="18" y="22" width="10" height="12" />
                    <rect x="52" y="22" width="10" height="12" />

                    {/* Pupils */}
                    <rect x="21" y="26" width="4" height="4" fill="#000" />
                    <rect x="55" y="26" width="4" height="4" fill="#000" />

                    {/* Big grin */}
                    <rect x="20" y="50" width="4" height="4" />
                    <rect x="24" y="52" width="8" height="4" />
                    <rect x="32" y="54" width="16" height="4" />
                    <rect x="48" y="52" width="8" height="4" />
                    <rect x="56" y="50" width="4" height="4" />

                    {/* Open mouth */}
                    <rect x="32" y="54" width="16" height="8" opacity="0.9" />

                    {/* Sparkles */}
                    <rect x="12" y="18" width="4" height="4" className="animate-pulse" />
                    <rect x="64" y="18" width="4" height="4" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                </g>
            )}

            {/* --- CONFIDENT --- */}
            {mood === 'confident' && (
                <g fill="currentColor">
                    {/* Half-closed eyes */}
                    <rect x="20" y="28" width="8" height="6" />
                    <rect x="52" y="28" width="8" height="6" />
                    <rect x="20" y="26" width="8" height="2" opacity="0.4" />
                    <rect x="52" y="26" width="8" height="2" opacity="0.4" />

                    {/* Smirk */}
                    <rect x="28" y="52" width="12" height="4" />
                    <rect x="40" y="50" width="8" height="4" />
                    <rect x="48" y="48" width="4" height="4" />

                    {/* Raised eyebrow */}
                    <rect x="50" y="20" width="12" height="3" />
                </g>
            )}

            {/* --- WORRIED --- */}
            {mood === 'worried' && (
                <g fill="currentColor">
                    {/* Wide worried eyes */}
                    <rect x="18" y="24" width="10" height="10" />
                    <rect x="52" y="24" width="10" height="10" />

                    {/* Small pupils */}
                    <rect x="22" y="28" width="2" height="2" />
                    <rect x="56" y="28" width="2" height="2" />

                    {/* Wavy mouth */}
                    <rect x="24" y="52" width="6" height="3" />
                    <rect x="30" y="54" width="6" height="3" />
                    <rect x="36" y="52" width="8" height="3" />
                    <rect x="44" y="54" width="6" height="3" />
                    <rect x="50" y="52" width="6" height="3" />

                    {/* Sweat drops */}
                    <rect x="14" y="22" width="3" height="3" className="animate-bounce" opacity="0.8" />
                    <rect x="16" y="28" width="2" height="4" className="animate-bounce" style={{ animationDelay: '0.2s' }} opacity="0.6" />
                    <rect x="64" y="22" width="3" height="3" className="animate-bounce" style={{ animationDelay: '0.1s' }} opacity="0.8" />
                </g>
            )}

            {/* --- DESPERATE --- */}
            {mood === 'desperate' && (
                <g fill="currentColor" className="animate-shake">
                    {/* X eyes (defeated) */}
                    <rect x="20" y="24" width="3" height="3" />
                    <rect x="23" y="27" width="3" height="3" />
                    <rect x="26" y="30" width="3" height="3" />
                    <rect x="23" y="24" width="3" height="3" />
                    <rect x="20" y="27" width="3" height="3" />

                    <rect x="52" y="24" width="3" height="3" />
                    <rect x="55" y="27" width="3" height="3" />
                    <rect x="58" y="30" width="3" height="3" />
                    <rect x="55" y="24" width="3" height="3" />
                    <rect x="52" y="27" width="3" height="3" />

                    {/* Open mouth (screaming) */}
                    <rect x="28" y="48" width="24" height="4" />
                    <rect x="26" y="52" width="28" height="4" />
                    <rect x="26" y="56" width="28" height="8" />
                    <rect x="28" y="64" width="24" height="4" />

                    {/* Multiple sweat drops */}
                    <rect x="12" y="20" width="3" height="3" className="animate-bounce" />
                    <rect x="14" y="26" width="2" height="4" className="animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <rect x="16" y="34" width="3" height="3" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <rect x="66" y="20" width="3" height="3" className="animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <rect x="64" y="26" width="2" height="4" className="animate-bounce" style={{ animationDelay: '0.25s' }} />
                </g>
            )}

            {/* --- DEFEATED --- */}
            {mood === 'defeated' && (
                <g fill="currentColor">
                    {/* Closed/sad eyes */}
                    <rect x="20" y="28" width="8" height="4" />
                    <rect x="52" y="28" width="8" height="4" />

                    {/* Frown */}
                    <rect x="24" y="58" width="4" height="4" />
                    <rect x="28" y="56" width="4" height="4" />
                    <rect x="32" y="54" width="16" height="4" />
                    <rect x="48" y="56" width="4" height="4" />
                    <rect x="52" y="58" width="4" height="4" />

                    {/* Tear */}
                    <rect x="26" y="34" width="3" height="4" opacity="0.8" />
                    <rect x="26" y="38" width="3" height="6" opacity="0.6" />
                    <rect x="26" y="44" width="3" height="4" opacity="0.4" />
                    <rect x="26" y="48" width="3" height="3" opacity="0.2" />
                </g>
            )}
        </svg>
    );
};

export default YesManFace;