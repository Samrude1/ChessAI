# RobCo Chess Terminal v2.1

**"I'm just so happy to be playing chess with you, Partner!"**

RobCo Chess Terminal is a retro-futuristic chess application built with **React**, **Tailwind CSS**, and the **Google Gemini API**. It simulates a monochrome CRT terminal from the Fallout universe, featuring the overly enthusiastic "Yes Man" Securitron as your opponent and commentator.

## 📺 Features

### ☢️ Retro Aesthetic
- **Phosphor Blue Theme**: A high-contrast monochrome color scheme (Phosphor #80dfff) typical of RobCo terminals.
- **CRT Simulation**: Real-time CSS effects including scanlines, screen curvature, chromatic aberration (RGB split), static noise, and screen flicker.
- **Pixel Art Interface**: Custom-designed SVG chess pieces and a reactive pixel-art face for Yes Man.

### 🤖 AI Persona ("Yes Man")
- **Dynamic Commentary**: Powered by the **Gemini 2.5 Flash** model, the AI analyzes every move you make.
- **Context Awareness**: The bot knows if it's winning, losing, attacking, or defending. It gloats politely when it captures a piece and compliments you aggressively when you make a good move.
- **Mood System**: Yes Man's face reacts to the game state—smiling neutrally during normal play, looking focused when thinking, and grinning excitedly during Checks or Victories.

### ♟️ Chess Engine
- **Minimax Algorithm**: A custom implementation running in the browser using `chess.js` for move validation.
- **Strategic Depth**: Features Alpha-Beta pruning, Quiescence Search (to prevent horizon effect), and PeSTO evaluation tables for positional awareness.
- **Opening Book**: Includes a comprehensive library of standard openings (Ruy Lopez, Sicilian, London System, etc.) to ensure solid early-game play.

### 🔊 Audio Atmosphere
- **Web Audio API Synth**: No external audio files—all sounds are generated in real-time.
- **Ambient Noise**: A procedural background loop simulating 60Hz electrical hum and cooling fans.
- **Retro SFX**: Square and sawtooth wave "beeps" and "boops" for moves, captures, and computer processing.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS Animations
- **Logic**: `chess.js` (Move validation)
- **AI**: `@google/genai` (Gemini API)
- **Audio**: Native Web Audio API

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
- Requires a valid `API_KEY` for the Gemini API to enable commentary.

---

*"Now, if you'll excuse me, I have to go plan my next move! It's going to be great!"*
