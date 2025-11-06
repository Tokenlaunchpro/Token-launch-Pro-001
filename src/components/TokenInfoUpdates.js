export class TokenInfoUpdates {
  constructor(containerId) {
    this.containerId = containerId;
    this.stats = {
      activeUsers: 25847,
      tokensLaunched: 1247,
      successRate: 98.5,
      totalValue: 2500000000
    };
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-purple-500/20">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-white mb-4">Our Token Info Updates</h2>
          <p class="text-gray-300 max-w-2xl mx-auto">
            Stay ahead with our AI-powered platform that combines cutting-edge blockchain technology 
            with automated marketing tools to ensure your token launch success.
          </p>
        </div>

        <!-- Animated Statistics -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-400 mb-2" data-count="${this.stats.activeUsers}">0</div>
            <div class="text-gray-300">Active Users</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-cyan-400 mb-2" data-count="${this.stats.tokensLaunched}">0</div>
            <div class="text-gray-300">Tokens Launched</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-400 mb-2" data-count="${this.stats.successRate}">0</div>
            <div class="text-gray-300">Success Rate %</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-yellow-400 mb-2" data-count="${this.stats.totalValue}">$0</div>
            <div class="text-gray-300">Total Value Locked</div>
          </div>
        </div>

        <!-- Recent Updates -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-gray-800/50 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-4">Recent Updates</h3>
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <p class="text-white font-semibold">AI-Powered Analytics Released</p>
                  <p class="text-gray-400 text-sm">Advanced token performance prediction now available</p>
                  <p class="text-gray-500 text-xs">2 days ago</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <p class="text-white font-semibold">Multi-Chain Support Added</p>
                  <p class="text-gray-400 text-sm">Deploy tokens on Ethereum, BSC, and Polygon</p>
                  <p class="text-gray-500 text-xs">1 week ago</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <div>
                  <p class="text-white font-semibold">Enhanced Security Audits</p>
                  <p class="text-gray-400 text-sm">Automated smart contract vulnerability detection</p>
                  <p class="text-gray-500 text-xs">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-800/50 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-4">Roadmap Preview</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-white font-semibold">Q2 2024 - Completed</p>
                  <p class="text-gray-400 text-sm">Multi-chain deployment & AI analytics</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <div class="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <p class="text-white font-semibold">Q3 2024 - In Progress</p>
                  <p class="text-gray-400 text-sm">DeFi integrations & yield farming</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <div>
                  <p class="text-white font-semibold">Q4 2024 - Planned</p>
                  <p class="text-gray-400 text-sm">Mobile app & advanced trading tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center">
          <button class="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mr-4">
            Download Whitepaper
          </button>
          <button class="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
            View Documentation
          </button>
        </div>
      </div>
    `;

    this.animateCounters();
  }

  animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const isValue = counter.textContent.includes('$');
      const isPercentage = counter.textContent.includes('%');
      
      let current = 0;
      const increment = target / 100;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          if (isValue) {
            counter.textContent = `$${Math.floor(current).toLocaleString()}`;
          } else if (isPercentage) {
            counter.textContent = `${current.toFixed(1)}%`;
          } else {
            counter.textContent = Math.floor(current).toLocaleString();
          }
          requestAnimationFrame(updateCounter);
        } else {
          if (isValue) {
            counter.textContent = `$${target.toLocaleString()}`;
          } else if (isPercentage) {
            counter.textContent = `${target}%`;
          } else {
            counter.textContent = target.toLocaleString();
          }
        }
      };
      
      updateCounter();
    });
  }
}