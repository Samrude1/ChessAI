# User Guide - Yes Man Chess Terminal

Welcome to **Yes Man Chess Terminal**, a retro-futuristic chess game with AI commentary and customizable themes!

## 🎮 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd gemini-chess-commentary

# Install dependencies
npm install

# Set up your API key
cp .env.example .env.local
# Edit .env.local and add your Gemini API key
```

### 2. Running the Game

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 3. First Game

1. **Choose Your Color**: Select "PLAY WHITE" or "PLAY BLACK"
2. **Set Difficulty**: Adjust the opponent difficulty slider (1-20)
3. **Customize Theme**: Use the hue slider to pick your terminal color
4. **Start Playing**: Click a piece, then click where you want to move it

## 🎨 Customizing Your Experience

### Theme Selection

The game features a **customizable monochrome terminal aesthetic**:

- **Hue Slider**: Drag the slider to choose any color (0-360°)
  - 0° = Red
  - 120° = Green  
  - 195° = Blue (default)
  - 300° = Magenta
- **Preset Themes**: Quick access to Blue, Green, and Red
- **Persistent**: Your theme is saved automatically

### Difficulty Levels

Adjust AI strength with the difficulty slider:

| Level | Label | Description |
|-------|-------|-------------|
| 1-5 | BEGINNER | Perfect for learning chess |
| 6-10 | INTERMEDIATE | Challenging but beatable |
| 11-15 | ADVANCED | Strong tactical play |
| 16-20 | MASTER | Near-perfect play |

## ♟️ How to Play

### Making Moves

1. **Select a Piece**: Click on one of your pieces
   - Valid pieces will be highlighted
   - Possible moves will be shown
2. **Move the Piece**: Click on a highlighted square
   - The piece will move
   - AI will respond automatically

### Special Moves

- **Castling**: Click your king, then click 2 squares toward the rook
- **En Passant**: Automatically available when legal
- **Promotion**: Pawn reaching the end promotes to Queen automatically

### Game Controls

Located at the bottom right:

- **[ DOWNLOAD PGN ]**: Save your game in standard chess notation
- **[ RESIGN ]**: Concede the game
- **[ ABORT SIMULATION ]**: Return to main menu

## 🤖 AI Commentary

### Yes Man's Personality

The AI opponent provides live commentary with different moods:

- **😊 Happy (Neutral)**: Standard cheerful commentary
- **🤔 Thinking**: Processing next move
- **🎉 Excited**: Check or critical moments
- **😎 Confident**: Winning position
- **😰 Worried**: Losing slightly
- **😱 Desperate**: Critical position
- **😢 Defeated**: Lost the game

### Commentary Features

- **Real-time Reactions**: AI comments after every move
- **Mood-Based**: Tone changes with game state
- **Personality-Driven**: Characteristic Yes Man cheerfulness
- **Move Analysis**: Tactical awareness and position evaluation

## 📊 Game Information

### Move History

- **Full Notation**: All moves in algebraic notation
- **Move Numbers**: Organized by turn
- **Scrollable**: Review the entire game

### Captured Pieces

- **Material Count**: Shows captured pieces for both sides
- **Visual Display**: See what pieces have been taken
- **Advantage Indicator**: Know who's ahead in material

### Status Display

- **Current Turn**: Shows whose turn it is
- **Game State**: Check, checkmate, stalemate notifications
- **Timer**: (Future feature)

## 🎯 Tips for Playing

### For Beginners

1. **Start at Level 1-3**: Learn the basics without pressure
2. **Watch the Commentary**: AI hints at good/bad moves
3. **Take Your Time**: No rush, think through your moves
4. **Learn from Losses**: Download PGN and analyze later

### For Advanced Players

1. **Challenge Yourself**: Try levels 15-20 for serious games
2. **Opening Practice**: Test your repertoire against strong AI
3. **Tactical Training**: AI will punish mistakes quickly
4. **Endgame Study**: Practice converting advantages

## 🔧 Troubleshooting

### AI Not Responding

- **Check Internet**: Gemini API requires connection
- **Verify API Key**: Ensure `.env.local` has valid key
- **Refresh Page**: Sometimes helps with stuck states

### Performance Issues

- **Close Other Tabs**: Free up browser memory
- **Lower Difficulty**: Reduces calculation time
- **Clear Cache**: Refresh with Ctrl+Shift+R

### Visual Glitches

- **Hard Refresh**: Ctrl+Shift+R clears cached styles
- **Try Different Browser**: Chrome/Edge recommended
- **Check Theme**: Some custom hues may need adjustment

## 📝 Keyboard Shortcuts

Currently, the game is mouse/touch-only. Keyboard shortcuts are planned for future updates.

## 🎨 CRT Effects

The game features authentic retro CRT monitor effects:

- **Scanlines**: Horizontal lines across the screen
- **Screen Curvature**: Subtle vignette effect
- **Random Glitches**: Occasional screen shake (~every 25s)
- **Distortion**: Periodic blur/contrast shifts (~every 30s)
- **Noise**: Animated static overlay

These effects are subtle and enhance the retro aesthetic without interfering with gameplay.

## 🌐 Browser Compatibility

**Recommended Browsers:**
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

**Mobile Support:**
- ✅ iOS Safari
- ✅ Chrome Mobile
- ✅ Samsung Internet

## 📱 Mobile Play

The game is fully responsive:

- **Portrait Mode**: Stacked layout (board on top, AI below)
- **Landscape Mode**: Side-by-side layout (like desktop)
- **Touch Controls**: Tap to select and move pieces
- **Swipe Scrolling**: Navigate commentary and move history

## 🎓 Learning Resources

### Chess Basics
- [Chess.com Learn](https://www.chess.com/learn-how-to-play-chess)
- [Lichess Practice](https://lichess.org/practice)

### Opening Theory
- [Chess Openings Explorer](https://www.chess.com/openings)
- [Lichess Opening Database](https://lichess.org/analysis)

### Tactics Training
- [Chess Tactics](https://www.chess.com/puzzles)
- [Lichess Puzzles](https://lichess.org/training)

## 🐛 Known Issues

- Stockfish worker may take a moment to initialize on first load
- AI commentary requires active internet connection
- Very long games (100+ moves) may slow down slightly

## 🔮 Planned Features

- [ ] Save/Load games
- [ ] Game analysis mode
- [ ] Multiple AI personalities
- [ ] Online multiplayer
- [ ] Opening book integration
- [ ] Puzzle mode
- [ ] Keyboard shortcuts
- [ ] Game timer/clock

## 💬 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the README.md

---

**Enjoy your games against Yes Man!** ♟️🤖

*"I'm programmed to help you win... or at least try really hard!"* - Yes Man
