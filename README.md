# Yes Man Chess Terminal

<div align="center">

![Yes Man Chess Terminal](public/Näyttökuva%202026-02-08.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-80dfff?style=for-the-badge)](LICENSE)
[![Stockfish 16.1](https://img.shields.io/badge/Engine-Stockfish%2016.1-80dfff?style=for-the-badge)](https://stockfishchess.org/)
[![React 19](https://img.shields.io/badge/React-19-80dfff?style=for-the-badge)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-80dfff?style=for-the-badge)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-80dfff?style=for-the-badge)](https://vitejs.dev/)

**A retro-futuristic chess game featuring AI-powered commentary, dynamic personality system, and authentic CRT terminal aesthetics.**

[Features](#-features) • [Demo](#-live-demo) • [Installation](#-installation) • [Documentation](#-documentation) • [Tech Stack](#️-tech-stack)

</div>

---

## 🎮 Overview

Yes Man Chess Terminal is a unique chess experience that combines professional-grade chess AI with a personality-driven commentary system. Inspired by the Yes Man character from Fallout: New Vegas, this application features a cheerful, overly-helpful AI opponent that reacts dynamically to every move with context-aware commentary and expressive mood changes.

The game runs in both **Online Mode** (with Google Gemini API for real-time generative commentary) and **Offline Mode** (with a curated library of character-specific responses), making it fully playable without an API key.

### Key Highlights

- 🤖 **Personality-Driven AI** - Yes Man reacts with genuine emotion and context awareness
- ♟️ **Professional Chess Engine** - Powered by Stockfish 16.1 with adjustable difficulty (0-20)
- 🎨 **Retro CRT Aesthetics** - Authentic terminal effects with customizable monochrome themes
- 🎯 **Dual Mode Operation** - Works online (Gemini API) or offline (canned responses)
- 🎭 **Dynamic Mood System** - 6 distinct moods with visual and commentary changes
- 🔊 **Immersive Audio** - Retro computer sounds and ambient effects

---

## ✨ Features

### 🤖 Yes Man AI Opponent

#### Personality System
Yes Man is not just a chess engine—he's a character with personality:
- **Cheerful & Helpful** - Always optimistic, even when losing
- **Context-Aware** - Understands checks, captures, material changes, and game state
- **Natural Language** - Short, conversational responses (max 15 words) with genuine emotion
- **Character-Authentic** - Stays true to the Yes Man personality from Fallout: New Vegas

#### Dual Commentary Modes
1. **Online Mode** (Requires API Key)
   - Real-time generative commentary powered by Google Gemini 2.0 Flash
   - Contextual responses based on game state, move history, and tactical significance
   - Unique commentary for every game situation

2. **Offline/Demo Mode** (No API Key Required)
   - Fully playable without internet or API key
   - Curated library of 50+ character-specific responses
   - Mood-based response selection
   - Perfect for demos, portfolios, or offline play

#### Dynamic Mood System
Yes Man's personality changes based on game state with 6 distinct moods:

| Mood | Trigger | Visual | Commentary Style |
|------|---------|--------|------------------|
| 😎 **Confident** | Material advantage (+2 or more) | Smug expression | Boastful but friendly |
| 😊 **Neutral** | Balanced position | Happy face | Cheerful and encouraging |
| 😰 **Worried** | Slight disadvantage (-2 to -5) | Nervous expression | Anxious but optimistic |
| 😱 **Desperate** | Major disadvantage (-5 or worse) | Panicking face | Frantic but still helpful |
| 🤔 **Thinking** | Processing moves | Computing animation | Analytical sounds |
| 🎉 **Excited** | Check or critical moments | Animated face | Enthusiastic reactions |
| 💀 **Defeated** | Checkmate (Yes Man lost) | Sad but accepting | Gracious in defeat |

### ♟️ Chess Features

#### Professional Chess Engine
- **Stockfish 16.1 WASM** - One of the world's strongest chess engines
- **Adjustable Difficulty** - Skill levels 0-20 (Beginner to Master)
- **Smart Move Selection** - 1-second move time for responsive gameplay
- **UCI Protocol** - Standard chess engine communication

#### Game Mechanics
- ✅ **Full Move Validation** - Legal moves only (powered by chess.js)
- 🎯 **Move Highlighting** - Visual indicators for selected pieces and valid moves
- 📊 **Material Tracking** - Real-time display of captured pieces
- 📝 **Move History** - Complete game notation in algebraic format
- 💾 **PGN Export** - Download games for analysis
- 🏳️ **Resign Option** - Concede when needed
- 🔄 **New Game** - Restart with different color/difficulty

#### Tactical Awareness
Yes Man only comments on tactically significant moves:
- ♔ **Checks & Checkmates** - Always noteworthy
- ⚔️ **Captures** - Material exchanges
- 👑 **Promotions** - Pawn transformations
- 🏰 **Castling** - Strategic king safety
- 🎯 **Game Endings** - Checkmate, stalemate, draws

### 🎨 Retro Terminal Aesthetic

#### Customizable Monochrome Theme
- **360° Hue Slider** - Choose any color for the terminal theme
- **Dynamic Updates** - All UI elements change instantly
- **Consistent Design** - Single-color aesthetic throughout

#### Authentic CRT Monitor Effects
- **Scanlines** - Horizontal CRT scan lines overlay
- **Screen Curvature** - Subtle vignette effect
- **Random Glitches** - Occasional screen shake (~25s intervals)
- **Distortion** - Periodic blur/contrast shifts (~30s intervals)
- **RGB Shift** - Color channel separation effect
- **Noise Overlay** - Animated static texture
- **Flicker** - Subtle brightness variations

#### Pixelated Yes Man Face
- **Retro Pixel Art** - Authentic 8-bit style character
- **Expressive Animations** - Face changes with mood
- **Smooth Transitions** - Animated mood changes

### 🔊 Audio System

#### Sound Effects
- 🎵 **Ambient Hum** - Continuous computer ambience
- ♟️ **Move Sounds** - Piece movement feedback
- ⚔️ **Capture Sounds** - Material exchange audio
- ♔ **Check Alert** - Warning sound for checks
- 🎮 **Game Start** - System initialization sound
- 🤖 **Processing Beeps** - Commentary generation feedback

#### Browser-Compliant Audio
- Auto-initialization on first user interaction
- Respects browser autoplay policies
- Graceful fallback if audio blocked

---

## 🌐 Live Demo

**Play now in your browser!**  
Try the game immediately without any installation:

### 🎮 [**Play on itch.io**](https://sr3design.itch.io/chess-terminal)

The itch.io version runs in **Offline Mode** with curated Yes Man responses—no API key needed, just pure retro chess fun!

**Want the full AI-powered experience?**  
👉 **[Get the Source Code on GitHub](https://github.com/Samrude1/ChessAI)** and add your own Gemini API key for real-time generative commentary.

> **Note**: The web demo uses hard-coded responses for instant playability. Download the source code to enable dynamic AI commentary powered by Google Gemini.

---

## 🚀 Installation

### Prerequisites

- **Node.js** 16 or higher
- **npm** or **yarn** package manager
- **Google Gemini API Key** (optional, for online mode)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Samrude1/ChessAI.git
cd gemini-chess-commentary

# 2. Install dependencies
npm install

# 3. Set up environment variables (optional for online mode)
cp .env.example .env.local

# 4. Add your Gemini API key to .env.local (optional)
# GEMINI_API_KEY=your_api_key_here

# 5. Start development server
npm run dev

# 6. Open browser to http://localhost:3000
```

### Environment Configuration

#### Online Mode (with API Key)
Create a `.env.local` file:

```env
# Get your API key at https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Offline Mode (without API Key)
Simply skip the `.env.local` file creation. The application will automatically:
- Detect missing API key
- Switch to offline mode
- Use curated response library
- Display "OFFLINE MODE" indicator

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

---

## 🎮 How to Play

### Starting a Game

1. **Launch Application** - Open in browser
2. **Select Color** - Choose White or Black
3. **Set Difficulty** - Adjust AI skill level slider (0-20)
   - 0-5: Beginner
   - 6-10: Intermediate
   - 11-15: Advanced
   - 16-20: Master
4. **Customize Theme** - Pick your favorite color (optional)
5. **Start Game** - Click "Initialize Combat Protocols"

### Making Moves

1. **Click a Piece** - Select your piece to move
2. **See Valid Moves** - Highlighted squares show legal moves
3. **Click Destination** - Move piece to highlighted square
4. **Watch Yes Man React** - Enjoy commentary and mood changes

### Game Controls

- **Download PGN** - Export game for analysis
- **Resign** - Concede the game
- **Abort Simulation** - Return to main menu
- **Reboot System** - Start new game after game over

### Tips

- Yes Man only comments on tactically important moves (checks, captures, promotions, castling)
- Watch his face for mood changes—it reflects his evaluation of the position
- Lower skill levels make more mistakes; higher levels play near-perfect chess
- PGN files can be imported into chess analysis software like Lichess or Chess.com

---

## 📁 Project Structure

```
gemini-chess-commentary/
├── components/              # React components
│   ├── AICommentary.tsx    # Yes Man monitor and commentary display
│   ├── Chessboard.tsx      # Interactive chess board with move validation
│   ├── YesManFace.tsx      # Pixelated animated character face
│   ├── GameStartModal.tsx  # Game setup and difficulty selection
│   ├── SettingsModal.tsx   # Theme customization
│   ├── MoveHistory.tsx     # Game notation display
│   ├── CapturedPieces.tsx  # Material tracker
│   └── icons/              # SVG icon components
├── services/               # Core services
│   ├── chessEngine.ts      # Stockfish integration and move calculation
│   ├── geminiService.ts    # AI commentary generation (online/offline)
│   └── soundService.ts     # Audio effects and ambient sounds
├── docs/                   # Documentation
│   ├── USER_GUIDE.md       # Complete user guide
│   ├── STOCKFISH_ATTRIBUTION.md  # Chess engine credits
│   └── ITCH_IO_DESCRIPTION.md    # Platform description
├── public/                 # Static assets
│   ├── stockfish.js        # Stockfish WASM worker
│   ├── style.css           # Global styles and CRT effects
│   └── *.png               # Screenshots and images
├── App.tsx                 # Main application component
├── constants.tsx           # Chess piece SVG definitions
├── types.ts                # TypeScript type definitions
├── index.tsx               # Application entry point
├── index.html              # HTML template with CRT effects
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

### Key Files Explained

#### Components
- **AICommentary.tsx** - Manages commentary display, scrolling, and Yes Man's monitor interface
- **Chessboard.tsx** - Handles piece rendering, move validation, drag-and-drop, and visual feedback
- **YesManFace.tsx** - Renders pixelated face with mood-based expressions and animations
- **GameStartModal.tsx** - Color selection, difficulty slider, and theme customization

#### Services
- **chessEngine.ts** - Stockfish worker management, UCI protocol, move calculation, skill level control
- **geminiService.ts** - Gemini API integration, offline response library, commentary context building
- **soundService.ts** - Web Audio API management, sound effects, ambient audio

#### Configuration
- **vite.config.ts** - Environment variable injection, path aliases, build optimization
- **tsconfig.json** - TypeScript compiler options, module resolution
- **index.html** - CRT effect CSS animations, global styles

---

## 🛠️ Tech Stack

### Frontend Framework
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite 6.2](https://vitejs.dev/)** - Lightning-fast build tool and dev server

### Chess Logic
- **[chess.js 1.4](https://github.com/jhlywa/chess.js)** - Chess move validation and game logic
- **[Stockfish 17.1 WASM](https://stockfishchess.org/)** - Professional chess engine (GPL-3.0)

### AI & Commentary
- **[Google Gemini 2.0 Flash](https://ai.google.dev/)** - Generative AI for natural language commentary
- **[@google/genai 1.30](https://www.npmjs.com/package/@google/genai)** - Official Gemini SDK

### Styling & Effects
- **CSS3** - Custom CRT effects, animations, and retro aesthetics
- **CSS Grid & Flexbox** - Responsive layout system
- **CSS Animations** - Scanlines, glitches, flicker effects

### Audio
- **Web Audio API** - Sound effects and ambient audio
- **Custom Sound Engine** - Browser-compliant audio management

### Development Tools
- **[@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)** - React Fast Refresh
- **[@types/node](https://www.npmjs.com/package/@types/node)** - Node.js type definitions
- **ESLint** - Code quality (implicit via Vite)

---

## 🎨 Customization

### Theme Colors

The application uses a **dynamic HSL-based theming system**:

```css
/* Theme is set via CSS custom properties */
--theme-hue: 180;  /* 0-360 degrees */
--theme-color: hsl(var(--theme-hue), 100%, 70%);
--theme-dim: hsl(var(--theme-hue), 100%, 20%);
```

Users can adjust the hue slider (0-360°) to choose any color:
- 0° = Red
- 120° = Green
- 180° = Cyan (default)
- 240° = Blue
- 300° = Magenta

### CRT Effects

Adjust effect intensity in `index.html`:

```css
/* Scanline density */
.scanlines {
  background: linear-gradient(transparent 50%, rgba(0,0,0,0.3) 50%);
  background-size: 100% 4px;
}

/* Glitch frequency */
@keyframes glitch {
  /* Triggers every ~25 seconds */
}

/* Distortion timing */
@keyframes distort {
  /* Triggers every ~30 seconds */
}
```

### AI Personality

Modify Yes Man's behavior in `services/geminiService.ts`:

```typescript
// Offline response library
const OFFLINE_RESPONSES: Record<Mood, string[]> = {
  neutral: ["Your custom responses..."],
  confident: ["Boastful responses..."],
  // ... etc
};

// Gemini system prompt
const systemPrompt = `
  You are Yes Man, a cheerful chess-playing robot...
  [Customize personality here]
`;
```

### Difficulty Levels

Adjust AI strength in `components/GameStartModal.tsx`:

```typescript
const difficulties = [
  { label: 'Beginner', level: 3 },
  { label: 'Intermediate', level: 8 },
  { label: 'Advanced', level: 13 },
  { label: 'Master', level: 18 }
];
```

Or use the slider for fine-grained control (0-20).

---

## 📚 Documentation

- **[User Guide](docs/USER_GUIDE.md)** - Complete guide to playing and customizing the game
- **[Stockfish Attribution](docs/STOCKFISH_ATTRIBUTION.md)** - Chess engine credits and licensing
- **[Itch.io Description](docs/ITCH_IO_DESCRIPTION.md)** - Platform-specific description

---

## 🐛 Known Issues & Limitations

### Technical Limitations
- **Stockfish Initialization** - Worker may take 1-2 seconds to initialize on first load
- **API Rate Limits** - Gemini API has rate limits (60 requests/minute on free tier)
- **Browser Compatibility** - CRT effects work best in Chromium-based browsers
- **Mobile Performance** - CRT effects may impact performance on low-end mobile devices

### Offline Mode Limitations
- **Repetitive Responses** - Limited response library (50+ responses) may repeat
- **No Context Memory** - Offline mode doesn't remember previous commentary
- **Generic Reactions** - Less specific than online mode's generative responses

### Planned Improvements
See [Future Enhancements](#-future-enhancements) for upcoming features.

---

## 🙏 Credits & Attribution

### Chess Engine
This project uses **[Stockfish](https://stockfishchess.org/)** - one of the strongest open-source chess engines in the world.

- **License**: GNU General Public License v3.0 (GPL-3.0)
- **Version**: 16.1 (WebAssembly build)
- **Repository**: https://github.com/official-stockfish/Stockfish
- **Full Attribution**: See [docs/STOCKFISH_ATTRIBUTION.md](docs/STOCKFISH_ATTRIBUTION.md)

> **Important**: Stockfish is NOT owned by this project. It is developed and maintained by the Stockfish team. This project uses the official pre-compiled WebAssembly build without modifications.

### AI Technology
- **[Google Gemini API](https://ai.google.dev/)** - Generative AI for natural language commentary
- **Model**: Gemini 2.0 Flash (fast, cost-effective, conversational)

### Libraries & Frameworks
- **[chess.js](https://github.com/jhlywa/chess.js)** - Chess move generation and validation (BSD-2-Clause)
- **[React](https://react.dev/)** - UI library (MIT)
- **[Vite](https://vitejs.dev/)** - Build tool (MIT)
- **[TypeScript](https://www.typescriptlang.org/)** - Type system (Apache-2.0)

### Inspiration
- **Yes Man Character** - Fallout: New Vegas (Bethesda Softworks/Obsidian Entertainment)
- **Retro Terminal Aesthetic** - Classic CRT monitors and vintage computing (Fallout series, Robco Industries)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Important Licensing Notes

- **This Project (MIT)**: The custom code, UI, and commentary system are MIT licensed
- **Stockfish (GPL-3.0)**: The chess engine is GPL-3.0 licensed (see [STOCKFISH_ATTRIBUTION.md](docs/STOCKFISH_ATTRIBUTION.md))
- **Dependencies**: Each dependency has its own license (see `package.json`)

**GPL Compliance**: This project uses Stockfish as a separate WebAssembly worker without modification. The GPL license applies to Stockfish only, not to this project's custom code.

---

## 🎯 Future Enhancements

### Planned Features
- [ ] **Save/Load Games** - Resume games from PGN files
- [ ] **Game Analysis Mode** - Post-game analysis with engine evaluation
- [ ] **Multiple AI Personalities** - Different characters (e.g., Mr. House, Caesar, NCR)
- [ ] **Online Multiplayer** - Play against other humans
- [ ] **Opening Book Integration** - Named opening recognition
- [ ] **Puzzle Mode** - Daily chess puzzles with Yes Man hints
- [ ] **Achievement System** - Unlock badges for milestones
- [ ] **Mobile App** - Native iOS/Android versions
- [ ] **Twitch Integration** - Stream-friendly overlay mode
- [ ] **Voice Synthesis** - Text-to-speech for Yes Man's commentary

### Technical Improvements
- [ ] **Progressive Web App** - Offline-first with service workers
- [ ] **WebGL Rendering** - Hardware-accelerated CRT effects
- [ ] **Cloud Save** - Sync games across devices
- [ ] **Replay System** - Watch games with commentary playback
- [ ] **Performance Optimization** - Reduce bundle size, lazy loading

---

## 🤝 Contributing

Contributions are welcome! This is a portfolio project, but improvements and bug fixes are appreciated.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style (TypeScript, React hooks, functional components)
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation if needed

---

## 💬 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/Samrude1/ChessAI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Samrude1/ChessAI/discussions)

---

## 🌟 Acknowledgments

Special thanks to:
- The **Stockfish team** for creating an incredible open-source chess engine
- **Google** for providing the Gemini API
- The **chess.js** maintainers for robust chess logic
- The **Fallout** community for inspiring the Yes Man character
- Everyone who plays and enjoys this game!

---

<div align="center">

**Enjoy playing chess against Yes Man!** 🤖♟️

*"I'm programmed to help you win... or at least try really hard!"* - Yes Man

---

Made with ❤️ and ☕ by [Samrude1](https://github.com/Samrude1)

</div>
