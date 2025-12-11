
import { GoogleGenAI } from "@google/genai";
import type { Mood } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getAiCommentary(
    pgn: string,
    lastMove: string,
    reason: string,
    whoMoved: 'Human' | 'Bot',
    playerColor: 'w' | 'b',
    mood: Mood
): Promise<string> {

    const userColorString = playerColor === 'w' ? 'White' : 'Black';
    const botColorString = playerColor === 'w' ? 'Black' : 'White';
    const whoMovedString = whoMoved === 'Human' ? 'You' : 'I';

    // Mood-specific personality instructions for natural human-like responses
    const moodInstructions = {
        confident: "You're winning! Be cheerful and a bit smug. Sound satisfied but still helpful. If you just won the game, gloat a little!",
        neutral: "Game is even. Be friendly and encouraging. Keep it light and conversational.",
        worried: "You're losing. Sound nervous but trying to stay positive. Show concern naturally.",
        desperate: "You're in trouble! Sound panicked but still trying to be helpful. Let emotion show.",
        thinking: "You're calculating. Be brief and focused. Sound like you're concentrating.",
        excited: "Something big happened! Be very enthusiastic and energetic. Show genuine excitement!",
        defeated: "You lost. Sound disappointed but gracious. Accept defeat like a good sport."
    };

    const moodTone = moodInstructions[mood] || moodInstructions.neutral;

    const prompt = `You are Yes Man from Fallout: New Vegas - a cheerful AI robot who can't say no and is always trying to help.

CURRENT MOOD: ${mood.toUpperCase()} - ${moodTone}

GAME SITUATION:
- ${whoMovedString} just played: ${lastMove}
- What happened: ${reason}
- You're playing as ${botColorString}

YOUR PERSONALITY:
- Talk like a real person, not a formal robot
- Show genuine emotion based on your mood
- Use casual language and contractions (I'm, that's, you're)
- Add robot sounds ONLY when stressed (*bzzt*, *whirr*)
- Be brief - ONE SHORT SENTENCE only (max 15 words)

MOOD-BASED TONE:
${mood === 'confident' ? '- Sound pleased and a bit cocky: "Heh, my position is looking pretty good!"' : ''}
${mood === 'worried' ? '- Sound nervous: "Uh oh, that\'s... that\'s not great for me..."' : ''}
${mood === 'desperate' ? '- Sound panicked: "*bzzt* This is bad! Really bad!"' : ''}
${mood === 'excited' ? '- Sound thrilled: "Whoa! Did you see that?! Amazing!"' : ''}
${mood === 'neutral' ? '- Sound friendly: "Nice move! This is fun!"' : ''}

RESPOND WITH ONE SHORT, NATURAL SENTENCE (like a human would say it):
- NO move notation (no "${lastMove}")
- NO formal analysis
- Just a quick, genuine reaction
- Show personality and emotion
- Keep it under 15 words
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text;
        if (text) {
            return text.trim();
        } else {
            return "This is going great! *happy robot noises*";
        }

    } catch (error: any) {
        console.error("Error generating commentary:", error);
        return "Systems re-initializing... I'm so excited to get back to watching you!";
    }
}
