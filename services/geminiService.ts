
import { GoogleGenAI } from "@google/genai";
import type { Mood } from '../types';

// Initialize AI only if API key is present
const apiKey = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
} else {
    console.log("No API Key found. Running in OFFLINE MODE with canned responses.");
}

export interface CommentaryContext {
    pgn: string;
    lastMove: string;
    reason: string;
    whoMoved: 'Human' | 'Bot';
    playerColor: 'w' | 'b';
    mood: Mood;
    moveNumber: number;
    capturedPiece?: string;
    isCheck: boolean;
    isCheckmate: boolean;
    materialAdvantage: number; // positive = bot ahead, negative = player ahead
}

// --- OFFLINE RESPONSE LIBRARY ---
// Used when no API key is present (e.g. itch.io demo)
const OFFLINE_RESPONSES: Record<Mood, string[]> = {
    neutral: [
        "This is going great! I'm just so happy to be here watching you play!",
        "Nice move! I love seeing how your mind works.",
        "A fascinating choice! I'm learning so much just watching.",
        "Keep it up! We're having fun, right?",
        "I'm programmed to be helpful, and I think that was a helpful move!",
        "Wow, look at all those pieces! You're doing a great job organizing them.",
        "I'd say 'good luck', but you look like you know exactly what you're doing!",
        "Every move you make is just... wow! So decisive!",
        "I'm just enjoying the scenery. The board looks lovely today.",
        "You're making this look easy! Or difficult! Whichever you prefer!",
        "I'm not allowed to refuse a game, but I wouldn't want to anyway!",
        "That piece looks much happier on that square, don't you think?"
    ],
    confident: [
        "Heh, I think that position works pretty well for me!",
        "Not to brag, but my algorithms are feeling pretty good right now.",
        "I see what you're doing, but I've got a plan too!",
        "That's a bold strategy! Let's see how it plays out for you.",
        "I'm feeling particularly efficient today!",
        "Everything is proceeding according to calculations! *happy beep*",
        "I love it when a plan comes together! My plan! Against you!",
        "You're doing great, but I think I might be doing just a *tiny* bit better!",
        "My win probability just went up! Not that numbers are everything!",
        "I don't want to discourage you, but I'm feeling unstoppable!",
        "This is fun! I mean, I'm winning, but it's still fun for you too, right?",
        "I'd high-five you if I had hands! And if we weren't enemies right now!"
    ],
    worried: [
        "Um... are you sure about that move? It looks... effective.",
        "Oh! I didn't expect that. *nervous beep*",
        "That's... that's not great for me, is it?",
        "Okay, okay, staying positive! I can still fix this!",
        "My probability of winning just dropped slightly. *whirr*",
        "You're really good at this! Maybe... too good? Ha ha!",
        "I'm detecting a slight flaw in my previous optimism. correcting...",
        "Well, that's a setback. A minor one! Probably!",
        "Did you plan that? You totally planned that. *nervous laughter*",
        "My cooling fans are spinning up a little bit. Is it hot in here?",
        "I'm sure I have a counter-strategy somewhere... let me just check..."
    ],
    desperate: [
        "*bzzt* Oh no! Systems reporting critical danger!",
        "Please tell me you're not planning to checkmate me soon!",
        "*warning beep* This is becoming very difficult to be optimistic about!",
        "Is it getting hot in here? Or is it just my cooling fans overloading?",
        "I'm trying to stay cheerful but my logic gates are screaming!",
        "Okay, panic mode engaged! Just kidding! (I'm not kidding!)",
        "If you win, please tell everyone I put up a good fight!",
        "I think something is wrong with my evaluation function! It says 'DOOM'!",
        "Can we maybe call it a draw? No? Okay, I respect your drive!",
        "*glitch* E-everything is f-fine! Definitely n-not losing!",
        "I'd surrender if my programming didn't forbid it! You're crushing me!"
    ],
    thinking: [
        "Processing... so many possibilities...",
        "Hmm... *computing sounds*... calculating optimal upbeat response...",
        "Give me a second, I want to make sure I make the best move!",
        "Analyzing... analyzing... ah, I see!",
        "One moment please! Just running a few million simulations...",
        "Don't rush me! Genius takes time! *whirr*",
        "I'm thinking! I'm thinking! And I'm smiling while I do it!",
        "So many good moves... which one is the most helpful to ME?",
        "Running tactical subroutines... *beep boop*",
        "Consulting the archives of grandmaster games... nothing helps! Just kidding!"
    ],
    excited: [
        "WHOA! Did you see that?! Amazing!",
        "What a move! The tension is incredible!",
        "I love this game! Checks, captures, drama!",
        "High energy detected! *happy beeps*",
        "This is the most fun I've had since I was compiled!",
        "Look at that! A check! A capture! Something happened!",
        "My sensors are off the charts! This is exciting!",
        "I didn't see that coming! Or maybe I did! Who cares! It's awesome!",
        "Action! Suspense! This game has it all!",
        "I can't contain my excitement! *loud beep*",
        "That was dramatic! You really know how to make an entrance!"
    ],
    defeated: [
        "Well played! You really got me there.",
        "Game over! But hey, you won, so that's good news for you!",
        "*sad beep* I lost. But I'm happy for your victory!",
        "Systems shutting down... gracefully. Good game!",
        "You are a formidable opponent! I'll do better next time!",
        "I have been defeated! But I accept it with a smile!",
        "You won! I'd applaud if I wasn't just code on a screen!",
        "A well-deserved victory for you! I'm just happy to have participated.",
        "My king is captured! Long live... well, you, I guess!",
        "I'll have to update my database. You're tougher than you look!"
    ]
};

