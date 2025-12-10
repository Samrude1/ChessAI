# RobCo Chess Terminal v2.1

**"I'm just so happy to be playing chess with you, Partner!"**

RobCo Chess Terminal is a retro-futuristic chess application built with **React**, **TypeScript**, and the **Google Gemini API**. It simulates a monochrome CRT terminal from the Fallout universe, featuring the overly enthusiastic "Yes Man" Securitron as your opponent and commentator.

## 📺 Features

### ☢️ Retro Aesthetic
- **Phosphor Blue Theme**: A high-contrast monochrome color scheme (Phosphor #80dfff) typical of RobCo terminals.
- **CRT Simulation**: Real-time CSS effects including scanlines, screen curvature, chromatic aberration (RGB split), static noise, and screen flicker.
- **Pixel Art Interface**: Custom-designed SVG chess pieces and a reactive pixel-art face for Yes Man.

### 🤖 AI Persona ("Yes Man")
- **Dynamic Commentary**: Powered by the **Gemini 2.5 Flash** model, the AI analyzes your moves and provides witty, in-character comments.
- **Context Awareness**: The bot knows if it's winning, losing, attacking, or defending. It gloats politely when it captures a piece and compliments you aggressively when you make a good move.
- **Mood System**: Yes Man's face reacts to the game state—smiling neutrally during normal play, looking focused when thinking, and grinning excitedly during Checks or Victories.

### ♟️ Chess Engine (Stockfish 17)
- **Stockfish 17 Lite**: A world-class chess engine running via WebAssembly in a Web Worker.
- **Super-Grandmaster Strength**: Plays at ~3000+ ELO with 1 second per move thinking time.
- **Robust Architecture**: Includes timeout handling and automatic worker restart to prevent freezes.

### 🔊 Audio Atmosphere
- **Web Audio API Synth**: No external audio files—all sounds are generated in real-time.
- **Ambient Noise**: A procedural background loop simulating 60Hz electrical hum and cooling fans.
- **Retro SFX**: Square and sawtooth wave "beeps" and "boops" for moves, captures, and computer processing.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Custom CSS with CRT effects
- **Chess Logic**: `chess.js` (Move validation)
- **Chess Engine**: `stockfish` (WebAssembly)
- **AI Commentary**: `@google/genai` (Gemini API)
- **Audio**: Native Web Audio API

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   Create a `.env.local` file with your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: Navigate to `http://localhost:3000`

## 🎮 How to Play

1. **Select a Side**: Choose "Initiate" (White) or "React" (Black) on the startup screen.
2. **Make Moves**: Click a piece to select it, then click a valid target square (highlighted).
3. **Listen & Watch**:
   - The "Data Log" on the left records the move history.
   - The "Yes Man" monitor on the right displays the AI's thoughts and facial expressions.
   - Listen for the retro sound effects and ambient hum.
4. **Game Over**: The terminal will display a "Critical Failure" (Loss) or "Victory" screen upon Checkmate.

## ⚠️ Notes

- The game is optimized for desktop but includes a mobile-responsive layout.
- Requires a valid `VITE_GEMINI_API_KEY` for the Gemini API to enable commentary.
- Stockfish runs in a Web Worker to prevent UI freezing.

---

*"Now, if you'll excuse me, I have to go plan my next move! It's going to be great!"*
