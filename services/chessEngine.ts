import { Chess, type Move } from 'chess.js';

interface WorkerResponse {
    id: string;
    bestMove?: Move | null;
    error?: string;
}

// Map to store pending promises waiting for worker response
const pendingRequests = new Map<string, { resolve: (move: Move | null) => void; reject: (err: any) => void }>();

// Helper to create worker
const createWorker = () => {
    const w = new Worker(new URL('./chessEngine.worker.ts', import.meta.url), { type: 'module' });

    w.onmessage = (e: MessageEvent<WorkerResponse>) => {
        const { id, bestMove, error } = e.data;
        const request = pendingRequests.get(id);

        if (request) {
            if (error) {
                request.reject(new Error(error));
            } else {
                request.resolve(bestMove || null);
            }
        }
    };

    w.onerror = (e) => {
        console.error("Worker Error:", e);
    };

    return w;
};

let worker = createWorker();

export const findBestMove = (game: Chess): Promise<Move | null> => {
    return new Promise((resolve, reject) => {
        const id = crypto.randomUUID();
        const fen = game.fen();

        let timeoutId: NodeJS.Timeout;

        const cleanup = () => {
            clearTimeout(timeoutId);
            pendingRequests.delete(id);
        };

        // Set a timeout to prevent hanging forever if worker dies silently
        timeoutId = setTimeout(() => {
            if (pendingRequests.has(id)) {
                cleanup();
                console.warn("Worker timed out - Terminating and restarting...");

                // HARD RESET: Kill the stuck worker and start fresh
                worker.terminate();
                worker = createWorker();

                // Reject the current promise
                reject(new Error("Chess engine timed out"));
            }
        }, 30000); // 30 second timeout

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

        worker.postMessage({ fen, id });
    });
};
