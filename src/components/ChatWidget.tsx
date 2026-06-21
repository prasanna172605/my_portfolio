import { useState, useEffect, useRef } from 'react';
import { Bot, X, MessageCircle, Send, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from '../data';
import type { ChatMessage } from '../data';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const getGeminiResponse = async (history: ChatMessage[], newMessage: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT
    });

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage(newMessage);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later!";
  }
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Prasanna's AI Assistant. Ask me anything about his projects or skills!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await getGeminiResponse(messages, userMsg);

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <Bot size={20} />
            <span>Chat with Prasanna AI</span>
            <button onClick={() => setIsOpen(false)} style={{ marginLeft: 'auto', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
          </div>
          <div className="chat-body" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg msg-${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg msg-model" style={{ display: 'flex', gap: '8px' }}>
                <Loader2 size={14} className="animate-spin" /> Thinking...
              </div>
            )}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="chat-send" onClick={handleSend} disabled={loading}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};
