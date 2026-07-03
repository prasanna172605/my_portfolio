import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    try {
      const { history, newMessage, systemInstruction } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          ...history.map((msg: { role: string, text: string }) => ({
            role: msg.role,
            parts: [{ text: msg.text }]
          })),
          { role: 'user', parts: [{ text: newMessage }] }
        ],
        config: {
          systemInstruction,
        }
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Sorry, I'm having trouble connecting to my brain right now. Please try again later!" });
    }
  });

  app.post("/api/creative-spark", async (req, res) => {
    try {
      const prompt = "Generate a short, evocative, and creative art prompt for a pencil sketch or digital painting. It should be abstract or surreal. Just the prompt, no extra text. Example: 'A clock melting over a tree branch in a desert.'";
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Spark generation error:", error);
      res.json({ text: "A lonely astronaut sitting on a park bench on the moon." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