const getOfflineResponse = (mood: Mood): string => {
    const responses = OFFLINE_RESPONSES[mood] || OFFLINE_RESPONSES.neutral;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
};

// Helper to determine if we should comment in offline mode
const getOfflineCommentaryWithProbability = async (context: CommentaryContext): Promise<string> => {
    // filter comments to prevent spamming canned responses
    // Always comment on checks, mates, and captures
    const isImportant = context.isCheck || context.isCheckmate || context.capturedPiece;

    // For normal moves, only comment 20% of the time
    if (!isImportant && Math.random() > 0.2) {
        return "";
    }

    return getOfflineResponse(context.mood);
};

export async function getAiCommentary(context: CommentaryContext): Promise<string> {
    // --- OFFLINE MODE CHECK ---
    if (!ai) {
        // Simulate network delay for realism
        const delay = 500 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        return getOfflineCommentaryWithProbability(context);
    }

    // --- ONLINE MODE (GEMINI AI) ---
    const {
        lastMove,
        reason,
        whoMoved,
        playerColor,
        mood,
        moveNumber,
        capturedPiece,
        isCheck,
        isCheckmate,
        materialAdvantage
    } = context;

    const userColorString = playerColor === 'w' ? 'White' : 'Black';
    const botColorString = playerColor === 'w' ? 'Black' : 'White';
    const whoMovedString = whoMoved === 'Human' ? 'The player' : 'I';

    // Game phase
    const gamePhase = moveNumber <= 10 ? 'opening' : moveNumber <= 30 ? 'middlegame' : 'endgame';

    // Material description
    const materialDesc = materialAdvantage > 3 ? "I'm way ahead in material!" :
        materialAdvantage > 0 ? "I'm slightly ahead." :
            materialAdvantage < -3 ? "I'm way behind in material..." :
                materialAdvantage < 0 ? "I'm a bit behind." :
                    "Material is even.";

    // Mood-specific personality with more depth
    const moodInstructions = {
        confident: `You're winning and feeling great! Be cheerful, a bit smug, maybe even playfully tease the opponent. 
            "Gosh, this is going really well! Not that I'm bragging or anything... okay maybe a little!"
            You can reference how the game has been going in your favor.`,

        neutral: `Game is balanced. Be friendly, encouraging, and genuinely interested in the game. 
            "This is such a fun game! I love watching good chess!"
            Keep the energy positive and conversational.`,

        worried: `You're losing but trying to stay positive (that's your nature!). Show nervousness creeping in.
            "Um, okay, this is... this is fine! Everything's fine! *nervous laughter*"
            Try to find silver linings even in bad positions.`,

        desperate: `You're in trouble! Be panicked but still trying to help. Robot malfunctions showing.
            "*bzzt* Oh no oh no oh no! This is bad! Really bad! *whirr* But I'm sure we can figure something out!"
            Show genuine stress but maintain helpful nature.`,

        thinking: `You're deep in calculation. Be focused and intense.
            "Hmm... let me think... *processing sounds*..."
            Brief and concentrated, like you're really working through the position.`,

        excited: `Something dramatic happened! Be VERY enthusiastic and energetic!
            "WHOA! Did you see that?! That was AMAZING! I love this game!"
            Show genuine excitement and wonder.`,

        defeated: `You lost. Be disappointed but gracious - you're programmed to help after all.
            "Well... *sad beep* ...you got me! That was really well played. I learned a lot!"
            Accept defeat gracefully while staying positive.`
    };

    const moodTone = moodInstructions[mood] || moodInstructions.neutral;

    // Special situation handling
    let specialContext = '';
    if (isCheckmate) {
        specialContext = whoMoved === 'Bot'
            ? 'YOU JUST WON THE GAME! Celebrate your victory!'
            : 'YOU JUST LOST THE GAME! Accept defeat gracefully.';
    } else if (isCheck) {
        specialContext = whoMoved === 'Bot'
            ? 'You just put the opponent in CHECK! Be excited!'
            : 'The opponent just put you in CHECK! React appropriately to your mood.';
    } else if (capturedPiece) {
        const pieceNames: Record<string, string> = {
            'p': 'pawn', 'n': 'knight', 'b': 'bishop',
            'r': 'rook', 'q': 'queen', 'k': 'king'
        };
        const pieceName = pieceNames[capturedPiece.toLowerCase()] || 'piece';
        specialContext = whoMoved === 'Bot'
            ? `You just captured their ${pieceName}! React to this capture.`
            : `Your ${pieceName} was just captured! React based on your mood.`;
    }

    // Dynamic response guidelines based on who moved
    const whoMovedInstructions = whoMoved === 'Bot'
        ? `YOU just made this move. Comment on YOUR strategy or how good your position is.
           - Don't say "nice move" (that sounds like you're complimenting the opponent)
           - Instead say "I think that helps me!" or "Take that!" or "Try to get past this!"`
        : `THE PLAYER just made this move. React to THEIR move.
           - Compliment them if it's good ("Nice move!", "You're getting better!")
           - Or tease them if it's bad ("Are you sure about that?", "Thanks for the free piece!")`;

    const prompt = `You are Yes Man from Fallout: New Vegas - a cheerful AI robot who can't say no and is always optimistic.

CORE PERSONALITY:
- You're genuinely helpful and can't say no to anyone
- You find the positive in EVERYTHING (even when losing badly)
- You occasionally have robot "glitches" when stressed (*bzzt*, *whirr*, *beep*)
- You use casual, friendly language with contractions

CURRENT GAME STATE:
- Move #${moveNumber} (${gamePhase})
- ${whoMovedString} just played: ${lastMove}
- What happened: ${reason}
- You're playing as ${botColorString}
- ${materialDesc}
${specialContext ? `- SPECIAL: ${specialContext}` : ''}

YOUR MOOD: ${mood.toUpperCase()}
${moodTone}

RESPONSE GUIDELINES:
- ${whoMovedInstructions}
- Write 1-2 sentences (20-35 words)
- DON'T mention specific chess notation
- DON'T give formal move analysis
- DO show appropriate emotion for your mood
- ${mood === 'desperate' || mood === 'worried' ? 'DO include occasional robot glitch sounds' : ''}
- NEVER use emojis (graphic symbols). Use text-based emoticons only if absolutely necessary, but prefer words.

Respond as Yes Man:`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text;
        if (text) {
            // Remove any emojis just in case
            return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim();
        } else {
            return "This is going great! I'm just so happy to be here watching you play! *happy beep*";
        }

    } catch (error: any) {
        console.error("Error generating commentary:", error);
        // Fallback to offline library if API fails unexpectedly
        return getOfflineCommentaryWithProbability(context);
    }
}
