import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
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
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
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
