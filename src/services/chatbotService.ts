import { GoogleGenAI } from "@google/genai";
import { chatbotBasePrompt } from "../chatbotPrompt";
import routes from "routes";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCIZ1Mc2R_lJZVuIoC3TiyW5CAIpg2wVvg"});

export const sendMessageToChatbot = async (message: string, currentPath: string): Promise<string> => {
  try {
    const formattedRoutes = routes.map(route => `- ${route.name}: ${route.layout}/${route.path}`).join("\n");


    const fullPrompt = `
      ${chatbotBasePrompt}

      📍 **Rutas disponibles en la plataforma:**
      ${formattedRoutes}

      El usuario está en: ${currentPath}. Indícale qué puede hacer en esta página.
      Usuario: ${message}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: fullPrompt,
    });

    return response.text || "Lo siento, no tengo una respuesta en este momento.";
  } catch (error) {
    console.error("Error en el chatbot:", error);
    return "Hubo un problema al conectar con el chatbot.";
  }
};