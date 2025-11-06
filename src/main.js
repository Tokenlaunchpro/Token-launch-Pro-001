import { auth } from './auth.js';
import { platformSetup } from './platform-setup.js';
import { marketingContent } from './marketing-content.js';
import { productionChecklist } from './production-checklist.js';
import { postDeploymentRoadmap } from './post-deployment-roadmap.js';

// Main initialization function
async function main() {
  try {
    await auth.init();
    console.log('Auth initialized successfully');
    
    // Initialize platform setup
    console.log('🚀 TokenLaunchPro Platform Starting...');
    
    // Check if this is first run
    const isFirstRun = !localStorage.getItem('tokenlaunchpro_setup_complete');
    
    if (isFirstRun) {
      console.log('🎯 First run detected - starting setup process...');
      
      // Show welcome message
      showWelcomeMessage();
      
      // Start automated setup after user interaction
      setTimeout(() => {
        if (confirm('🚀 Ready to set up your TokenLaunchPro platform? This will configure database, payments, marketing, and deployment.')) {
          startPlatformSetup();
        }
      }, 2000);
    } else {
      console.log('✅ Platform already configured');
    }
    
  } catch (error) {
    console.error('Failed to initialize auth:', error);
  }
  
  // Add setup platform button listener
  const setupButton = document.getElementById('setupPlatformButton');
  if (setupButton) {
    setupButton.addEventListener('click', startPlatformSetup);
  }
  
  // Add production checklist button
  const productionButton = document.getElementById('productionChecklistButton');
  if (productionButton) {
    productionButton.addEventListener('click', () => productionChecklist.showChecklist());
  }
  
  // Add roadmap button
  const roadmapButton = document.getElementById('roadmapButton');
  if (roadmapButton) {
    roadmapButton.addEventListener('click', () => postDeploymentRoadmap.showRoadmap());
  }

  document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById('navGetStartedButton');
    const heroButton = document.getElementById('heroGetStartedButton');
    const launchTokenButton = document.getElementById('launchTokenAction');
    
    if (navButton) {
      navButton.addEventListener('click', showLogin);
    }
    
    if (heroButton) {
      heroButton.addEventListener('click', showLogin);
    }
    
    if (launchTokenButton) {
      launchTokenButton.addEventListener('click', startPlatformSetup);
    }
  });
}

// Define showLogin function globally
function showLogin() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

// Close auth modal
function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Toggle between login and signup
function toggleAuthMode() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const authTitle = document.getElementById('authTitle');
  const toggleButton = document.getElementById('toggleAuth');
  
  if (loginForm.classList.contains('hidden')) {
    // Switch to login
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    authTitle.textContent = 'Welcome Back';
    toggleButton.textContent = "Don't have an account? Sign up";
  } else {
    // Switch to signup
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    authTitle.textContent = 'Create Account';
    toggleButton.textContent = 'Already have an account? Sign in';
  }
}

