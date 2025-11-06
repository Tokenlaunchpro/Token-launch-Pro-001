export class ProductionChecklist {
  constructor() {
    this.checklist = [
      {
        id: 'supabase',
        title: 'Supabase Database Connection',
        status: 'pending',
        instructions: 'Click "Supabase" button in project settings',
        critical: true
      },
      {
        id: 'stripe',
        title: 'Stripe Payment Processing',
        status: 'pending',
        instructions: 'Add VITE_STRIPE_PUBLISHABLE_KEY to environment',
        critical: true
      },
      {
        id: 'blockchain',
        title: 'Blockchain API Keys',
        status: 'optional',
        instructions: 'Add VITE_INFURA_PROJECT_ID or VITE_ALCHEMY_API_KEY',
        critical: false
      },
      {
        id: 'domain',
        title: 'Custom Domain Setup',
        status: 'manual',
        instructions: 'Configure DNS after deployment',
        critical: false
      }
    ];
  }

  // Display production checklist
  showChecklist() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-500/20">
        <div class="bg-gradient-to-r from-purple-600 to-cyan-600 p-6 rounded-t-2xl">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-bold text-white">🚀 Production Deployment Checklist</h2>
              <p class="text-purple-100">Complete these steps to go live</p>
            </div>
            <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-8">
          <div class="space-y-6">
            ${this.checklist.map(item => `
              <div class="flex items-start space-x-4 p-4 rounded-xl ${item.critical ? 'bg-red-900/20 border border-red-500/30' : 'bg-gray-800/50 border border-gray-700'}">
                <div class="flex-shrink-0 mt-1">
                  ${item.status === 'completed' 
                    ? '<svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>'
                    : item.critical 
                      ? '<svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>'
                      : '<svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
                  }
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-white flex items-center">
                    ${item.title}
                    ${item.critical ? '<span class="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded">REQUIRED</span>' : ''}
                  </h3>
                  <p class="text-gray-400 text-sm mt-1">${item.instructions}</p>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
            <h3 class="font-semibold text-blue-400 mb-3">📋 Manual Steps Required:</h3>
            <ol class="text-gray-300 text-sm space-y-2">
              <li><strong>1. Supabase:</strong> Click "Supabase" button in project settings → Connect your project</li>
              <li><strong>2. Stripe:</strong> Add your publishable key to environment variables</li>
              <li><strong>3. Domain:</strong> Configure DNS after deployment completes</li>
              <li><strong>4. Testing:</strong> Verify all features work with real data</li>
            </ol>
          </div>
          
          <div class="mt-6 flex justify-center">
            <button onclick="window.deployToProduction()" class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              🚀 Deploy to Production
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  // Check production readiness
  checkReadiness() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

    // Update checklist status
    this.checklist.forEach(item => {
      switch(item.id) {
        case 'supabase':
          item.status = (supabaseUrl && supabaseKey && !supabaseUrl.includes('demo')) ? 'completed' : 'pending';
          break;
        case 'stripe':
          item.status = (stripeKey && stripeKey.startsWith('pk_')) ? 'completed' : 'pending';
          break;
        case 'blockchain':
          item.status = 'optional';
          break;
        case 'domain':
          item.status = 'manual';
          break;
      }
    });

    const criticalComplete = this.checklist
      .filter(item => item.critical)
      .every(item => item.status === 'completed');

    return {
      ready: criticalComplete,
      checklist: this.checklist,
      criticalIssues: this.checklist.filter(item => item.critical && item.status !== 'completed')
    };
  }
}

// Global function for deployment
window.deployToProduction = () => {
  const checklist = new ProductionChecklist();
  const readiness = checklist.checkReadiness();
  
  if (!readiness.ready) {
    alert(`❌ Cannot deploy yet. Please complete: ${readiness.criticalIssues.map(i => i.title).join(', ')}`);
    return;
  }
  
  alert('🚀 Deploying to production... This will happen automatically!');
};

export const productionChecklist = new ProductionChecklist();