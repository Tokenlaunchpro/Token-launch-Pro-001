export class SecurityCompliance {
  constructor(containerId) {
    this.containerId = containerId;
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">Smart Contract Audit</h3>
              <p class="text-green-400 text-sm">✅ Verified</p>
            </div>
          </div>
          <p class="text-gray-300 text-sm mb-4">Audited by leading security firms with 99.9% security score</p>
          <button class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
            View Audit Report
          </button>
        </div>

        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">KYC/AML Integration</h3>
              <p class="text-blue-400 text-sm">✅ Compliant</p>
            </div>
          </div>
          <p class="text-gray-300 text-sm mb-4">Full compliance with international regulations and standards</p>
          <div class="flex space-x-2">
            <span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">KYC</span>
            <span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">AML</span>
            <span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">GDPR</span>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">24/7 Monitoring</h3>
              <p class="text-purple-400 text-sm">✅ Active</p>
            </div>
          </div>
          <p class="text-gray-300 text-sm mb-4">Real-time security monitoring and threat detection</p>
          <div class="text-2xl font-bold text-purple-400">99.9%</div>
          <div class="text-sm text-gray-300">Uptime Guarantee</div>
        </div>
      </div>
    `;
  }
}