
// A comprehensive opening book for the Gemini Chess Bot
// Keys are the move history string (moves separated by spaces)
// Values are arrays of recommended next moves in SAN format

export const openingBook: Record<string, string[]> = {
  // --- STARTING MOVES ---
  '': ['e4', 'd4', 'Nf3', 'c4'],

  // ==========================================
  // 1. e4 OPENINGS (King's Pawn)
  // ==========================================
  'e4': ['e5', 'c5', 'e6', 'c6', 'd6', 'Nf6', 'g6'],

  // --- King's Pawn Game (1. e4 e5) ---
  'e4 e5': ['Nf3', 'Nc3', 'Bc4', 'f4'],
  
  // 1. e4 e5 2. Nf3
  'e4 e5 Nf3': ['Nc6', 'Nf6', 'd6'],
  
  // Ruy Lopez (Spanish Game)
  'e4 e5 Nf3 Nc6': ['Bb5', 'Bc4', 'd4', 'Nc3'],
  'e4 e5 Nf3 Nc6 Bb5': ['a6', 'Nf6', 'd6', 'f5'],
  'e4 e5 Nf3 Nc6 Bb5 a6': ['Ba4', 'Bxc6'],
  'e4 e5 Nf3 Nc6 Bb5 a6 Ba4': ['Nf6', 'b5', 'd6'],
  'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6': ['O-O', 'd3', 'Nc3'],
  'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O': ['Be7', 'Nxe4', 'b5'],
  'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7': ['Re1', 'd3'],
  'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1': ['b5'],
  'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5': ['Bb3'],
  'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3': ['d6', 'O-O'],

  // Italian Game (Giuoco Piano)
  'e4 e5 Nf3 Nc6 Bc4': ['Bc5', 'Nf6', 'Be7'],
  'e4 e5 Nf3 Nc6 Bc4 Bc5': ['c3', 'd3', 'O-O', 'b4'],
  'e4 e5 Nf3 Nc6 Bc4 Bc5 c3': ['Nf6', 'd6'],
  'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6': ['d4', 'd3'],
  'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4': ['exd4'],
  'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4': ['cxd4', 'e5'],
  
  // Two Knights Defense
  'e4 e5 Nf3 Nc6 Bc4 Nf6': ['d3', 'Ng5', 'd4'],
  'e4 e5 Nf3 Nc6 Bc4 Nf6 d3': ['Bc5', 'd6', 'h6'],

  // Scotch Game
  'e4 e5 Nf3 Nc6 d4': ['exd4'],
  'e4 e5 Nf3 Nc6 d4 exd4': ['Nxd4', 'Bc4'],
  'e4 e5 Nf3 Nc6 d4 exd4 Nxd4': ['Nf6', 'Bc5', 'Qh4'],
  'e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6': ['Nc3', 'Nxc6'],

  // --- Sicilian Defense (1. e4 c5) ---
  'e4 c5': ['Nf3', 'Nc3', 'c3', 'd4', 'f4'],
  'e4 c5 Nf3': ['d6', 'Nc6', 'e6', 'g6'],
  
  // Open Sicilian
  'e4 c5 Nf3 d6': ['d4', 'Bb5+'],
  'e4 c5 Nf3 d6 d4': ['cxd4'],
  'e4 c5 Nf3 d6 d4 cxd4': ['Nxd4'],
  'e4 c5 Nf3 d6 d4 cxd4 Nxd4': ['Nf6'],
  'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6': ['Nc3'],
  
  // Najdorf / Dragon / Scheveningen
  'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3': ['a6', 'g6', 'e6', 'Nc6'],
  'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6': ['Be3', 'Bg5', 'Be2', 'h3'], // Najdorf
  'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6': ['Be3', 'Be2', 'f3'], // Dragon
  
  // Sicilian Closed / Grand Prix
  'e4 c5 Nc3': ['Nc6', 'd6', 'e6'],
  'e4 c5 Nc3 Nc6': ['g3', 'f4', 'Nf3'],
  'e4 c5 Nc3 Nc6 g3': ['g6'],
  'e4 c5 Nc3 Nc6 g3 g6': ['Bg2'],
  'e4 c5 Nc3 Nc6 g3 g6 Bg2': ['Bg7'],
  'e4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7': ['d3'],

  // --- French Defense (1. e4 e6) ---
  'e4 e6': ['d4', 'd3', 'Nc3'],
  'e4 e6 d4': ['d5'],
  'e4 e6 d4 d5': ['Nc3', 'Nd2', 'e5', 'exd5'], 
  
  // Classical
  'e4 e6 d4 d5 Nc3': ['Bb4', 'Nf6', 'dxe4'], 
  'e4 e6 d4 d5 Nc3 Nf6': ['Bg5', 'e5'],
  'e4 e6 d4 d5 Nc3 Nf6 Bg5': ['Be7', 'Bb4'],
  
  // Advance Variation
  'e4 e6 d4 d5 e5': ['c5'],
  'e4 e6 d4 d5 e5 c5': ['c3'],
  'e4 e6 d4 d5 e5 c5 c3': ['Nc6'],
  'e4 e6 d4 d5 e5 c5 c3 Nc6': ['Nf3'],

  // --- Caro-Kann (1. e4 c6) ---
  'e4 c6': ['d4', 'Nc3', 'd3'],
  'e4 c6 d4': ['d5'],
  'e4 c6 d4 d5': ['Nc3', 'e5', 'exd5'],
  'e4 c6 d4 d5 Nc3': ['dxe4'],
  'e4 c6 d4 d5 Nc3 dxe4': ['Nxe4'],
  'e4 c6 d4 d5 Nc3 dxe4 Nxe4': ['Bf5', 'Nd7', 'Nf6'],
  'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5': ['Ng3'],
  'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3': ['Bg6'],

  // --- Pirc Defense ---
  'e4 d6': ['d4'],
  'e4 d6 d4': ['Nf6'],
  'e4 d6 d4 Nf6': ['Nc3'],
  'e4 d6 d4 Nf6 Nc3': ['g6'],

  // ==========================================
  // 1. d4 OPENINGS (Queen's Pawn)
  // ==========================================
  'd4': ['d5', 'Nf6', 'f5', 'e6', 'c5'],

  // --- Queen's Gambit ---
  'd4 d5': ['c4', 'Nf3', 'Bf4', 'Nc3'],
  'd4 d5 c4': ['e6', 'c6', 'dxc4', 'Nc6'], 
  
  // Queen's Gambit Declined
  'd4 d5 c4 e6': ['Nc3', 'Nf3'],
  'd4 d5 c4 e6 Nc3': ['Nf6', 'Be7', 'c6'],
  'd4 d5 c4 e6 Nc3 Nf6': ['Bg5', 'Nf3', 'cxd5'],
  'd4 d5 c4 e6 Nc3 Nf6 Bg5': ['Be7'],
  'd4 d5 c4 e6 Nc3 Nf6 Bg5 Be7': ['e3', 'Nf3'],

  // Slav Defense
  'd4 d5 c4 c6': ['Nf3', 'Nc3', 'cxd5'],
  'd4 d5 c4 c6 Nf3': ['Nf6'],
  'd4 d5 c4 c6 Nf3 Nf6': ['Nc3', 'e3'],
  'd4 d5 c4 c6 Nf3 Nf6 Nc3': ['dxc4', 'e6'],

  // London System
  'd4 d5 Bf4': ['Nf6', 'c5', 'e6'],
  'd4 Nf6 Bf4': ['d5', 'g6', 'c5'],

  // --- King's Indian Defense ---
  'd4 Nf6': ['c4', 'Nf3', 'Bg5', 'Bf4'],
  'd4 Nf6 c4': ['g6', 'e6', 'c5'],
  'd4 Nf6 c4 g6': ['Nc3', 'Nf3'],
  'd4 Nf6 c4 g6 Nc3': ['Bg7', 'd5'],
  'd4 Nf6 c4 g6 Nc3 Bg7': ['e4'],
  'd4 Nf6 c4 g6 Nc3 Bg7 e4': ['d6'],
  'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6': ['Nf3', 'Be2', 'f3'],
  
  // --- Nimzo-Indian Defense ---
  'd4 Nf6 c4 e6': ['Nc3', 'Nf3', 'g3'],
  'd4 Nf6 c4 e6 Nc3': ['Bb4', 'd5'],
  'd4 Nf6 c4 e6 Nc3 Bb4': ['e3', 'Qc2', 'Bg5'],

  // ==========================================
  // OTHER OPENINGS
  // ==========================================
  
  // --- 1. Nf3 (Reti Opening) ---
  'Nf3': ['d5', 'Nf6', 'c5', 'g6'],
  'Nf3 d5': ['c4', 'd4', 'g3', 'b3'],
  'Nf3 Nf6': ['c4', 'g3', 'd4'],

  // --- 1. c4 (English Opening) ---
  'c4': ['e5', 'c5', 'Nf6', 'e6', 'g6'],
  'c4 e5': ['Nc3', 'g3'],
  'c4 e5 Nc3': ['Nf6', 'Nc6', 'Bb4'],
  'c4 c5': ['Nc3', 'Nf3', 'g3'],
  'c4 c5 Nc3': ['Nc6', 'Nf6', 'g6'],
  'c4 c5 Nc3 Nc6': ['g3', 'Nf3', 'e3'],
};
