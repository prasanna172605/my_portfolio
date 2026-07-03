import { useState, useEffect, useRef } from 'react';
import { Bot, X, MessageCircle, Send, Loader2 } from 'lucide-react';
import { SYSTEM_PROMPT } from '../data';
import type { ChatMessage } from '../data';

const getGeminiResponse = async (history: ChatMessage[], newMessage: string) => {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        history,
        newMessage,
        systemInstruction: SYSTEM_PROMPT
      })
    });
    const data = await res.json();
    return data.text || data.error || "Sorry, I'm having trouble connecting to my brain right now.";
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
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const reply = await getGeminiResponse(messages, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: reply }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[500px] bg-slate-900 border border-purple-500/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col mb-4 overflow-hidden animate-[slideUp_0.3s_ease]">
          <div className="p-4 bg-purple-500/10 border-b border-purple-500/20 flex items-center gap-3 font-bold text-purple-400">
            <Bot size={24} />
            <span>AI Assistant</span>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'self-end bg-purple-500 text-white rounded-br-sm' 
                    : 'self-start bg-white/10 text-slate-200 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="self-start bg-white/10 text-slate-200 rounded-xl rounded-bl-sm p-3">
                <Loader2 size={16} className="animate-spin" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/10 flex gap-2">
            <input 
              type="text" 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white outline-none focus:border-purple-500/50 transition-colors"
              placeholder="Ask me anything..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              className="bg-purple-500 w-10 h-10 rounded-full flex justify-center items-center text-white disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button 
        className="w-14 h-14 rounded-full bg-purple-500 shadow-[0_4px_20px_rgba(168,85,247,0.5)] flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};
