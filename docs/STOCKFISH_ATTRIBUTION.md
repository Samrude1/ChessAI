# Stockfish Chess Engine Attribution & GPL Compliance

## About Stockfish

This project uses **Stockfish**, a free and powerful UCI chess engine derived from Glaurung 2.1.

### Official Information
- **Website**: https://stockfishchess.org/
- **Stockfish Upstream Repository**: https://github.com/official-stockfish/Stockfish
- **Stockfish.js (WASM Port) Repository**: https://github.com/nmrugg/stockfish.js
- **License**: GNU General Public License v3.0 (GPL-3.0)
- **Local License File**: [LICENSE-GPL.txt](../LICENSE-GPL.txt)

---

## What is Stockfish?

Stockfish is one of the strongest chess engines in the world. It is:
- **Open Source**: Free to use, study, share, and improve under GPL-3.0
- **Cross-Platform**: Runs across platforms, including web browsers via WebAssembly
- **UCI Compatible**: Communicates using the standard Universal Chess Interface (UCI) protocol
- **Actively Developed**: Maintained by an international open-source community

---

## How This Project Uses Stockfish & GPL-3.0 Compliance

This chess application incorporates Stockfish as an AI opponent engine:
- **Engine Files**:
  - `public/stockfish.js` (JavaScript Web Worker wrapper)
  - `public/stockfish.wasm` (WebAssembly binary compiled from Stockfish)
- **Stockfish Version Used**: Stockfish.js 17.1 (single-threaded WebAssembly build)
- **Build / Packaging Origin**: Stockfish 17.1 release via npm (`stockfish@^17.1.0`), built from https://github.com/nmrugg/stockfish.js
- **Network Weights (NNUE)**: Embedded / bundled in the WASM build (`nn-9067e33176e`)
- **Integration Architecture**:
  - Stockfish runs strictly inside a separate browser `Worker` instance (`new Worker('stockfish.js')`).
  - Interaction occurs solely through standard UCI string commands (`uci`, `isready`, `position fen ...`, `go movetime ...`) via `postMessage()`.
  - In accordance with the GNU GPL v3 terms and FSF guidelines for aggregated works, the engine runs at arm's length as an independent process, keeping the UI wrapper under its respective MIT license while ensuring Stockfish remains fully protected under GPL-3.0.

---

## Source Code Availability (GPL-3.0 Section 6)

In compliance with GNU General Public License v3.0:
1. **Unmodified Upstream**: The engine binary included here is an unmodified build of the open-source `stockfish.js` project.
2. **Corresponding Source**: The complete source code used to produce the WebAssembly binary and JavaScript wrapper is freely available at:
   - **Stockfish.js Source**: https://github.com/nmrugg/stockfish.js
   - **Stockfish Core C++ Source**: https://github.com/official-stockfish/Stockfish/tree/master/src
3. A full copy of the GNU General Public License v3.0 is included directly in this repository root at [LICENSE-GPL.txt](../LICENSE-GPL.txt).

---

## Authors & Contributors

Stockfish is developed and maintained by:
- Tord Romstad
- Marco Costalba
- Joona Kiiski
- Gary Linscott
- Stephane Nicolet
- Linmiao Xu (linrock)
- And hundreds of community contributors worldwide.

Stockfish.js WebAssembly port is maintained by:
- Nathan Rugg
- Chess.com, LLC
- And community contributors.

---

## Support Stockfish

Stockfish is a monumental achievement in open-source software and computer chess.
- ⭐ Star the [Stockfish GitHub repository](https://github.com/official-stockfish/Stockfish)
- ♟️ Support and follow engine development at [tests.stockfishchess.org](https://tests.stockfishchess.org/)
- 📢 Spread the word about open-source chess engines
