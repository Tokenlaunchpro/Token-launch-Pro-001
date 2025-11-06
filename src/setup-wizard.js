import { supabase } from './supabase.js';
import { config, validateConfig } from './config.js';

export class SetupWizard {
  constructor() {
    this.currentStep = 0;
    this.steps = [
      {
        id: 'welcome',
        title: 'Welcome to TokenLaunchPro',
        description: 'Let\'s get your platform ready for customers',
        component: 'renderWelcomeStep'
      },
      {
        id: 'database',
        title: 'Database Setup',
        description: 'Connect your Supabase database',
        component: 'renderDatabaseStep'
      },
      {
        id: 'payments',
        title: 'Payment Processing',
        description: 'Configure Stripe for subscriptions',
        component: 'renderPaymentsStep'
      },
      {
        id: 'blockchain',
        title: 'Blockchain Integration',
        description: 'Set up network connections',
        component: 'renderBlockchainStep'
      },
      {
        id: 'complete',
        title: 'Setup Complete',
        description: 'Your platform is ready to launch!',
        component: 'renderCompleteStep'
      }
    ];
  }

  // Initialize setup wizard
  init() {
    this.createWizardModal();
    this.checkSetupStatus();
  }

  // Create wizard modal
  createWizardModal() {
    const modal = document.createElement('div');
    modal.id = 'setup-wizard';
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-purple-500/20">
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 to-cyan-600 p-6">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-bold text-white">Platform Setup</h2>
              <p class="text-purple-100">Step <span id="current-step">1</span> of ${this.steps.length}</p>
            </div>
            <button id="close-wizard" class="text-white hover:text-gray-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Progress Bar -->
          <div class="mt-4">
            <div class="w-full bg-white/20 rounded-full h-2">
              <div id="progress-bar" class="bg-white h-2 rounded-full transition-all duration-300" style="width: 20%"></div>
            </div>
          </div>
        </div>
        
        <!-- Content -->
        <div id="wizard-content" class="p-8 overflow-y-auto max-h-96">
          <!-- Dynamic content will be inserted here -->
        </div>
        
        <!-- Footer -->
        <div class="bg-gray-800 p-6 flex justify-between">
          <button id="prev-step" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors" disabled>
            Previous
          </button>
          <button id="next-step" class="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300">
            Next
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.attachEventListeners();
    this.renderCurrentStep();
  }

  // Attach event listeners
  attachEventListeners() {
    document.getElementById('close-wizard').addEventListener('click', () => this.close());
    document.getElementById('prev-step').addEventListener('click', () => this.previousStep());
    document.getElementById('next-step').addEventListener('click', () => this.nextStep());
  }

  // Render current step
  renderCurrentStep() {
    const step = this.steps[this.currentStep];
    const content = document.getElementById('wizard-content');
    const currentStepEl = document.getElementById('current-step');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');

    // Update UI
    currentStepEl.textContent = this.currentStep + 1;
    progressBar.style.width = `${((this.currentStep + 1) / this.steps.length) * 100}%`;
    prevBtn.disabled = this.currentStep === 0;
    
    if (this.currentStep === this.steps.length - 1) {
      nextBtn.textContent = 'Launch Platform';
      nextBtn.className = 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300';
    } else {
      nextBtn.textContent = 'Next';
      nextBtn.className = 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300';
    }

    // Render step content
    this[step.component](content);
  }

