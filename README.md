# Voice Chat Assistant - Gemini AI

A modern, single-page voice chat application powered by Google's Gemini AI with a beautiful glassmorphism UI design.

## 🌟 Features

- **🎤 Voice Input**: Speech-to-text using Web Speech API
- **🗣️ Text-to-Speech**: AI-generated voice responses using Gemini TTS
- **💬 Real-time Chat**: Instant messaging with AI responses
- **🎨 Glassmorphism UI**: Modern, beautiful interface with backdrop blur effects
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🔒 Privacy-First**: API keys stored locally in browser storage
- **⚙️ Customizable**: Configure system instructions and AI behavior
- **🌐 No Backend Required**: Runs entirely in the browser

## 🚀 Live Demo

Visit the live application: [https://istin.github.io/cursor_masterclass](https://istin.github.io/cursor_masterclass)

## 🛠️ Setup

### Quick Start

1. **Visit the application** at the GitHub Pages link above
2. **Enter your Gemini API key** (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))
3. **Optionally configure system instructions** to customize AI behavior
4. **Start chatting!** Use text or voice input

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/IstiN/cursor_masterclass.git
   cd cursor_masterclass
   ```

2. **Open `index.html`** in your browser or serve it with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. **Configure your API key** when prompted

## 🔑 Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it into the application setup form

## 🎛️ Configuration

### System Instructions

You can customize the AI's behavior by providing system instructions such as:

- **Role Definition**: "You are a helpful coding assistant specializing in JavaScript and web development"
- **Personality**: "Be friendly, encouraging, and provide detailed explanations"
- **Constraints**: "Keep responses concise and under 100 words unless asked for details"
- **Domain Expertise**: "Focus on providing accurate technical information about web technologies"

### Local Storage

The application stores the following data locally in your browser:
- `gemini_api_key`: Your Gemini API key (encrypted in storage)
- `system_requirements`: Custom system instructions

## 🏗️ Architecture

### Single Page Application (SPA)
- **Frontend**: Pure HTML, CSS, and JavaScript
- **No Backend**: Direct API calls to Gemini from the browser
- **Client-side Storage**: LocalStorage for configuration
- **Real-time Voice**: Web Speech API integration

### Key Components
- **VoiceChatApp Class**: Main application controller
- **Speech Recognition**: Web Speech API for voice input
- **Gemini Integration**: Direct API calls for text generation and TTS
- **UI Management**: Dynamic message rendering and state management

### API Integration
- **Text Generation**: `generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- **Text-to-Speech**: `generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent`

## 🚀 Deployment

The application automatically deploys to GitHub Pages using GitHub Actions:

### Automatic Deployment
- **Trigger**: Push to `main` branch
- **Build**: Simple static file deployment
- **URL**: `https://[username].github.io/cursor_masterclass`

### Manual Deployment
You can deploy to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Enable in repository settings

## 🎨 UI Features

### Glassmorphism Design
- **Backdrop Blur**: Beautiful frosted glass effects
- **Gradient Backgrounds**: Vibrant, animated color gradients
- **Smooth Animations**: Micro-interactions and transitions
- **Responsive Layout**: Mobile-first design approach

### Voice Controls
- **Voice Recording**: Click microphone to start/stop recording
- **Visual Feedback**: Recording state with animations
- **Auto-transcription**: Speech converted to text automatically

### Chat Interface
- **Message Bubbles**: Distinct styling for user and AI messages
- **Avatars**: Emoji-based user and AI avatars
- **Typing Indicators**: Loading animation while AI responds
- **Auto-scroll**: Automatically scrolls to latest messages

## 🔧 Browser Support

### Required Features
- **Web Speech API**: For voice input (Chrome, Safari, Edge)
- **Fetch API**: For API calls (all modern browsers)
- **CSS Backdrop Filter**: For glassmorphism effects (modern browsers)
- **Local Storage**: For configuration persistence

### Recommended Browsers
- **Chrome 60+**: Full feature support
- **Safari 14+**: Full feature support
- **Firefox 90+**: Limited voice support
- **Edge 79+**: Full feature support

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI**: For providing the powerful language model and TTS capabilities
- **Glassmorphism Design**: Inspired by modern UI/UX trends
- **Web Speech API**: For enabling voice input functionality

## 📞 Support

If you encounter any issues or have questions:

1. **Check the browser console** for error messages
2. **Verify your API key** is correct and has proper permissions
3. **Ensure your browser supports** required features
4. **Open an issue** on GitHub with details about the problem

---

**Built with ❤️ using modern web technologies and Gemini AI** 