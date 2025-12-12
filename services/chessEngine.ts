import { Chess, type Move } from 'chess.js';

interface WorkerResponse {
    id: string;
    bestMove?: Move | null;
    error?: string;
}

// Map to store pending promises waiting for worker response
const pendingRequests = new Map<string, { resolve: (move: Move | null) => void; reject: (err: any) => void }>();

// Stockfish worker - the library IS the worker
let stockfishWorker: Worker | null = null;
let engineReady = false;
let currentRequestId: string | null = null;

const createStockfishWorker = () => {
    // Stockfish.js is designed to BE the worker file
    const worker = new Worker('stockfish.js');

    worker.onmessage = (e: MessageEvent) => {
        const line = typeof e.data === 'string' ? e.data : e.data?.toString() || '';

        // console.log("SF:", line); // Debug

        if (line === 'uciok') {
            engineReady = true;
        }

        if (line.startsWith('bestmove')) {
            // Format: "bestmove e2e4 ponder e7e5"
            const parts = line.split(' ');
            const moveStr = parts[1]; // "e2e4"

            if (currentRequestId) {
                const request = pendingRequests.get(currentRequestId);
                if (request) {
                    if (moveStr && moveStr !== '(none)') {
                        // Convert UCI "e2e4" to { from: "e2", to: "e4" }
                        const from = moveStr.substring(0, 2);
                        const to = moveStr.substring(2, 4);
                        const promotion = moveStr.length > 4 ? moveStr.substring(4, 5) : undefined;

                        request.resolve({ from, to, promotion } as any);
                    } else {
                        request.resolve(null);
                    }
                    pendingRequests.delete(currentRequestId);
                }
                currentRequestId = null;
            }
        }
    };

    worker.onerror = (e) => {
        console.error("Stockfish Worker Error:", e);
        if (currentRequestId) {
            const request = pendingRequests.get(currentRequestId);
            if (request) {
                request.reject(new Error("Stockfish worker error"));
                pendingRequests.delete(currentRequestId);
            }
            currentRequestId = null;
        }
    };

    // Initialize UCI
    worker.postMessage('uci');

    return worker;
};

// Initialize on first import
stockfishWorker = createStockfishWorker();

export const findBestMove = (game: Chess): Promise<Move | null> => {
    return new Promise((resolve, reject) => {
        if (!stockfishWorker) {
            stockfishWorker = createStockfishWorker();
        }

        const id = crypto.randomUUID();
        const fen = game.fen();

        let timeoutId: NodeJS.Timeout;

        const cleanup = () => {
            clearTimeout(timeoutId);
            pendingRequests.delete(id);
        };

        // Set a timeout to prevent hanging forever
        timeoutId = setTimeout(() => {
            if (pendingRequests.has(id)) {
                cleanup();
                console.warn("Stockfish timed out - Terminating and restarting...");

                // HARD RESET
                stockfishWorker?.terminate();
                stockfishWorker = createStockfishWorker();

                reject(new Error("Chess engine timed out"));
            }
        }, 30000);

        pendingRequests.set(id, {
            resolve: (move) => {
                cleanup();
                resolve(move);
            },
            reject: (err) => {
                cleanup();
                reject(err);
            }
        });

        currentRequestId = id;

        // Send position and go command
        stockfishWorker.postMessage(`position fen ${fen}`);
        stockfishWorker.postMessage('go movetime 1000'); // 1 second per move
    });
};

export const setSkillLevel = (level: number) => {
    if (!stockfishWorker) {
        stockfishWorker = createStockfishWorker();
    }

    // Stockfish skill level: 0 (weakest) to 20 (strongest)
    stockfishWorker.postMessage(`setoption name Skill Level value ${level}`);
};
