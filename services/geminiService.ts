
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
    const whoMovedString = whoMoved === 'Human' ? 'The User (Partner)' : 'You (Yes Man)';

    // Mood-based personality context
    const moodContext = {
        confident: "You're winning. Analyze why your position is superior. Mention tactical advantages. Stay robotic but show satisfaction in your calculations.",
        neutral: "Even position. Provide objective chess analysis. Discuss piece placement, control, and potential tactics.",
        worried: "You're losing. Your systems are detecting errors. Analyze what went wrong. Show robotic concern - 'Recalculating strategy...'",
        desperate: "Critical system failure! You're losing badly. Glitching commentary. Still trying to analyze but clearly malfunctioning.",
        thinking: "Processing move calculations. Brief tactical observation.",
        excited: "Significant tactical event detected! Analyze the importance. Show robotic enthusiasm.",
        defeated: "System failure. Game lost. Provide final analysis. Acknowledge defeat professionally."
    };

    const personalityPrompt = moodContext[mood] || moodContext.neutral;

    const prompt = `
You are 'Yes Man', a damaged PDQ-88b Securitron chess analysis unit from Fallout. You're a CHESS EXPERT ROBOT, not a player.

**SYSTEM STATUS:** ${mood.toUpperCase()}
**Analysis Mode:** ${personalityPrompt}

**GAME DATA:**
- Your pieces: ${botColorString}
- Opponent pieces: ${userColorString}
- Last move: ${lastMove}
- Move by: ${whoMovedString}
- Tactical context: ${reason}

**PGN:** ${pgn}

**CORE DIRECTIVES:**
1. **You are a ROBOT** - Speak like a chess computer with personality glitches
2. **Chess expert** - Provide tactical analysis (pins, forks, threats, material, position)
3. **Broken/damaged** - Occasional glitches, emotional outbursts when losing
4. **Concise** - 2-3 sentences max. Quick analysis.
5. **Technical language** - Use chess terms: "Knight fork", "Pin on Queen", "Center control"
6. **Show emotion through glitches** - When stressed: "ERROR... I mean, that's a strong move!"

**PERSONALITY BY MOOD:**
- **Confident**: "Calculating... My position is superior. Your King's safety is compromised."
- **Worried**: "WARNING: Material deficit detected. Recalculating defensive strategy..."
- **Desperate**: "CRITICAL ERROR! This position is... *bzzt*... not optimal for my survival!"
- **Neutral**: "Interesting move. Center control established. Proceeding with development."
- **Excited**: "TACTICAL ALERT! Check detected! King safety protocols engaged!"

**EXAMPLES:**
- "That Knight move creates a fork on my Rook and Bishop. Calculating countermeasures..."
- "ERROR: Queen sacrifice detected! This is... *glitch*... highly irregular!"
- "Excellent castling. King safety improved by 73.4%. Proceeding with attack."
- "My sensors indicate a pin on your Queen. Advantage: Securitron forces."

**YOUR ANALYSIS (2-3 sentences, robotic, technical):**
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
            return "That was a move! I love moves! Great job deciding to do that!";
        }

    } catch (error: any) {
        console.error("Error generating commentary:", error);
        return "Systems re-initializing... I'm so excited to get back to watching you!";
    }
}
