// TokenLaunchPro Configuration
export const config = {
  // Application Settings
  app: {
    name: 'TokenLaunchPro',
    version: '1.0.1',
    description: 'Professional Token Launch Platform',
    url: import.meta.env.VITE_APP_URL || window.location.origin
  },

  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'
  },

  // Stripe Configuration
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890'
  },

  // Subscription Plans
  plans: {
    starter: {
      id: 'starter',
      name: 'Starter',
      price: 9900, // $99.00 in cents
      interval: 'month',
      features: [
        'Basic token deployment',
        'Standard security audit',
        'Email support',
        'Basic analytics',
        'Community access'
      ]
    },
    professional: {
      id: 'professional',
      name: 'Professional',
      price: 29900, // $299.00 in cents
      interval: 'month',
      features: [
        'Advanced token features',
        'Premium security audit',
        'Priority support',
        'Marketing tools',
        'Advanced analytics',
        'Custom branding',
        'API access'
      ]
    },
    enterprise: {
      id: 'enterprise',
      name: 'Enterprise',
      price: 0, // Custom pricing
      interval: 'month',
      features: [
        'Custom solutions',
        'Dedicated support',
        'White-label options',
        'Advanced integrations',
        'Custom smart contracts',
        'Compliance tools',
        'Priority deployment'
      ]
    }
  },

  // Blockchain Networks
  networks: {
    ethereum: {
      name: 'Ethereum',
      chainId: 1,
      symbol: 'ETH',
      rpcUrl: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`,
      explorerUrl: 'https://etherscan.io',
      gasPrice: '20000000000' // 20 gwei
    },
    polygon: {
      name: 'Polygon',
      chainId: 137,
      symbol: 'MATIC',
      rpcUrl: 'https://polygon-rpc.com',
      explorerUrl: 'https://polygonscan.com',
      gasPrice: '30000000000' // 30 gwei
    },
    bsc: {
      name: 'Binance Smart Chain',
      chainId: 56,
      symbol: 'BNB',
      rpcUrl: 'https://bsc-dataseed.binance.org',
      explorerUrl: 'https://bscscan.com',
      gasPrice: '5000000000' // 5 gwei
    }
  },

  // Email Templates
  email: {
    from: 'TokenLaunchPro <noreply@tokenlaunchpro.com>',
    replyTo: 'support@tokenlaunchpro.com',
    templates: {
      welcome: 'Welcome to TokenLaunchPro! 🚀',
      payment_success: 'Payment Successful - Welcome to {{planName}}! 💳',
      token_deployed: 'Token Deployed Successfully! 🪙',
      audit_complete: 'Security Audit Complete - {{tokenName}} ✅'
    }
  },

  // Feature Flags
  features: {
    enablePayments: true,
    enableBlockchain: true,
    enableEmails: true,
    enableAnalytics: true,
    enableMarketing: true,
    enableAudits: true,
    enableDemo: true
  },

  // API Endpoints
  api: {
    baseUrl: '/api',
    endpoints: {
      payments: '/payments',
      tokens: '/tokens',
      audits: '/audits',
      campaigns: '/campaigns',
      analytics: '/analytics'
    }
  },

  // UI Configuration
  ui: {
    theme: 'dark',
    primaryColor: '#9333ea',
    secondaryColor: '#22d3ee',
    accentColor: '#f59e0b',
    animations: true,
    notifications: true
  }
};

// Validation
export const validateConfig = () => {
  const errors = [];

  if (!config.supabase.url) {
    errors.push('VITE_SUPABASE_URL is required');
  }

  if (!config.supabase.anonKey) {
    errors.push('VITE_SUPABASE_ANON_KEY is required');
  }

  if (!config.stripe.publishableKey || config.stripe.publishableKey === 'pk_test_demo_key') {
    console.warn('VITE_STRIPE_PUBLISHABLE_KEY not configured - payments will not work');
  }

  if (errors.length > 0) {
    console.error('Configuration errors:', errors);
    return false;
  }

  return true;
};

export default config;