  // Render welcome step
  renderWelcomeStep(container) {
    container.innerHTML = `
      <div class="text-center">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        
        <h3 class="text-3xl font-bold text-white mb-4">Welcome to TokenLaunchPro!</h3>
        <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          You're about to launch the most advanced token creation platform. This setup wizard will help you configure 
          all the essential components to get your platform ready for customers.
        </p>
        
        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="bg-gray-800/50 rounded-xl p-6">
            <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
              </svg>
            </div>
            <h4 class="text-white font-semibold mb-2">Database Setup</h4>
            <p class="text-gray-400 text-sm">Connect Supabase for user management and data storage</p>
          </div>
          
          <div class="bg-gray-800/50 rounded-xl p-6">
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
            </div>
            <h4 class="text-white font-semibold mb-2">Payment Processing</h4>
            <p class="text-gray-400 text-sm">Configure Stripe for subscription billing</p>
          </div>
          
          <div class="bg-gray-800/50 rounded-xl p-6">
            <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h4 class="text-white font-semibold mb-2">Blockchain Integration</h4>
            <p class="text-gray-400 text-sm">Connect to Ethereum, BSC, and Polygon networks</p>
          </div>
        </div>
        
        <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <p class="text-blue-300 text-sm">
            <strong>Estimated setup time:</strong> 10-15 minutes<br>
            <strong>Required:</strong> Supabase account, Stripe account (optional: Infura/Alchemy API keys)
          </p>
        </div>
      </div>
    `;
  }

  // Render database step
  renderDatabaseStep(container) {
    container.innerHTML = `
      <div>
        <h3 class="text-2xl font-bold text-white mb-4">Database Setup</h3>
        <p class="text-gray-300 mb-6">Connect your Supabase database to enable user authentication and data storage.</p>
        
        <div class="space-y-6">
          <div class="bg-gray-800/50 rounded-xl p-6">
            <h4 class="text-white font-semibold mb-4">Step 1: Supabase Connection</h4>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-300 text-sm mb-2">Supabase URL</label>
                <input type="url" id="supabase-url" placeholder="https://your-project.supabase.co" 
                       class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
              </div>
              <div>
                <label class="block text-gray-300 text-sm mb-2">Supabase Anon Key</label>
                <input type="password" id="supabase-key" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                       class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
              </div>
              <button id="test-supabase" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                Test Connection
              </button>
              <div id="supabase-status" class="text-sm"></div>
            </div>
          </div>
          
          <div class="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <h4 class="text-yellow-300 font-semibold mb-2">Don't have Supabase yet?</h4>
            <p class="text-yellow-200 text-sm mb-3">
              Click the "Supabase" button in your project settings to automatically create and configure your database.
            </p>
            <button class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Open Supabase Setup
            </button>
          </div>
        </div>
      </div>
    `;

    // Add event listener for test connection
    document.getElementById('test-supabase').addEventListener('click', () => this.testSupabaseConnection());
  }

  // Render payments step
  renderPaymentsStep(container) {
    container.innerHTML = `
      <div>
        <h3 class="text-2xl font-bold text-white mb-4">Payment Processing</h3>
        <p class="text-gray-300 mb-6">Configure Stripe to accept subscription payments from your customers.</p>
        
        <div class="space-y-6">
          <div class="bg-gray-800/50 rounded-xl p-6">
            <h4 class="text-white font-semibold mb-4">Stripe Configuration</h4>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-300 text-sm mb-2">Stripe Publishable Key</label>
                <input type="text" id="stripe-key" placeholder="pk_test_..." 
                       class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                <p class="text-gray-400 text-xs mt-1">Found in your Stripe Dashboard → Developers → API keys</p>
              </div>
              <button id="test-stripe" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                Validate Key
              </button>
              <div id="stripe-status" class="text-sm"></div>
            </div>
          </div>
          
          <div class="bg-gray-800/50 rounded-xl p-6">
            <h4 class="text-white font-semibold mb-4">Subscription Plans</h4>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-gray-700/50 rounded-lg p-4">
                <h5 class="text-white font-semibold">Starter</h5>
                <p class="text-2xl font-bold text-purple-400">$99<span class="text-sm text-gray-400">/mo</span></p>
                <p class="text-gray-400 text-sm">Basic token deployment</p>
              </div>
              <div class="bg-gray-700/50 rounded-lg p-4">
                <h5 class="text-white font-semibold">Professional</h5>
                <p class="text-2xl font-bold text-cyan-400">$299<span class="text-sm text-gray-400">/mo</span></p>
                <p class="text-gray-400 text-sm">Advanced features + marketing</p>
              </div>
              <div class="bg-gray-700/50 rounded-lg p-4">
                <h5 class="text-white font-semibold">Enterprise</h5>
                <p class="text-2xl font-bold text-yellow-400">$999<span class="text-sm text-gray-400">/mo</span></p>
                <p class="text-gray-400 text-sm">Custom solutions</p>
              </div>
            </div>
          </div>
          
          <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <p class="text-blue-300 text-sm">
              <strong>Note:</strong> You can skip this step and configure payments later. The platform will work in demo mode without Stripe.
            </p>
          </div>
        </div>
      </div>
    `;

    // Add event listener for validate key
    document.getElementById('test-stripe').addEventListener('click', () => this.validateStripeKey());
  }

