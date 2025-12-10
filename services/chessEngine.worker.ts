import { Chess } from 'chess.js';
import { openingBook } from './openings';

// Time limit for calculation (in ms)
const TIME_LIMIT = 3000;
let searchStartTime = 0;

class TimeoutError extends Error {
    constructor() {
        super('TimeoutError');
        this.name = 'TimeoutError';
    }
}

function checkTime() {
    if (Date.now() - searchStartTime > TIME_LIMIT) {
        throw new TimeoutError();
    }
}

// Piece values for evaluation
const pieceValue: { [key: string]: number } = {
    p: 100,
    n: 320,
    b: 330,
    r: 500,
    q: 900,
    k: 20000
};

// Piece-square tables for positional evaluation
const pawnTable = [
    0, 0, 0, 0, 0, 0, 0, 0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
    5, 5, 10, 25, 25, 10, 5, 5,
    0, 0, 0, 20, 20, 0, 0, 0,
    5, -5, -10, 0, 0, -10, -5, 5,
    5, 10, 10, -20, -20, 10, 10, 5,
    0, 0, 0, 0, 0, 0, 0, 0
];

const knightTable = [
    -50, -40, -30, -30, -30, -30, -40, -50,
    -40, -20, 0, 0, 0, 0, -20, -40,
    -30, 0, 10, 15, 15, 10, 0, -30,
    -30, 5, 15, 20, 20, 15, 5, -30,
    -30, 0, 15, 20, 20, 15, 0, -30,
    -30, 5, 10, 15, 15, 10, 5, -30,
    -40, -20, 0, 5, 5, 0, -20, -40,
    -50, -40, -30, -30, -30, -30, -40, -50
];

const bishopTable = [
    -20, -10, -10, -10, -10, -10, -10, -20,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -10, 0, 5, 10, 10, 5, 0, -10,
    -10, 5, 5, 10, 10, 5, 5, -10,
    -10, 0, 10, 10, 10, 10, 0, -10,
    -10, 10, 10, 10, 10, 10, 10, -10,
    -10, 5, 0, 0, 0, 0, 5, -10,
    -20, -10, -10, -10, -10, -10, -10, -20
];

const rookTable = [
    0, 0, 0, 0, 0, 0, 0, 0,
    5, 10, 10, 10, 10, 10, 10, 5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    0, 0, 0, 5, 5, 0, 0, 0
];

const queenTable = [
    -20, -10, -10, -5, -5, -10, -10, -20,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -10, 0, 5, 5, 5, 5, 0, -10,
    -5, 0, 5, 5, 5, 5, 0, -5,
    0, 0, 5, 5, 5, 5, 0, -5,
    -10, 5, 5, 5, 5, 5, 0, -10,
    -10, 0, 5, 0, 0, 0, 0, -10,
    -20, -10, -10, -5, -5, -10, -10, -20
];

const kingMiddleGameTable = [
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -20, -30, -30, -40, -40, -30, -30, -20,
    -10, -20, -20, -20, -20, -20, -20, -10,
    20, 20, 0, 0, 0, 0, 20, 20,
    20, 30, 10, 0, 0, 10, 30, 20
];

function getPieceSquareValue(piece: string, square: string, isWhite: boolean): number {
    const tables: { [key: string]: number[] } = {
        p: pawnTable,
        n: knightTable,
        b: bishopTable,
        r: rookTable,
        q: queenTable,
        k: kingMiddleGameTable
    };

    const table = tables[piece.toLowerCase()];
    if (!table) return 0;

    const file = square.charCodeAt(0) - 97; // a-h -> 0-7
    const rank = parseInt(square[1]) - 1; // 1-8 -> 0-7
    const index = isWhite ? (7 - rank) * 8 + file : rank * 8 + file;

    return table[index];
}

function evaluateBoard(game: Chess): number {
    let score = 0;
    const board = game.board();

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            if (piece) {
                const isWhite = piece.color === 'w';
                const value = pieceValue[piece.type];
                const square = String.fromCharCode(97 + j) + (8 - i);
                const positionValue = getPieceSquareValue(piece.type, square, isWhite);

                if (isWhite) {
                    score += value + positionValue;
                } else {
                    score -= value + positionValue;
                }
            }
        }
    }

    return score;
}

