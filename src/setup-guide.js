// TokenLaunchPro Setup Guide
export class SetupGuide {
  constructor() {
    this.steps = [
      {
        id: 'supabase',
        title: 'Connect Supabase Database',
        description: 'Set up your database for user authentication and data storage',
        status: 'pending',
        required: true
      },
      {
        id: 'stripe',
        title: 'Configure Stripe Payments',
        description: 'Enable subscription payments and token purchases',
        status: 'pending',
        required: true
      },
      {
        id: 'blockchain',
        title: 'Blockchain Integration',
        description: 'Connect to Ethereum, Polygon, and BSC networks',
        status: 'pending',
        required: false
      },
      {
        id: 'email',
        title: 'Email Notifications',
        description: 'Set up automated email communications',
        status: 'pending',
        required: false
      }
    ];
  }

  // Check setup status
  async checkSetupStatus() {
    const status = {
      supabase: this.checkSupabase(),
      stripe: this.checkStripe(),
      blockchain: this.checkBlockchain(),
      email: this.checkEmail()
    };

    // Update step statuses
    this.steps.forEach(step => {
      step.status = status[step.id] ? 'completed' : 'pending';
    });

    return status;
  }

  // Check if Supabase is configured
  checkSupabase() {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    return url && key && url !== 'https://demo.supabase.co' && key !== 'demo-key';
  }

  // Check if Stripe is configured
  checkStripe() {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    return key && key.startsWith('pk_') && key !== 'pk_test_51234567890';
  }

  // Check if blockchain is configured
  checkBlockchain() {
    const infura = import.meta.env.VITE_INFURA_PROJECT_ID;
    const alchemy = import.meta.env.VITE_ALCHEMY_API_KEY;
    return infura || alchemy;
  }

  // Check if email is configured
  checkEmail() {
    const host = import.meta.env.SMTP_HOST;
    const user = import.meta.env.SMTP_USER;
    return host && user;
  }

  // Show setup guide modal
  showSetupGuide() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-gray-900 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white">Setup Guide</h2>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          ${this.steps.map(step => `
            <div class="flex items-start space-x-4 p-4 rounded-lg ${step.status === 'completed' ? 'bg-green-900/20 border border-green-500/30' : 'bg-gray-800 border border-gray-700'}">
              <div class="flex-shrink-0 mt-1">
                ${step.status === 'completed' 
                  ? '<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>'
                  : '<svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
                }
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-white flex items-center">
                  ${step.title}
                  ${step.required ? '<span class="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded">Required</span>' : ''}
                </h3>
                <p class="text-gray-400 text-sm mt-1">${step.description}</p>
                ${step.status === 'pending' ? `<div class="mt-2">${this.getSetupInstructions(step.id)}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <h3 class="font-semibold text-blue-400 mb-2">🚀 Quick Start</h3>
          <p class="text-gray-300 text-sm">
            Complete the required steps (Supabase + Stripe) to start accepting customers immediately. 
            Optional features can be added later.
          </p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  // Get setup instructions for each step
  getSetupInstructions(stepId) {
    const instructions = {
      supabase: `
        <div class="text-sm text-gray-300">
          <p class="mb-2">1. Click the "Supabase" button in project settings</p>
          <p class="mb-2">2. Create/connect your Supabase project</p>
          <p>3. Database tables will be created automatically</p>
        </div>
      `,
      stripe: `
        <div class="text-sm text-gray-300">
          <p class="mb-2">1. Create account at <a href="https://stripe.com" target="_blank" class="text-blue-400 hover:underline">stripe.com</a></p>
          <p class="mb-2">2. Get your publishable key from dashboard</p>
          <p>3. Add to environment variables</p>
        </div>
      `,
      blockchain: `
        <div class="text-sm text-gray-300">
          <p class="mb-2">1. Get API key from <a href="https://infura.io" target="_blank" class="text-blue-400 hover:underline">Infura</a> or <a href="https://alchemy.com" target="_blank" class="text-blue-400 hover:underline">Alchemy</a></p>
          <p>2. Add to environment variables</p>
        </div>
      `,
      email: `
        <div class="text-sm text-gray-300">
          <p class="mb-2">1. Configure SMTP settings in environment</p>
          <p>2. Use Gmail, SendGrid, or other email service</p>
        </div>
      `
    };
    
    return instructions[stepId] || '';
  }
}

// Initialize setup guide
export const setupGuide = new SetupGuide();