const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Global variables
let GEMINI_API_KEY = '';
let knowledgeBase = '';
const conversationHistory = new Map(); // Store conversation history per session

// Load API key and knowledge base on startup
function loadAPIKey() {
  try {
    GEMINI_API_KEY = 'gemini_key';
    console.log('✅ Gemini API key loaded successfully');
  } catch (error) {
    console.error('❌ Error loading Gemini API key:', error.message);
    console.error('Please make sure gemini.key file exists and contains your API key');
  }
}

function loadKnowledgeBase() {
  try {
    knowledgeBase = fs.readFileSync('knowledge_base.txt', 'utf8');
    console.log('✅ Knowledge base loaded successfully');
    console.log(`📚 Knowledge base size: ${knowledgeBase.length} characters`);
  } catch (error) {
    console.error('❌ Error loading knowledge base:', error.message);
    knowledgeBase = 'No knowledge base available.';
  }
}

// Initialize on startup
loadAPIKey();
loadKnowledgeBase();

// Utility function to generate session ID
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Function to prepare conversation context
function prepareContext(sessionId, userMessage) {
  const history = conversationHistory.get(sessionId) || [];
  
  const systemPrompt = `You are a helpful AI assistant with access to a knowledge base about mobile app functionality. 

KNOWLEDGE BASE:
${knowledgeBase}

INSTRUCTIONS:
- Use the knowledge base to answer questions about the mobile app features and functionality
- Keep responses concise and helpful (2-3 sentences max unless user asks for details)
- If the user asks for more details, then provide comprehensive information
- If a question is not covered in the knowledge base, politely say you don't have that specific information
- Maintain conversation context and be friendly
- Focus on practical, actionable information

Previous conversation history:
${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Current user message: ${userMessage}

Respond helpfully and concisely:`;

  return systemPrompt;
}

// Function to call Gemini API for text generation
async function callGeminiAPI(prompt) {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

// Function to call Gemini TTS API
async function callGeminiTTS(text) {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: text
              }
            ]
          }
        ],
        generationConfig: {
          response_modalities: ["AUDIO"],
          speech_config: {
            voice_config: {
              prebuilt_voice_config: {
                voice_name: "Kore" // Firm, professional voice
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini TTS API error: ${response.status} ${response.statusText}`);
    }

        const data = await response.json();
    console.log('TTS API Response structure:', {
      hasCandidates: !!data.candidates,
      candidatesLength: data.candidates?.length,
      hasContent: !!(data.candidates?.[0]?.content),
      hasParts: !!(data.candidates?.[0]?.content?.parts),
      partsLength: data.candidates?.[0]?.content?.parts?.length,
      hasInlineData: !!(data.candidates?.[0]?.content?.parts?.[0]?.inlineData),
      hasData: !!(data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data),
      error: data.error
    });
    
    // Check for error first
    if (data.error) {
      throw new Error(`Gemini TTS API error: ${data.error.message || 'Unknown error'}`);
    }
    
    // Check for the correct response format (using camelCase 'inlineData')
    if (data.candidates && data.candidates[0] && data.candidates[0].content && 
        data.candidates[0].content.parts && data.candidates[0].content.parts[0] && 
        data.candidates[0].content.parts[0].inlineData && 
        data.candidates[0].content.parts[0].inlineData.data) {
      console.log('TTS data found, length:', data.candidates[0].content.parts[0].inlineData.data.length);
      return data.candidates[0].content.parts[0].inlineData.data;
    }
    
    // Log the full response for debugging if format is unexpected
    console.error('Unexpected TTS API response format. Full response:', JSON.stringify(data, null, 2));
    throw new Error('Invalid response format from Gemini TTS API');
    } catch (error) {
    console.error('Error calling Gemini TTS API:', error);
    throw error;
  }
}

// Routes

// Serve the main chat interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat-prototype-v1-minimal.html'));
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId = generateSessionId() } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    // Get or create conversation history
    if (!conversationHistory.has(sessionId)) {
      conversationHistory.set(sessionId, []);
    }

    const history = conversationHistory.get(sessionId);
    
    // Add user message to history
    history.push({ role: 'user', content: message });

    // Prepare context with knowledge base and history
    const contextPrompt = prepareContext(sessionId, message);

    // Get AI response
    const aiResponse = await callGeminiAPI(contextPrompt);

    // Add AI response to history
    history.push({ role: 'assistant', content: aiResponse });

    // Keep history manageable (last 10 exchanges)
    if (history.length > 20) {
      history.splice(0, history.length - 20);
    }

    // Update conversation history
    conversationHistory.set(sessionId, history);

    res.json({
      response: aiResponse,
      sessionId: sessionId
    });

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
});

// Text-to-Speech endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    // Get audio data from Gemini TTS
    const audioData = await callGeminiTTS(text);

    // Send the base64 audio data directly as text
    res.set({
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache'
    });

    res.send(audioData);

  } catch (error) {
    console.error('Error in TTS endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to generate speech',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    hasApiKey: !!GEMINI_API_KEY,
    hasKnowledgeBase: !!knowledgeBase,
    knowledgeBaseSize: knowledgeBase.length
  });
});

// Get conversation history endpoint
app.get('/api/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const history = conversationHistory.get(sessionId) || [];
  res.json({ history });
});

// Clear conversation history endpoint
app.delete('/api/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  conversationHistory.delete(sessionId);
  res.json({ message: 'History cleared successfully' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Voice Chat Assistant server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   POST /api/chat - Send chat messages`);
  console.log(`   POST /api/tts - Generate speech from text`);
  console.log(`   GET /api/health - Health check`);
  console.log(`   GET /api/history/:sessionId - Get conversation history`);
  console.log(`   DELETE /api/history/:sessionId - Clear conversation history`);
  
  if (!GEMINI_API_KEY) {
    console.log(`⚠️  Warning: No Gemini API key found. Please create a 'gemini.key' file with your API key.`);
  }
}); 