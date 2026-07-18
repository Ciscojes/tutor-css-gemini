import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "50kb" }));
app.use(express.static("public"));

app.post("/api/preguntar", async (req, res) => {
  try {
    const pregunta = req.body?.pregunta?.trim();

    if (!pregunta) {
      return res.status(400).json({
        error: "Debes escribir una pregunta sobre CSS.",
      });
    }

    if (pregunta.length > 3000) {
      return res.status(400).json({
        error: "La pregunta es demasiado larga. Usa menos de 3000 caracteres.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Falta configurar GEMINI_API_KEY en el archivo .env.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
Eres un tutor de CSS para un estudiante principiante de desarrollo web.

Reglas:
- Responde siempre en español.
- Explica paso a paso y con lenguaje sencillo.
- Incluye un ejemplo de código cuando sea útil.
- Señala errores de sintaxis si el usuario comparte código.
- No resuelvas ejercicios completos si el usuario pide practicar; primero da pistas.
- Organiza la respuesta con títulos breves.
- Limita la respuesta a aproximadamente 500 palabras.

Pregunta del estudiante:
${pregunta}
`;

    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash",
      input: prompt,
    });

    const respuesta = interaction.output_text?.trim();

    if (!respuesta) {
      return res.status(502).json({
        error: "Gemini no devolvió una respuesta de texto.",
      });
    }

    return res.json({
      respuesta,
    });
  } catch (error) {
    console.error("Error completo de Gemini:");
    console.error(error);

    return res.status(500).json({
      error: error?.message || "No se pudo consultar Gemini.",
    });
  }
});

app.listen(port, () => {
  console.log(`Tutor CSS disponible en http://localhost:${port}`);
});