// Quiescence Search with depth limit to prevent timeouts
const quiescence = (game: Chess, alpha: number, beta: number, isMaximizingPlayer: boolean, depth: number = 0): number => {
    // Check time here too
    checkTime();

    // Check for game over states (Checkmate/Draw)
    if (game.isGameOver()) {
        if (game.isCheckmate()) {
            return game.turn() === 'w' ? -Infinity : Infinity;
        }
        return 0; // Draw
    }

    // Hard limit Q-search depth to prevent timeouts
    if (depth > 6) return evaluateBoard(game);

    const standPat = evaluateBoard(game);

    if (isMaximizingPlayer) {
        if (standPat >= beta) return beta;
        if (standPat > alpha) alpha = standPat;
    } else {
        if (standPat <= alpha) return alpha;
        if (standPat < beta) beta = standPat;
    }

    const moves = game.moves({ verbose: true });
    const captureMoves = moves.filter(m => m.captured || m.san.includes('+') || m.promotion);

    // MVV-LVA Sort
    captureMoves.sort((a, b) => {
        const valA = (a.captured ? pieceValue[a.captured] : 0) - pieceValue[a.piece];
        const valB = (b.captured ? pieceValue[b.captured] : 0) - pieceValue[b.piece];
        return valB - valA;
    });

    // Increased width from 4 to 15 to prevent missing tactics
    const limitedCaptures = captureMoves.slice(0, 15);

    for (const move of limitedCaptures) {
        game.move(move.san);
        const score = quiescence(game, alpha, beta, !isMaximizingPlayer, depth + 1);
        game.undo();

        if (isMaximizingPlayer) {
            if (score >= beta) return beta;
            if (score > alpha) alpha = score;
        } else {
            if (score <= alpha) return alpha;
            if (score < beta) beta = score;
        }
    }

    return isMaximizingPlayer ? alpha : beta;
};

// Minimax with proper checkmate/draw handling
const minimax = (game: Chess, depth: number, alpha: number, beta: number, isMaximizingPlayer: boolean): number => {
    // Check for game termination FIRST
    if (game.isGameOver()) {
        if (game.isCheckmate()) {
            // Prioritize faster mates
            const mateScore = 100000 + depth;
            return game.turn() === 'w' ? -mateScore : mateScore;
        }
        return 0; // Draw
    }

    if (depth === 0) {
        return quiescence(game, alpha, beta, isMaximizingPlayer);
    }

    const moves = game.moves({ verbose: true });

    // Move ordering: captures first
    moves.sort((a, b) => {
        if (a.captured && !b.captured) return -1;
        if (!a.captured && b.captured) return 1;
        return 0;
    });

    if (isMaximizingPlayer) {
        let maxEval = -Infinity;
        for (const move of moves) {
            game.move(move.san);
            const evaluation = minimax(game, depth - 1, alpha, beta, false);
            game.undo();
            maxEval = Math.max(maxEval, evaluation);
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            game.move(move.san);
            const evaluation = minimax(game, depth - 1, alpha, beta, true);
            game.undo();
            minEval = Math.min(minEval, evaluation);
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break;
        }
        return minEval;
    }
};

function findOpeningMove(game: Chess): string | null {
    const history = game.history({ verbose: false });
    const moveHistoryStr = history.join(' ');
    console.log('Worker: Opening book lookup for', { moveHistoryStr });

    // Check if we have a matching opening
    const nextMoves = openingBook[moveHistoryStr];
    if (nextMoves && nextMoves.length > 0) {
        const selectedMove = nextMoves[Math.floor(Math.random() * nextMoves.length)];
        console.log('Worker: Opening book found', { selectedMove, options: nextMoves });
        return selectedMove;
    }

    console.log('Worker: No opening book match');
    return null;
}

function findBestMoveInternal(game: Chess) {
    // Note: Opening book is disabled for FEN usage.

    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return null;

    let bestMoveSoFar = moves[0];

    // Iterative Deepening
    searchStartTime = Date.now();
    const MAX_DEPTH = 3; // We can go deeper if usage permits, but 3 is a safe baseline

    try {
        for (let depth = 1; depth <= MAX_DEPTH; depth++) {
            let bestMoveThisDepth = null;
            let bestValue = game.turn() === 'w' ? -Infinity : Infinity;

            for (const move of moves) {
                game.move(move.san);
                // Note: checkTime() is called inside minimax and quiescence
                const boardValue = minimax(game, depth, -Infinity, Infinity, game.turn() === 'w');
                game.undo();

                if (game.turn() === 'w') {
                    if (boardValue > bestValue) {
                        bestValue = boardValue;
                        bestMoveThisDepth = move;
                    }
                } else {
                    if (boardValue < bestValue) {
                        bestValue = boardValue;
                        bestMoveThisDepth = move;
                    }
                }
            }

            // If we completed this depth fully without timeout, update our best move
            if (bestMoveThisDepth) {
                bestMoveSoFar = bestMoveThisDepth;
            }
        }
    } catch (error) {
        if (error instanceof TimeoutError) {
            // Time limit reached, returning best move from previous depth
        } else {
            throw error;
        }
    }

    return bestMoveSoFar;
}

// Worker message handler
self.onmessage = (e: MessageEvent) => {
    const { id, fen } = e.data;
    console.log('Worker: Received request', { id, fen });

    try {
        const game = new Chess(fen);
        console.log('Worker: Game state', { turn: game.turn(), fen: game.fen() });
        const bestMove = findBestMoveInternal(game);
        console.log('Worker: Found best move', bestMove);

        self.postMessage({ id, bestMove });
    } catch (error: any) {
        console.error('Worker: Error', error);
        self.postMessage({ id, error: error.message });
    }
};