export class TokenSaleProgress {
  constructor(containerId) {
    this.containerId = containerId;
    this.tokensSold = 1300000000; // 1.3B
    this.tokenGoal = 2100000000; // 2.1B
    this.tokenPrice = 0.29;
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const progress = (this.tokensSold / this.tokenGoal) * 100;

    container.innerHTML = `
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-purple-500/20">
        <div class="text-center mb-6">
          <h3 class="text-2xl font-bold text-white mb-2">Token Sale Progress</h3>
          <p class="text-gray-300">Join the revolution - limited time offer!</p>
        </div>
        
        <div class="mb-6">
          <div class="flex justify-between text-sm text-gray-300 mb-2">
            <span>${(this.tokensSold / 1000000000).toFixed(1)}B Tokens Sold</span>
            <span>${(this.tokenGoal / 1000000000).toFixed(1)}B Goal</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-4">
            <div class="bg-gradient-to-r from-purple-600 to-cyan-400 h-4 rounded-full transition-all duration-1000" 
                 style="width: ${progress}%"></div>
          </div>
          <div class="text-center mt-2">
            <span class="text-lg font-bold text-white">${progress.toFixed(1)}% Complete</span>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-purple-400">$${this.tokenPrice}</div>
            <div class="text-sm text-gray-300">Current Price</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-cyan-400">${Math.floor(Math.random() * 5000 + 15000).toLocaleString()}</div>
            <div class="text-sm text-gray-300">Participants</div>
          </div>
        </div>
      </div>
    `;
  }
}