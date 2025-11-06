export class ChatSupport {
  constructor() {
    this.isOpen = false;
    this.messages = [
      { type: 'bot', text: 'Welcome to TokenLaunchPro support! 👋', time: new Date() },
      { type: 'bot', text: 'We\'re here 24/7 to help you with your token launch journey.', time: new Date() }
    ];
  }

  init() {
    this.createChatWidget();
    this.attachEventListeners();
  }

  createChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chat-widget';
    chatWidget.innerHTML = `
      <!-- Chat Button -->
      <div id="chat-button" class="fixed bottom-6 right-6 z-50">
        <button class="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </button>
        <div class="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <!-- Chat Window -->
      <div id="chat-window" class="fixed bottom-24 right-6 w-80 h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-purple-500/20 z-50 hidden">
        <div class="flex items-center justify-between p-4 border-b border-gray-700">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold">Support Team</h3>
              <p class="text-green-400 text-xs">● Online</p>
            </div>
          </div>
          <button id="chat-close" class="text-gray-400 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div id="chat-messages" class="flex-1 p-4 h-64 overflow-y-auto">
          <!-- Messages will be inserted here -->
        </div>
        
        <div class="p-4 border-t border-gray-700">
          <div class="flex space-x-2 mb-2">
            <button class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-xs transition-colors">
              Token Launch Help
            </button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-xs transition-colors">
              Pricing Info
            </button>
          </div>
          <div class="flex">
            <input type="text" id="chat-input" placeholder="Type your message..." 
                   class="flex-1 bg-gray-700 border border-gray-600 rounded-l-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500">
            <button id="chat-send" class="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-4 py-2 rounded-r-lg transition-all duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(chatWidget);
    this.renderMessages();
  }

  attachEventListeners() {
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');

    chatButton.addEventListener('click', () => this.toggleChat());
    chatClose.addEventListener('click', () => this.toggleChat());
    chatSend.addEventListener('click', () => this.sendMessage());
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      chatWindow.classList.remove('hidden');
      chatWindow.classList.add('animate-fade-in');
    } else {
      chatWindow.classList.add('hidden');
    }
  }

  sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;

    this.messages.push({
      type: 'user',
      text: message,
      time: new Date()
    });

    input.value = '';
    this.renderMessages();

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Thanks for your message! Our team will get back to you shortly.",
        "I'd be happy to help you with that. Let me connect you with a specialist.",
        "Great question! You can find more information in our documentation or I can help you directly.",
        "Our token launch process is simple and secure. Would you like me to walk you through it?"
      ];
      
      this.messages.push({
        type: 'bot',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date()
      });
      
      this.renderMessages();
    }, 1000);
  }

  renderMessages() {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    container.innerHTML = this.messages.map(msg => `
      <div class="mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}">
        <div class="inline-block max-w-xs px-3 py-2 rounded-lg ${
          msg.type === 'user' 
            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white' 
            : 'bg-gray-700 text-gray-100'
        }">
          <p class="text-sm">${msg.text}</p>
        </div>
        <p class="text-xs text-gray-400 mt-1">${msg.time.toLocaleTimeString()}</p>
      </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
  }
}