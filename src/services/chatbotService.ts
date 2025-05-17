import { chatbotBasePrompt } from "../chatbotPrompt";

const API_URL = "https://api.gemini.com/v1/chat";
const API_KEY = "AIzaSyCIZ1Mc2R_lJZVuIoC3TiyW5CAIpg2wVvg"; 

export const sendMessageToChatbot = async (message: string, currentPath: string): Promise<string> => {
  try {
    const initialContext = `El usuario está en: ${currentPath}. Indícale qué puede hacer en esta página.`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ prompt: `${chatbotBasePrompt}\n${initialContext}\nUsuario: ${message}` }),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const data = await response.json();
    return data?.reply || "Lo siento, no tengo una respuesta en este momento.";
  } catch (error) {
    console.error("Error en el chatbot:", error);
    return "Hubo un problema al conectar con el chatbot.";
  }
};