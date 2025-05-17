import React, { useState } from "react";
import { sendMessageToChatbot } from "services/chatbotService";
import { FaRobot, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "¡Hola! ¿Cómo puedo ayudarte?", type: "bot" }]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const currentPath = window.location.pathname; // Obtener ruta actual
    const response = await sendMessageToChatbot(input, currentPath);

    setMessages([...messages, { text: input, type: "user" }, { text: response, type: "bot" }]);
    setInput("");
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRobot className="h-6 w-6" />
      </button>

      {/* Chatbot modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-md rounded-lg p-4 dark:bg-gray-800">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-bold text-gray-700 dark:text-white">Chatbot</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="h-48 overflow-y-auto mt-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 rounded-md my-1 ${msg.type === "bot" ? "bg-gray-200 dark:bg-gray-700" : "bg-blue-500 text-white"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Campo de entrada */}
          <div className="mt-2 flex items-center">
            <input
              type="text"
              className="flex-grow border p-2 rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;