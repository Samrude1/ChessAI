
import React from 'react';

const PIECE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  shapeRendering: 'geometricPrecision' // Switched from crispEdges for smoother curves at higher res
};


// Theme Colors - Use CSS variable for dynamic theming
const THEME_COLOR = "var(--terminal-blue)";
const BG_FILL = "#000";

export const PIECE_COMPONENTS: { [key: string]: React.ReactElement } = {
  // WHITE PAWN
  wP: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 6c-2.67 0-4 2-4 4v2h8v-2c0-2-1.33-4-4-4zm-5 8h10v2H7v-2z" fill={THEME_COLOR} />
    </svg>
  ),
  // WHITE KNIGHT
  wN: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M16.5 7c0-2.5-2-4.5-4.5-4.5-1.5 0-3.5 1-4.5 2.5 0 0-1.5 1-2.5 1-1 0-1.5.5-1.5 1.5 0 1 1.5 2 2 2 .5 0 1-.5 1-1 0-.5.5-1 1-1 .5 0 1 .5 1 1 0 1.5-1.5 2-2 3.5-.5 1.5-1 2-1 3.5h11c0-2-1-3-1.5-4.5-.5-1.5 1.5-2 1.5-4zM7 20h10v2H7v-2z" fill={THEME_COLOR} />
    </svg>
  ),
  // WHITE BISHOP
  wB: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M12 2l-1 2h2l-1-2zm0 3c-2.5 0-4 2.5-4 5 0 2 1.5 3.5 3 4l-1 4h4l-1-4c1.5-.5 3-2 3-4 0-2.5-1.5-5-4-5zm-3.5 15h7v2h-7v-2z" fill={THEME_COLOR} />
      <path d="M11 7h2" stroke={BG_FILL} strokeWidth="1" />
    </svg>
  ),
  // WHITE ROOK
  wR: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M5 21h14v-2H5v2zm2-4h10v-8H7v8zM5 5v3h14V5H5zm2 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2z" fill={THEME_COLOR} />
    </svg>
  ),
  // WHITE QUEEN
  wQ: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M12 2l1.5 3h3l-1.5 2.5 2 3.5-4-1-1 4-1-4-4 1 2-3.5-1.5-2.5h3L12 2zm-4 14l1 4h6l1-4H8zm-2 4h12v2H6v-2z" fill={THEME_COLOR} />
    </svg>
  ),
  // WHITE KING
  wK: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M12 2v3h-3v2h3v3h2V7h3V5h-3V2h-2zM9 11l1 5h4l1-5H9zm-3 7h12v2H6v-2z" fill={THEME_COLOR} />
    </svg>
  ),

  // BLACK PAWN (Dark with bright outline)
  bP: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 6c-2.67 0-4 2-4 4v2h8v-2c0-2-1.33-4-4-4zm-5 8h10v2H7v-2z" fill="rgba(0,20,30,0.8)" stroke={THEME_COLOR} strokeWidth="1" />
    </svg>
  ),
  // BLACK KNIGHT (Dark with bright outline)
  bN: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M16.5 7c0-2.5-2-4.5-4.5-4.5-1.5 0-3.5 1-4.5 2.5 0 0-1.5 1-2.5 1-1 0-1.5.5-1.5 1.5 0 1 1.5 2 2 2 .5 0 1-.5 1-1 0-.5.5-1 1-1 .5 0 1 .5 1 1 0 1.5-1.5 2-2 3.5-.5 1.5-1 2-1 3.5h11c0-2-1-3-1.5-4.5-.5-1.5 1.5-2 1.5-4zM7 20h10v2H7v-2z" fill="rgba(0,20,30,0.8)" stroke={THEME_COLOR} strokeWidth="1" />
    </svg>
  ),
  // BLACK BISHOP (Dark with bright outline)
  bB: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M12 2l-1 2h2l-1-2zm0 3c-2.5 0-4 2.5-4 5 0 2 1.5 3.5 3 4l-1 4h4l-1-4c1.5-.5 3-2 3-4 0-2.5-1.5-5-4-5zm-3.5 15h7v2h-7v-2z" fill="rgba(0,20,30,0.8)" stroke={THEME_COLOR} strokeWidth="1" />
      <path d="M10.5 8h3" stroke={THEME_COLOR} strokeWidth="1" />
    </svg>
  ),
  // BLACK ROOK (Dark with bright outline)
  bR: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M5 21h14v-2H5v2zm2-4h10v-8H7v8zM5 5v3h14V5H5zm2 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2z" fill="rgba(0,20,30,0.8)" stroke={THEME_COLOR} strokeWidth="1" />
    </svg>
  ),
  // BLACK QUEEN (Dark with bright outline)
  bQ: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M12 2l1.5 3h3l-1.5 2.5 2 3.5-4-1-1 4-1-4-4 1 2-3.5-1.5-2.5h3L12 2zm-4 14l1 4h6l1-4H8zm-2 4h12v2H6v-2z" fill="rgba(0,20,30,0.8)" stroke={THEME_COLOR} strokeWidth="1" />
    </svg>
  ),
  // BLACK KING (Dark with bright outline)
  bK: (
    <svg viewBox="0 0 24 24" style={PIECE_STYLE}>
      <path d="M12 2v3h-3v2h3v3h2V7h3V5h-3V2h-2zM9 11l1 5h4l1-5H9zm-3 7h12v2H6v-2z" fill="rgba(0,20,30,0.8)" stroke={THEME_COLOR} strokeWidth="1" />
    </svg>
  ),
};