  // Render blockchain step
  renderBlockchainStep(container) {
    container.innerHTML = `
      <div>
        <h3 class="text-2xl font-bold text-white mb-4">Blockchain Integration</h3>
        <p class="text-gray-300 mb-6">Connect to blockchain networks to enable token deployment.</p>
        
        <div class="space-y-6">
          <div class="bg-gray-800/50 rounded-xl p-6">
            <h4 class="text-white font-semibold mb-4">Network Providers</h4>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-300 text-sm mb-2">Infura Project ID (Optional)</label>
                <input type="text" id="infura-key" placeholder="1234567890abcdef..." 
                       class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                <p class="text-gray-400 text-xs mt-1">Get from <a href="https://infura.io" target="_blank" class="text-blue-400 hover:underline">infura.io</a></p>
              </div>
              <div>
                <label class="block text-gray-300 text-sm mb-2">Alchemy API Key (Optional)</label>
                <input type="text" id="alchemy-key" placeholder="abcdef1234567890..." 
                       class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                <p class="text-gray-400 text-xs mt-1">Get from <a href="https://alchemy.com" target="_blank" class="text-blue-400 hover:underline">alchemy.com</a></p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800/50 rounded-xl p-6">
            <h4 class="text-white font-semibold mb-4">Supported Networks</h4>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h5 class="text-blue-300 font-semibold">Ethereum</h5>
                <p class="text-gray-400 text-sm">Mainnet & Testnets</p>
                <div class="mt-2 text-green-400 text-sm">✅ Ready</div>
              </div>
              <div class="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h5 class="text-yellow-300 font-semibold">Binance Smart Chain</h5>
                <p class="text-gray-400 text-sm">BSC Mainnet & Testnet</p>
                <div class="mt-2 text-green-400 text-sm">✅ Ready</div>
              </div>
              <div class="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h5 class="text-purple-300 font-semibold">Polygon</h5>
                <p class="text-gray-400 text-sm">Polygon Mainnet & Mumbai</p>
                <div class="mt-2 text-green-400 text-sm">✅ Ready</div>
              </div>
            </div>
          </div>
          
          <div class="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <p class="text-green-300 text-sm">
              <strong>Good news:</strong> The platform includes default RPC endpoints for all networks. 
              Adding your own API keys will provide better performance and higher rate limits.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // Render complete step
  renderCompleteStep(container) {
    container.innerHTML = `
      <div class="text-center">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h3 class="text-3xl font-bold text-white mb-4">Setup Complete! 🎉</h3>
        <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Your TokenLaunchPro platform is now configured and ready to accept customers. 
          You can start promoting your platform and helping users create their tokens!
        </p>
        
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-gray-800/50 rounded-xl p-6">
            <h4 class="text-white font-semibold mb-4">What's Ready</h4>
            <div class="space-y-2 text-left">
              <div class="flex items-center text-green-400">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                User Authentication System
              </div>
              <div class="flex items-center text-green-400">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Token Creation & Deployment
              </div>
              <div class="flex items-center text-green-400">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Multi-Chain Support
              </div>
              <div class="flex items-center text-green-400">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Security & Compliance
              </div>
              <div class="flex items-center text-green-400">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Analytics & Monitoring
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800/50 rounded-xl p-6">
            <h4 class="text-white font-semibold mb-4">Next Steps</h4>
            <div class="space-y-3 text-left">
              <div class="flex items-start">
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span class="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <p class="text-white font-semibold">Deploy to Production</p>
                  <p class="text-gray-400 text-sm">Make your platform live for customers</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span class="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <p class="text-white font-semibold">Set Up Domain</p>
                  <p class="text-gray-400 text-sm">Point your custom domain to the platform</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span class="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <p class="text-white font-semibold">Launch Marketing</p>
                  <p class="text-gray-400 text-sm">Start promoting to attract customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-center space-x-4">
          <button id="deploy-now" class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            🚀 Deploy to Production
          </button>
          <button id="view-dashboard" class="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
            View Dashboard
          </button>
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('deploy-now').addEventListener('click', () => this.deployToProd());
    document.getElementById('view-dashboard').addEventListener('click', () => this.viewDashboard());
  }

