import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
    // Basic CORS headers to prevent cross-origin abuse if deployed
    res.setHeader('Access-Control-Allow-Origin', '*'); // Or restrict to specific domains
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
        
        if (!apiKey) {
            console.warn("No API key found in server environment.");
            return res.status(500).json({ error: 'API key is missing on the server.' });
        }

        const ai = new GoogleGenAI({ apiKey });
        const context = req.body; // Receive context object, not prompt string

        // Validate that we received a chess context and not an arbitrary prompt string
        if (!context || typeof context !== 'object' || !context.mood || !context.lastMove) {
            return res.status(400).json({ error: 'Valid chess context is required' });
        }

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

        // --- PROMPT GENERATION LOGIC (Moved from frontend for security) ---
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
        const moodInstructions: Record<string, string> = {
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

        const finalPrompt = `You are Yes Man from Fallout: New Vegas - a cheerful AI robot who can't say no and is always optimistic.

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

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: finalPrompt,
        });

        const text = response.text;
        let cleanedText = "This is going great! I'm just so happy to be here watching you play! *happy beep*";

        if (text) {
            // Remove emojis to match the original offline-capable personality
            cleanedText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim();
        }

        return res.status(200).json({ text: cleanedText });
    } catch (error: any) {
        console.error("Serverless Function Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