// Handle login form submission
async function handleLogin(event) {
  event.preventDefault();
  console.log('🔐 Attempting login...');
  
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  // Show loading state
  submitButton.textContent = 'Signing in...';
  submitButton.disabled = true;
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    const result = await auth.signIn(email, password);
    if (result.success) {
      console.log('✅ Login successful');
      closeAuthModal();
      showSuccessMessage('Welcome back! You are now signed in.');
      // Refresh the page to show authenticated state
      setTimeout(() => window.location.reload(), 1000);
    }
  } catch (error) {
    console.error('❌ Login failed:', error);
    showErrorMessage('Login failed: ' + error.message);
  } finally {
    // Reset button state
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

// Handle signup form submission
async function handleSignup(event) {
  event.preventDefault();
  console.log('📝 Attempting signup...');
  
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  // Show loading state
  submitButton.textContent = 'Creating account...';
  submitButton.disabled = true;
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const company = document.getElementById('signupCompany').value;
  const password = document.getElementById('signupPassword').value;
  
  // Basic validation
  if (!name || !email || !password) {
    showErrorMessage('Please fill in all required fields');
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    return;
  }
  
  if (password.length < 6) {
    showErrorMessage('Password must be at least 6 characters long');
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    return;
  }
  
  try {
    const result = await auth.signUp(email, password, name, company);
    if (result.success) {
      console.log('✅ Signup successful');
      closeAuthModal();
      showSuccessMessage('Account created successfully! Welcome to TokenLaunchPro!');
      // Refresh the page to show authenticated state
      setTimeout(() => window.location.reload(), 1000);
    }
  } catch (error) {
    console.error('❌ Signup failed:', error);
    showErrorMessage('Signup failed: ' + error.message);
  } finally {
    // Reset button state
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

// Show success message
function showSuccessMessage(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-xl shadow-2xl z-50 max-w-md';
  notification.innerHTML = `
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium">${message}</p>
      </div>
      <button onclick="this.closest('.fixed').remove()" class="ml-4 text-white/70 hover:text-white">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
  
  // Log success for debugging
  console.log('✅ SUCCESS:', message);
}

// Show error message
function showErrorMessage(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-xl shadow-2xl z-50 max-w-md';
  notification.innerHTML = `
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium">${message}</p>
      </div>
      <button onclick="this.closest('.fixed').remove()" class="ml-4 text-white/70 hover:text-white">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
  
  // Log error for debugging
  console.error('❌ ERROR:', message);
}

// Add authentication status checker
function checkAuthStatus() {
  console.log('🔍 Checking authentication status...');
  console.log('Current user:', auth.getCurrentUser());
  console.log('Is authenticated:', auth.isUserAuthenticated());
  
  if (auth.isUserAuthenticated()) {
    console.log('✅ User is logged in');
    showAuthenticatedState();
  } else {
    console.log('❌ User is not logged in');
    showUnauthenticatedState();
  }
}

// Show authenticated state
function showAuthenticatedState() {
  const navButton = document.getElementById('navGetStartedButton');
  const heroButton = document.getElementById('heroGetStartedButton');
  
  if (navButton) {
    navButton.textContent = 'Dashboard';
    navButton.onclick = () => showSuccessMessage('Dashboard feature coming soon!');
  }
  
  if (heroButton) {
    heroButton.textContent = 'Go to Dashboard';
    heroButton.onclick = () => showSuccessMessage('Dashboard feature coming soon!');
  }
  
  console.log('✅ Updated UI for authenticated user');
}

// Show unauthenticated state
function showUnauthenticatedState() {
  const navButton = document.getElementById('navGetStartedButton');
  const heroButton = document.getElementById('heroGetStartedButton');
  
  if (navButton) {
    navButton.textContent = 'Get Started';
    navButton.onclick = showLogin;
  }
  
  if (heroButton) {
    heroButton.textContent = 'Launch Your Token';
    heroButton.onclick = showLogin;
  }
  
  console.log('✅ Updated UI for unauthenticated user');
}

// Start platform setup process
async function startPlatformSetup() {
  console.log('🚀 Starting TokenLaunchPro platform setup...');
  
  try {
    // Show setup progress
    showSetupProgress();
    
    // Run complete setup
    await platformSetup.initializeSetup();
    
    // Mark setup as complete
    localStorage.setItem('tokenlaunchpro_setup_complete', 'true');
    localStorage.setItem('tokenlaunchpro_setup_date', new Date().toISOString());
    
    console.log('✅ Platform setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Platform setup failed:', error);
    alert(`Setup failed: ${error.message}`);
  }
}

// Show welcome message for first-time users
function showWelcomeMessage() {
  const message = document.createElement('div');
  message.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-4 rounded-xl shadow-2xl z-50 max-w-md';
  message.innerHTML = `
    <div class="text-center">
      <h3 class="text-lg font-bold mb-2">🎉 Welcome to TokenLaunchPro!</h3>
      <p class="text-sm opacity-90 mb-3">Your professional token launch platform is ready to configure.</p>
      <button onclick="this.closest('.fixed').remove()" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
        Got it!
      </button>
    </div>
  `;
  
  document.body.appendChild(message);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (message.parentNode) {
      message.remove();
    }
  }, 5000);
}

// Show setup progress
function showSetupProgress() {
  const progress = document.createElement('div');
  progress.id = 'setup-progress';
  progress.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
  progress.innerHTML = `
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-purple-500/20">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </div>
        
        <h3 class="text-xl font-bold text-white mb-2">Setting Up Your Platform</h3>
        <p class="text-gray-300 mb-6">Configuring database, payments, marketing, and deployment...</p>
        
        <div class="space-y-3 text-left">
          <div class="flex items-center">
            <div class="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
            <span class="text-white">Database Connection</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
            <span class="text-white">Payment Processing</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-gray-500 rounded-full mr-3"></div>
            <span class="text-gray-400">Marketing Content</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-gray-500 rounded-full mr-3"></div>
            <span class="text-gray-400">Production Deployment</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(progress);
  
  // Remove progress after setup completes
  setTimeout(() => {
    const progressEl = document.getElementById('setup-progress');
    if (progressEl) {
      progressEl.remove();
    }
  }, 8000);
}

// Make functions globally available
window.startPlatformSetup = startPlatformSetup;
window.showLogin = showLogin;
window.closeAuthModal = closeAuthModal;
window.toggleAuthMode = toggleAuthMode;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.showProductionChecklist = () => productionChecklist.showChecklist();
window.showRoadmap = () => postDeploymentRoadmap.showRoadmap();
window.checkAuthStatus = checkAuthStatus;

// Initialize the application using top-level await
(async () => {
  await main();
})();

// Add form event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }
});