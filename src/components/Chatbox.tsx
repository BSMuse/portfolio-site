import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, MessageSquare } from 'lucide-react';
import ChatMessage from './ChatMessage';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
  source?: 'cache' | 'rule-based' | 'gemini' | 'fallback';
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Chatbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'bot', text: "Beep boop! I'm here to help. What would you like to know about this cool dude?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle speech bubble delay when closing chat
  useEffect(() => {
    if (isOpen) {
      setShowSpeechBubble(false);
    } else {
      const timer = setTimeout(() => {
        setShowSpeechBubble(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Initialize session
  useEffect(() => {
    const stored = localStorage.getItem('chat_session_id');
    if (stored) {
      setSessionId(stored);
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem('chat_session_id', newId);
      setSessionId(newId);
    }
  }, []);

  // Fetch chat history
  useEffect(() => {
    if (!sessionId) return;
    
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_URL}/api/chat/${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        }
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    fetchHistory();
  }, [sessionId]);

  const updateSessionMessages = async (updatedMessages: Message[]) => {
    if (!sessionId) return;
    
    try {
      const response = await fetch(`${API_URL}/api/chat/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(`Server error: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to save chat session:', error);
      // Don't throw the error - just log it so the chat continues working
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = { 
      id: Date.now(), 
      role: 'user', 
      text: inputValue 
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setLoading(true);
    
    await updateSessionMessages(updatedMessages);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputValue, 
          context: "Alexander's portfolio information" 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const { reply, source } = await response.json();
      const botMessage: Message = { 
        id: Date.now() + 1, 
        role: 'bot', 
        text: reply,
        source
      };
      
      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      await updateSessionMessages(newMessages);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = { 
        id: Date.now() + 1, 
        role: 'bot', 
        text: "⚠️ Sorry, I'm having trouble connecting right now. Please try again later or reach out via the contact form for a more detailed response." 
      };
      
      const errorMessages = [...updatedMessages, errorMessage];
      setMessages(errorMessages);
      await updateSessionMessages(errorMessages);
    }
    
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-secondary border border-foreground/10 rounded-xl shadow-2xl w-80 h-96 flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/avatar.png" 
                  alt="Avatar" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <span className="font-semibold">Chat with Alexander AI</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  message={message.text}
                  source={message.source}
                />
              ))}
              {loading && (
                <ChatMessage
                  role="bot"
                  message=""
                  loading={true}
                />
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-foreground/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="flex-1 px-3 py-2 bg-background border border-foreground/10 rounded-lg text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent/50 outline-none transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !inputValue.trim()}
                  className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button */}
      {!isOpen && showSpeechBubble && (
        <>
          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-32 right-0 bg-foreground text-background px-4 py-2 rounded-2xl shadow-lg relative"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 text-sm font-medium whitespace-nowrap"
            >
              Talk to me!
              <MessageSquare size={16} className="text-background/70" />
            </motion.div>
            {/* Speech bubble tail pointing downward */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-foreground transform rotate-45"></div>
          </motion.div>

          {/* Chat button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="absolute bottom-2 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <img 
              src="/images/avatar.png" 
              alt="Avatar" 
              className="w-20 h-20 rounded-full object-cover"
            />
          </motion.button>
        </>
      )}
    </div>
  );
};

export default Chatbox; 