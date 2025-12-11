import React from 'react';
import { Mood } from '../types';

interface YesManFaceProps {
    mood: Mood;
    className?: string;
}

const YesManFace: React.FC<YesManFaceProps> = ({ mood, className = "w-16 h-16" }) => {
    return (
        <svg
            viewBox="0 0 64 64"
            className={`${className} select-none`}
            shapeRendering="crispEdges"
        >
            {/* Monitor/Face Background */}
            <rect x="4" y="6" width="56" height="52" rx="4" fill="#000508" stroke="currentColor" strokeWidth="3" />
            <rect x="8" y="10" width="48" height="44" fill="#000508" />

            {/* Scanline overlay */}
            <line x1="8" y1="16" x2="56" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            <line x1="8" y1="24" x2="56" y2="24" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            <line x1="8" y1="40" x2="56" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />

            {/* --- NEUTRAL (Classic Yes Man Smile - Pixelated) --- */}
            {mood === 'neutral' && (
                <g fill="currentColor">
                    {/* Large Oval Eyes (pixelated) */}
                    <rect x="16" y="20" width="2" height="2" />
                    <rect x="18" y="19" width="4" height="1" />
                    <rect x="18" y="27" width="4" height="1" />
                    <rect x="22" y="20" width="2" height="2" />
                    <rect x="17" y="21" width="1" height="5" />
                    <rect x="23" y="21" width="1" height="5" />

                    <rect x="40" y="20" width="2" height="2" />
                    <rect x="42" y="19" width="4" height="1" />
                    <rect x="42" y="27" width="4" height="1" />
                    <rect x="46" y="20" width="2" height="2" />
                    <rect x="41" y="21" width="1" height="5" />
                    <rect x="47" y="21" width="1" height="5" />

                    {/* Pupils */}
                    <rect x="19" y="23" width="3" height="3" />
                    <rect x="42" y="23" width="3" height="3" />

                    {/* Eyebrows (pixelated arc) */}
                    <rect x="16" y="16" width="2" height="2" />
                    <rect x="18" y="15" width="4" height="1" />
                    <rect x="22" y="16" width="2" height="2" />

                    <rect x="40" y="16" width="2" height="2" />
                    <rect x="42" y="15" width="4" height="1" />
                    <rect x="46" y="16" width="2" height="2" />

                    {/* Big Smile (pixelated curve) */}
                    <rect x="18" y="38" width="2" height="2" />
                    <rect x="20" y="40" width="4" height="2" />
                    <rect x="24" y="42" width="16" height="2" />
                    <rect x="40" y="40" width="4" height="2" />
                    <rect x="44" y="38" width="2" height="2" />

                    {/* Open mouth */}
                    <rect x="26" y="42" width="12" height="4" opacity="0.8" />

                    {/* Teeth */}
                    <rect x="28" y="42" width="3" height="2" fill="#000" opacity="0.6" />
                    <rect x="33" y="42" width="3" height="2" fill="#000" opacity="0.6" />
                </g>
            )}

            {/* --- THINKING (Processing) --- */}
            {mood === 'thinking' && (
                <g fill="currentColor">
                    {/* Narrowed Eyes */}
                    <rect x="18" y="24" width="4" height="2" />
                    <rect x="42" y="24" width="4" height="2" />

                    {/* Straight Mouth */}
                    <rect x="20" y="42" width="24" height="2" />

                    {/* Processing Dots */}
                    <rect x="28" y="16" width="2" height="2" className="animate-bounce" style={{ animationDuration: '1s' }} />
                    <rect x="32" y="16" width="2" height="2" className="animate-bounce" style={{ animationDuration: '1s', animationDelay: '0.2s' }} />
                    <rect x="36" y="16" width="2" height="2" className="animate-bounce" style={{ animationDuration: '1s', animationDelay: '0.4s' }} />
                </g>
            )}

            {/* --- EXCITED (Check/Win - Pixelated) --- */}
            {mood === 'excited' && (
                <g fill="currentColor">
                    {/* Very Wide Eyes (pixelated) */}
                    <rect x="14" y="19" width="2" height="2" />
                    <rect x="16" y="18" width="6" height="1" />
                    <rect x="16" y="28" width="6" height="1" />
                    <rect x="22" y="19" width="2" height="2" />
                    <rect x="15" y="20" width="1" height="7" />
                    <rect x="23" y="20" width="1" height="7" />

                    <rect x="38" y="19" width="2" height="2" />
                    <rect x="40" y="18" width="6" height="1" />
                    <rect x="40" y="28" width="6" height="1" />
                    <rect x="46" y="19" width="2" height="2" />
                    <rect x="39" y="20" width="1" height="7" />
                    <rect x="47" y="20" width="1" height="7" />

                    {/* Large pupils */}
                    <rect x="17" y="22" width="4" height="4" />
                    <rect x="41" y="22" width="4" height="4" />

                    {/* Raised eyebrows (pixelated) */}
                    <rect x="14" y="13" width="2" height="2" />
                    <rect x="16" y="12" width="6" height="1" />
                    <rect x="22" y="13" width="2" height="2" />

                    <rect x="38" y="13" width="2" height="2" />
                    <rect x="40" y="12" width="6" height="1" />
                    <rect x="46" y="13" width="2" height="2" />

                    {/* Huge Excited Grin (pixelated curve) */}
                    <rect x="16" y="36" width="2" height="2" />
                    <rect x="18" y="38" width="4" height="2" />
                    <rect x="22" y="40" width="4" height="2" />
                    <rect x="26" y="42" width="12" height="2" />
                    <rect x="38" y="40" width="4" height="2" />
                    <rect x="42" y="38" width="4" height="2" />
                    <rect x="46" y="36" width="2" height="2" />

                    {/* Open mouth */}
                    <rect x="24" y="42" width="16" height="5" opacity="0.9" />

                    {/* Teeth */}
                    <rect x="26" y="43" width="3" height="2" fill="#000" opacity="0.7" />
                    <rect x="30" y="43" width="4" height="2" fill="#000" opacity="0.7" />
                    <rect x="35" y="43" width="3" height="2" fill="#000" opacity="0.7" />

                    {/* Exclamation */}
                    <rect x="30" y="10" width="4" height="6" className="animate-pulse" />
                    <rect x="30" y="18" width="4" height="2" className="animate-pulse" />
                </g>
            )}

            {/* --- CONFIDENT (Smug) --- */}
            {mood === 'confident' && (
                <g fill="currentColor">
                    {/* Half-closed eyes (relaxed) */}
                    <rect x="18" y="22" width="4" height="4" />
                    <rect x="42" y="22" width="4" height="4" />
                    <rect x="18" y="20" width="4" height="2" opacity="0.5" />
                    <rect x="42" y="20" width="4" height="2" opacity="0.5" />

                    {/* Smirk (asymmetric smile) */}
                    <rect x="20" y="38" width="16" height="2" />
                    <rect x="36" y="36" width="4" height="2" />
                    <rect x="40" y="34" width="4" height="2" />

                    {/* Raised eyebrow */}
                    <rect x="40" y="16" width="8" height="2" />
                </g>
            )}

            {/* --- WORRIED (Nervous) --- */}
            {mood === 'worried' && (
                <g fill="currentColor">
                    {/* Wide worried eyes */}
                    <rect x="17" y="20" width="5" height="7" />
                    <rect x="42" y="20" width="5" height="7" />

                    {/* Wavy uncertain mouth */}
                    <rect x="18" y="38" width="4" height="2" />
                    <rect x="22" y="40" width="4" height="2" />
                    <rect x="26" y="38" width="4" height="2" />
                    <rect x="30" y="40" width="4" height="2" />
                    <rect x="34" y="38" width="4" height="2" />
                    <rect x="38" y="40" width="4" height="2" />
                    <rect x="42" y="38" width="4" height="2" />

                    {/* Sweat drops */}
                    <rect x="12" y="18" width="2" height="2" className="animate-bounce" style={{ animationDuration: '0.8s' }} />
                    <rect x="14" y="20" width="2" height="2" className="animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0.2s' }} />
                    <rect x="50" y="18" width="2" height="2" className="animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0.1s' }} />
                </g>
            )}

            {/* --- DESPERATE (Panicking) --- */}
            {mood === 'desperate' && (
                <g fill="currentColor" className="animate-shake">
                    {/* Spiral/Dizzy eyes */}
                    <rect x="17" y="20" width="2" height="2" />
                    <rect x="19" y="20" width="2" height="2" />
                    <rect x="19" y="22" width="2" height="2" />
                    <rect x="19" y="24" width="2" height="2" />
                    <rect x="17" y="24" width="2" height="2" />

                    <rect x="43" y="20" width="2" height="2" />
                    <rect x="45" y="20" width="2" height="2" />
                    <rect x="45" y="22" width="2" height="2" />
                    <rect x="45" y="24" width="2" height="2" />
                    <rect x="43" y="24" width="2" height="2" />

                    {/* Open mouth (shouting) */}
                    <rect x="22" y="36" width="20" height="2" />
                    <rect x="20" y="38" width="24" height="2" />
                    <rect x="20" y="40" width="24" height="6" />
                    <rect x="22" y="46" width="20" height="2" />

                    {/* Multiple sweat drops */}
                    <rect x="10" y="16" width="2" height="2" className="animate-bounce" />
                    <rect x="12" y="20" width="2" height="2" className="animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <rect x="14" y="24" width="2" height="2" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <rect x="50" y="16" width="2" height="2" className="animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <rect x="52" y="20" width="2" height="2" className="animate-bounce" style={{ animationDelay: '0.25s' }} />
                </g>
            )}

            {/* --- DEFEATED (Sad) --- */}
            {mood === 'defeated' && (
                <g fill="currentColor">
                    {/* Downcast eyes */}
                    <rect x="18" y="24" width="4" height="4" />
                    <rect x="42" y="24" width="4" height="4" />

                    {/* Frown */}
                    <rect x="14" y="44" width="4" height="2" />
                    <rect x="16" y="42" width="4" height="2" />
                    <rect x="20" y="40" width="24" height="2" />
                    <rect x="44" y="42" width="4" height="2" />
                    <rect x="46" y="44" width="4" height="2" />

                    {/* Single tear */}
                    <rect x="22" y="28" width="2" height="2" opacity="0.8" />
                    <rect x="22" y="30" width="2" height="2" opacity="0.8" />
                    <rect x="22" y="32" width="2" height="2" opacity="0.6" />
                    <rect x="22" y="34" width="2" height="2" opacity="0.4" />
                </g>
            )}
        </svg>
    );
};

export default YesManFace;