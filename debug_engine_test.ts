
import { Chess } from 'chess.js';
import { findBestMove } from './services/chessEngine';

console.log("Starting Debug Session for Chess Engine");

const runTest = async () => {
    // Test 1: Start Position (White to move)
    console.log("Test 1: Start Position (White)");
    const game = new Chess();
    console.time("White Move Time");
    const move = await findBestMove(game);
    console.timeEnd("White Move Time");
    console.log("White chose:", move?.san);

    // Test 2: Black to move (After e4)
    console.log("\nTest 2: After 1. e4 (Black)");
    game.move('e4');
    console.time("Black Move Time");
    const move2 = await findBestMove(game);
    console.timeEnd("Black Move Time");
    console.log("Black chose:", move2?.san);

    // Test 3: White to move (After 1. e4 e5)
    console.log("\nTest 3: After 1. e4 e5 (White)");
    game.move('e5');
    console.time("White Move Time 2");
    const move3 = await findBestMove(game);
    console.timeEnd("White Move Time 2");
    console.log("White chose:", move3?.san);
};

runTest().catch(console.error);
