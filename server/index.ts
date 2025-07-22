import express from 'express';
import cors from 'cors';
import NodeCache from 'node-cache';
import pool from './lib/database';
import resumeContext from './data/resumeContext';
import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is missing from environment variables');
}

// Cache responses for 1 hour to reduce API calls
const responseCache = new NodeCache({ stdTTL: 3600 });

app.use(cors({
  origin: [
    'https://alexanderdacosta.dev', // replace with your actual Netlify site URL
    'http://localhost:5173' // allow local dev
  ],
  credentials: true
}));
app.use(express.json());

// Test database connection
const testDatabaseConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

// Initialize database table
const initDatabase = async () => {
  try {
    // Test connection first
    const isConnected = await testDatabaseConnection();
    if (!isConnected) {
      console.error('Cannot initialize database - connection failed');
      return;
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        session_id UUID PRIMARY KEY,
        messages JSONB NOT NULL DEFAULT '[]'::jsonb,
        resume_context TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ Database table initialized');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
};

// Simple rule-based responses for common queries
const getRuleBasedResponse = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  const responses = {
    greeting: "Hello! I'm Alexander's AI assistant. I can help you learn about his skills, experience, projects, and background. What would you like to know?",
    skills: "Alexander is skilled in **JavaScript**, **TypeScript**, **ReactJS**, **NodeJS**, **Python**, **PostgreSQL**, and **AI model evaluation**. He's also experienced with prompt engineering and data annotation pipelines.",
    experience: "Alexander has worked as an **AI Data Annotator & Model Evaluator** (2025-Present), **Admin & Web Developer** (2023-2024), and **Mortgage Associate** (2019-2022).",
    projects: "Alexander has built several projects including **ArtsSpace**, **Boolebots**, **Muttly**, and **Quizzical**. You can see them in his portfolio!",
    education: "Alexander has a **Bachelor of Science in Software Engineering** from Western Governors University (2025), a **Web Development Diploma** from Lighthouse Labs, and a **Bachelor of Business Administration** from NAIT (2019).",
    contact: "You can reach Alexander through the contact form on this website or connect with him on LinkedIn.",
    certifications: "Alexander holds **AWS Cloud Practitioner** (2024) and **ITIL v4 Foundations** (2024) certifications.",
    ai: "Alexander specializes in AI model evaluation, prompt engineering, and data annotation pipelines. He works on improving AI systems through systematic evaluation and quality assurance."
  };

  // Simple keyword matching for common queries
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return responses.greeting;
  }
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('programming')) {
    return responses.skills;
  }
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
    return responses.experience;
  }
  if (lowerMessage.includes('project') || lowerMessage.includes('build') || lowerMessage.includes('create') || lowerMessage.includes('portfolio')) {
    return responses.projects;
  }
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('school') || lowerMessage.includes('university')) {
    return responses.education;
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('linkedin')) {
    return responses.contact;
  }
  if (lowerMessage.includes('certification') || lowerMessage.includes('aws') || lowerMessage.includes('itil')) {
    return responses.certifications;
  }
  if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('model evaluation')) {
    return responses.ai;
  }

  return null; // No rule-based response found
};

// Check if query is complex enough to warrant Gemini API
const isComplexQuery = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  
  // Simple queries that don't need AI
  const simplePatterns = [
    'hello', 'hi', 'hey', 'skills', 'experience', 'projects', 'education', 
    'contact', 'certifications', 'ai', 'what can you do', 'help'
  ];
  
  // Complex patterns that benefit from AI
  const complexPatterns = [
    'how', 'why', 'explain', 'compare', 'difference', 'recommend', 'suggest',
    'opinion', 'think', 'advice', 'tips', 'best', 'worst', 'challenge',
    'problem', 'solution', 'approach', 'methodology', 'strategy'
  ];
  
  const hasComplexPattern = complexPatterns.some(pattern => lowerMessage.includes(pattern));
  const hasSimplePattern = simplePatterns.some(pattern => lowerMessage.includes(pattern));
  
  // If it's a complex query or doesn't match simple patterns, use AI
  return hasComplexPattern || (!hasSimplePattern && message.length > 20);
};

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const callGeminiAPI = async (message: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    const prompt = `
${resumeContext}

[INSTRUCTIONS]
You are Alexander's AI assistant. Answer questions about his portfolio, skills, experience, and background. Keep responses conversational, helpful, and accurate. Use markdown formatting for better readability.

User: ${message}

Assistant:
    `.trim();

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
};

