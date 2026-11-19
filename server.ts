/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);

  // API Routes
  app.post("/api/analyze-room", async (req, res) => {
    try {
      const { image, mimeType } = req.body;
      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType || "image/jpeg",
                data: image,
              },
            },
            {
              text: "Analyze this room photo. Return a JSON object with keys: roomType (best guess among Living Room, Bedroom, Master Bedroom, Kitchen, Dining Room, Bathroom, Guest Room, Kids Room, Study Room, Home Office, Balcony, Hallway, Pooja Room), lightingQuality (e.g. Bright Natural, Dim, Warm), architecturalStyle (e.g. Empty, Traditional, Contemporary), recommendedStyles (array of 3 matching styles), colorPalette (array of 3 suggested hex colors or color names), and designTips (array of 3 short improvement tips).",
            },
          ],
        },
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const analysis = JSON.parse(text);
      res.json(analysis);
    } catch (error: any) {
      console.error("Analyze room error:", error);
      res.status(500).json({ error: error.message || "Failed to analyze room" });
    }
  });

  app.post("/api/generate-design", async (req, res) => {
    try {
      const { image, mimeType, roomType, style, customPrompt, preferences } = req.body;
      
      const promptText = `Generate a photorealistic, high-end architectural interior design photograph of a ${roomType} in ${style} style. 
      Preferences: 
      - Wall Colors: ${preferences?.wallColors || 'Harmonious neutral & accent'}
      - Flooring: ${preferences?.flooring || 'Premium finish'}
      - Lighting: ${preferences?.lighting || 'Warm layered ambient lighting'}
      - Furniture: ${preferences?.furnitureStyle || 'Luxury custom furniture'}
      - Materials: ${preferences?.materials || 'High-grade wood & marble'}
      - Mood: ${preferences?.mood || 'Luxurious & cozy'}
      Custom instructions: ${customPrompt || 'Create a stunning professional interior design.'}
      Maintain realistic room layout proportions, clear perspective, and impeccable photorealism.`;

      const parts: any[] = [];
      if (image) {
        parts.push({
          inlineData: {
            mimeType: mimeType || "image/jpeg",
            data: image,
          },
        });
      }
      parts.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-image",
        contents: { parts },
      });

      let generatedImageUrl = "";
      let responseText = "";

      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || "image/png";
          generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          responseText += part.text;
        }
      }

      if (!generatedImageUrl) {
        throw new Error("AI image generation did not return an image. Please try again or refine prompt.");
      }

      let designNotes = `Transformed into a stunning ${style} ${roomType} with premium finishes and lighting.`;
      try {
        const noteRes = await ai.models.generateContent({
          model: "gemini-4-hydrogen",
          contents: `Write a 2-sentence sophisticated design summary for this ${style} ${roomType} and 2 key material highlights.`,
        });
        if (noteRes.text) designNotes = noteRes.text;
      } catch (e) {
        // ignore note failure
      }

      res.json({
        success: true,
        imageUrl: generatedImageUrl,
        description: designNotes,
        responseText,
      });
    } catch (error: any) {
      console.error("Generate design error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI design" });
    }
  });

  app.post("/api/edit-design", async (req, res) => {
    try {
      const { currentImage, editPrompt } = req.body;
      if (!currentImage || !editPrompt) {
        return res.status(400).json({ error: "Missing current image or edit prompt" });
      }

      const matches = currentImage.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: "Invalid image format" });
      }
      const mimeType = matches[1];
      const data = matches[2];

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-image",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data,
              },
            },
            {
              text: `Modify this interior design image according to this instruction: ${editPrompt}. Maintain photorealism, perspective, and architectural integrity.`,
            },
          ],
        },
      });

      let generatedImageUrl = "";
      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || "image/png";
          generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
        }
      }

      if (!generatedImageUrl) {
        throw new Error("AI image editing failed to return a modified image.");
      }

      res.json({ success: true, imageUrl: generatedImageUrl });
    } catch (error: any) {
      console.error("Edit design error:", error);
      res.status(500).json({ error: error.message || "Failed to edit AI design" });
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
