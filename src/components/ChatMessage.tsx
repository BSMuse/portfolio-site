import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  role: 'user' | 'bot';
  message: string;
  loading?: boolean;
  source?: 'cache' | 'rule-based' | 'gemini' | 'fallback';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, message, loading, source }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          role === 'user'
            ? 'bg-primary text-white rounded-br-none'
            : 'bg-background text-foreground rounded-bl-none'
        }`}
      >
        {loading ? (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        ) : (
          <div>
            <div className="text-sm prose prose-sm max-w-none">
              <ReactMarkdown>
                {message}
              </ReactMarkdown>
            </div>
            {source && role === 'bot' && (
              <div className="text-xs text-foreground/50 mt-1">
                Powered by {source === 'gemini' ? 'AI' : source === 'cache' ? 'cached response' : 'rule-based system'}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage; 