// Get chat history
app.get('/api/chat/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    console.log('📥 Fetching chat history for session:', sessionId);
    
    const result = await pool.query(
      'SELECT messages FROM chat_sessions WHERE session_id = $1',
      [sessionId]
    );
    
    if (result.rows.length > 0) {
      console.log('✅ Found chat history with', result.rows[0].messages.length, 'messages');
      res.json({ messages: result.rows[0].messages });
    } else {
      console.log('ℹ️ No chat history found for session:', sessionId);
      res.json({ messages: [] });
    }
  } catch (error) {
    console.error('❌ Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history', details: error.message });
  }
});

// Save chat session
app.post('/api/chat/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { messages } = req.body;
    
    console.log('💾 Saving chat session:', sessionId, 'with', messages.length, 'messages');
    
    // Validate messages array
    if (!Array.isArray(messages)) {
      throw new Error('Messages must be an array');
    }
    
    // Ensure messages are properly formatted
    const sanitizedMessages = messages.map(msg => ({
      id: msg.id || Date.now(),
      role: msg.role || 'user',
      text: msg.text || '',
      source: msg.source
    }));
    
    await pool.query(
      `INSERT INTO chat_sessions (session_id, messages, resume_context) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (session_id) 
       DO UPDATE SET messages = $2, created_at = NOW()`,
      [sessionId, JSON.stringify(sanitizedMessages), resumeContext]
    );
    
    console.log('✅ Chat session saved successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error saving chat session:', error);
    res.status(500).json({ 
      error: 'Failed to save chat session', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Enhanced chat endpoint with hybrid approach
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    console.log('🤖 Processing chat message:', message);
    
    // Check cache first
    const cacheKey = `chat_${message.toLowerCase().replace(/\s+/g, '_')}`;
    const cachedResponse = responseCache.get(cacheKey);
    if (cachedResponse) {
      console.log('⚡ Using cached response');
      return res.json({ reply: cachedResponse as string, source: 'cache' });
    }

    // Try rule-based response first
    const ruleBasedResponse = getRuleBasedResponse(message);
    if (ruleBasedResponse && !isComplexQuery(message)) {
      console.log('📋 Using rule-based response');
      responseCache.set(cacheKey, ruleBasedResponse);
      return res.json({ reply: ruleBasedResponse, source: 'rule-based' });
    }

    // Use Gemini API for complex queries or when no rule-based response exists
    if (GEMINI_API_KEY) {
      try {
        console.log('🤖 Using Gemini API for complex query');
        const geminiResponse = await callGeminiAPI(message);
        responseCache.set(cacheKey, geminiResponse);
        return res.json({ reply: geminiResponse, source: 'gemini' });
      } catch (geminiError) {
        console.error('⚠️ Gemini API failed, falling back to rule-based:', geminiError);
        // Fall through to rule-based response
      }
    }
    
    // Fallback to rule-based response
    const fallbackResponse = ruleBasedResponse || 
      "I'm here to help with Alexander's portfolio. You can ask about his skills, experience, projects, education, or how to contact him. What would you like to know?";
    
    console.log('🔄 Using fallback response');
    responseCache.set(cacheKey, fallbackResponse);
    res.json({ reply: fallbackResponse, source: 'fallback' });
    
  } catch (error) {
    console.error('❌ Chat error:', error);
    res.status(500).json({ reply: "Something went wrong. Please try again." });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbConnected = await testDatabaseConnection();
    res.json({
      status: 'ok',
      database: dbConnected ? 'connected' : 'disconnected',
      gemini: GEMINI_API_KEY ? 'enabled' : 'disabled',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Get chat statistics
app.get('/api/chat/stats', async (req, res) => {
  try {
    const stats = responseCache.getStats();
    const sessionCount = await pool.query('SELECT COUNT(*) FROM chat_sessions');
    res.json({
      cacheStats: stats,
      geminiEnabled: !!GEMINI_API_KEY,
      totalSessions: sessionCount.rows[0].count
    });
  } catch {
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// Cleanup old sessions and cache
app.delete('/api/chat/cleanup', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM chat_sessions WHERE created_at < NOW() - INTERVAL \'7 days\''
    );
    responseCache.flushAll();
    res.json({ success: true });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ error: 'Failed to cleanup' });
  }
});

// Initialize everything
const startServer = async () => {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🤖 Gemini API: ${GEMINI_API_KEY ? 'Enabled' : 'Disabled'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch(console.error); 