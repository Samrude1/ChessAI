# Stockfish Chess Engine Attribution

## About Stockfish

This project uses **Stockfish**, a free, powerful UCI chess engine derived from Glaurung 2.1.

### Official Information
- **Website**: https://stockfishchess.org/
- **GitHub**: https://github.com/official-stockfish/Stockfish
- **License**: GNU General Public License v3.0 (GPL-3.0)

### What is Stockfish?

Stockfish is one of the strongest chess engines in the world. It is:
- **Open Source**: Free to use and modify
- **Cross-Platform**: Runs on Windows, macOS, Linux, and more
- **UCI Compatible**: Uses the Universal Chess Interface protocol
- **Actively Developed**: Continuously improved by a global community

### How This Project Uses Stockfish

This chess application uses Stockfish as the AI opponent engine:
- **Engine Location**: `/public/stockfish/stockfish-16.1-lite-single.js`
- **Integration**: Via WebAssembly (WASM) for browser compatibility
- **Purpose**: Provides chess move calculation and position evaluation
- **Skill Levels**: Configurable from beginner (1) to master (20)

### Stockfish License (GPL-3.0)

Stockfish is licensed under the **GNU General Public License v3.0**. Key points:

- ✅ **Free to Use**: You can use Stockfish for any purpose
- ✅ **Free to Modify**: You can modify the source code
- ✅ **Free to Distribute**: You can share Stockfish with others
- ⚠️ **Copyleft**: If you distribute modified versions, you must also license them under GPL-3.0
- ⚠️ **Source Code**: You must provide source code for any distributed modifications

**Full License**: https://github.com/official-stockfish/Stockfish/blob/master/Copying.txt

### Important Notes

1. **This Project Does NOT Modify Stockfish**: We use the official pre-compiled WASM build
2. **Stockfish is NOT Owned by This Project**: Stockfish is developed and maintained by the Stockfish team
3. **Attribution Required**: When using this project, please maintain this attribution to Stockfish

### Stockfish Team

Stockfish is developed by:
- Tord Romstad
- Marco Costalba
- Joona Kiiski
- Gary Linscott
- And many other contributors worldwide

### Version Information

- **Stockfish Version Used**: 16.1 (Lite Single-threaded WASM build)
- **Build Type**: WebAssembly (JavaScript wrapper)
- **Threading**: Single-threaded (optimized for web browsers)

### Support Stockfish

If you find Stockfish useful, consider:
- ⭐ Starring the [Stockfish GitHub repository](https://github.com/official-stockfish/Stockfish)
- 💬 Contributing to the project
- 📢 Spreading the word about this amazing open-source engine

---

**Thank you to the Stockfish team for creating and maintaining this incredible chess engine!** ♟️
