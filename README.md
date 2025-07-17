# Voice Chat Assistant with Gemini AI

A modern voice-enabled chat interface powered by Google's Gemini AI with integrated text-to-speech capabilities and knowledge base support.

## ✨ Features

- **🎤 Voice Input**: Real-time speech recognition using Web Speech API
- **🔊 Voice Output**: Natural text-to-speech using Gemini TTS API
- **🧠 AI Conversation**: Powered by Gemini 2.0 Flash for intelligent responses
- **📚 Knowledge Base**: Context-aware responses using custom knowledge base
- **💾 Session Management**: Persistent conversation history
- **📱 Responsive Design**: Beautiful minimal UI that works on all devices
- **🔒 Secure**: API keys handled server-side for security

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Google Gemini API key
- Modern web browser with speech recognition support

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your Gemini API key**
   ```bash
   # Copy the example file
   cp gemini.key.example gemini.key
   
   # Edit gemini.key and add your actual API key
   echo "YOUR_ACTUAL_GEMINI_API_KEY" > gemini.key
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Paste it into your `gemini.key` file

## 📖 Knowledge Base

The system uses `knowledge_base.txt` to provide context-aware responses. The current knowledge base contains information about a mobile app with features like:

- User authentication and login flows
- Dashboard and navigation
- Shipment management
- Case management
- Account settings
- Pickup services
- Error handling

You can modify `knowledge_base.txt` to customize the AI's knowledge for your specific use case.

## 🎯 Usage

### Text Chat
1. Type your message in the input field
2. Press Enter or click the Send button
3. The AI will respond with context from the knowledge base
4. Response will be automatically spoken using TTS

### Voice Chat
1. Click the microphone button to start voice input
2. Speak your question clearly
3. The system will transcribe your speech to text
4. AI responds both with text and voice

### Session Management
- Conversations are automatically saved per session
- Each browser session maintains its own conversation history
- History is kept for the duration of the server session

## 🛠️ API Endpoints

- `GET /` - Serve the chat interface
- `POST /api/chat` - Send chat messages
- `POST /api/tts` - Generate speech from text
- `GET /api/health` - Check server health
- `GET /api/history/:sessionId` - Get conversation history
- `DELETE /api/history/:sessionId` - Clear conversation history

## 🏗️ Architecture

```
Frontend (HTML/CSS/JS)
├── Voice Recognition (Web Speech API)
├── Audio Playback (HTML5 Audio)
└── Session Management

Backend (Node.js/Express)
├── Gemini Text Generation API
├── Gemini TTS API
├── Knowledge Base Integration
└── Conversation History Management
```

## 🎨 Customization

### Changing the Voice
Edit `server.js` and modify the TTS configuration:
```javascript
voice_config: {
  prebuilt_voice_config: {
    voice_name: "Puck" // Choose from 30 available voices
  }
}
```

Available voices include: Kore, Puck, Zephyr, Charon, Fenrir, Aoede, and 24 others.

### Updating Knowledge Base
Simply edit `knowledge_base.txt` with your content. The server will automatically load the new knowledge base on restart.

### Styling
Modify the CSS in `chat-prototype-v1-minimal.html` to customize the appearance. The design uses CSS custom properties for easy theming.

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

### Model Settings
You can adjust the AI behavior by modifying the generation config in `server.js`:
```javascript
generationConfig: {
  temperature: 0.7,    // Creativity (0.0-1.0)
  topK: 40,           // Diversity control
  topP: 0.95,         // Nucleus sampling
  maxOutputTokens: 1024 // Response length
}
```

## 🐛 Troubleshooting

### Common Issues

**"Gemini API key not configured"**
- Check that `gemini.key` file exists and contains your API key
- Ensure there are no extra spaces or newlines in the key file

**Voice recognition not working**
- Use Chrome or Edge browser (best support)
- Ensure microphone permissions are granted
- Check that you're using HTTPS in production

**TTS not playing**
- Check browser audio permissions
- Ensure speakers/headphones are connected
- Try refreshing the page

**Knowledge base not loading**
- Verify `knowledge_base.txt` exists in the project root
- Check server logs for file reading errors
- Ensure proper file encoding (UTF-8)

### Browser Compatibility

- **Voice Recognition**: Chrome, Edge (best support), Firefox (limited)
- **Audio Playback**: All modern browsers
- **UI**: All modern browsers with CSS Grid support

## 📝 Development

### Adding New Features

1. **New API Endpoints**: Add routes in `server.js`
2. **Frontend Features**: Modify the JavaScript in the HTML file
3. **Styling**: Update CSS custom properties for consistent theming

### Code Structure

- `server.js` - Main backend server
- `chat-prototype-v1-minimal.html` - Frontend interface
- `knowledge_base.txt` - AI knowledge context
- `package.json` - Dependencies and scripts

## 📄 License

MIT License - feel free to use and modify for your projects.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues related to:
- **Gemini API**: Check [Google AI documentation](https://ai.google.dev/docs)
- **Speech Recognition**: Verify browser compatibility
- **Setup Issues**: Ensure all prerequisites are met

---

Built with ❤️ using Google Gemini AI, Node.js, and modern web technologies. 