  // Test Supabase connection
  async testSupabaseConnection() {
    const url = document.getElementById('supabase-url').value;
    const key = document.getElementById('supabase-key').value;
    const status = document.getElementById('supabase-status');

    if (!url || !key) {
      status.innerHTML = '<span class="text-red-400">Please enter both URL and key</span>';
      return;
    }

    status.innerHTML = '<span class="text-yellow-400">Testing connection...</span>';

    try {
      // Test connection (simplified)
      const testClient = createClient(url, key);
      const { data, error } = await testClient.auth.getSession();
      
      if (error && error.message !== 'Auth session missing!') {
        throw error;
      }

      status.innerHTML = '<span class="text-green-400">✅ Connection successful!</span>';
    } catch (error) {
      status.innerHTML = `<span class="text-red-400">❌ Connection failed: ${error.message}</span>`;
    }
  }

  // Validate Stripe key
  validateStripeKey() {
    const key = document.getElementById('stripe-key').value;
    const status = document.getElementById('stripe-status');

    if (!key) {
      status.innerHTML = '<span class="text-red-400">Please enter your Stripe key</span>';
      return;
    }

    if (!key.startsWith('pk_')) {
      status.innerHTML = '<span class="text-red-400">Invalid key format. Should start with pk_</span>';
      return;
    }

    status.innerHTML = '<span class="text-green-400">✅ Valid Stripe key format</span>';
  }

  // Check setup status
  async checkSetupStatus() {
    const status = await validateConfig();
    if (status) {
      // Skip to complete step if already configured
      this.currentStep = this.steps.length - 1;
      this.renderCurrentStep();
    }
  }

  // Navigation methods
  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.renderCurrentStep();
    } else {
      // Launch platform
      this.launchPlatform();
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderCurrentStep();
    }
  }

  // Deploy to production
  deployToProd() {
    // This would trigger the deployment process
    alert('Deployment feature will be implemented next!');
    this.close();
  }

  // View dashboard
  viewDashboard() {
    // This would navigate to the admin dashboard
    alert('Dashboard feature coming soon!');
    this.close();
  }

  // Launch platform
  launchPlatform() {
    this.close();
    // Show success message
    this.showSuccessMessage();
  }

  // Show success message
  showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-lg shadow-lg z-50';
    message.innerHTML = `
      <div class="flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="font-semibold">Platform setup complete! 🎉</span>
      </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 5000);
  }

  // Close wizard
  close() {
    const wizard = document.getElementById('setup-wizard');
    if (wizard) {
      wizard.remove();
    }
  }
}

// Initialize setup wizard
export const setupWizard = new SetupWizard();