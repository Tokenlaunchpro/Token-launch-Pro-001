import { auth } from './auth.js';
import { platformSetup } from './platform-setup.js';
import { marketingContent } from './marketing-content.js';
import { productionChecklist } from './production-checklist.js';
import { postDeploymentRoadmap } from './post-deployment-roadmap.js';

// Define showLogin function and make it globally accessible
function showLogin() {
  // Basic login interface logic
  const loginHtml = `
    <div id="login-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 400px; width: 90%;">
        <h2>Login to TokenLaunchPro</h2>
        <form id="login-form">
          <div style="margin-bottom: 1rem;">
            <label for="email">Email:</label>
            <input type="email" id="email" required style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
          </div>
          <div style="margin-bottom: 1rem;">
            <label for="password">Password:</label>
            <input type="password" id="password" required style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
          </div>
          <div style="display: flex; gap: 1rem;">
            <button type="submit" style="flex: 1; padding: 0.5rem; background: #007bff; color: white; border: none; border-radius: 4px;">Login</button>
            <button type="button" onclick="closeLogin()" style="flex: 1; padding: 0.5rem; background: #6c757d; color: white; border: none; border-radius: 4px;">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', loginHtml);
  
  // Handle form submission
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      await auth.signIn(email, password);
      closeLogin();
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + error.message);
    }
  });
}

// Define closeLogin function and make it globally accessible
function closeLogin() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.remove();
  }
}

// Make functions globally accessible
window.showLogin = showLogin;
window.closeLogin = closeLogin;

// Main initialization function
async function main() {
  try {
    await auth.init();
    console.log('Auth initialized successfully');
    
    console.log('🚀 TokenLaunchPro Platform Starting...');
    
    const isFirstRun = !localStorage.getItem('tokenlaunchpro_setup_complete');
    
    if (isFirstRun) {
      console.log('🎯 First run detected - starting setup process...');
      showWelcomeMessage();

      setTimeout(() => {
        if (confirm('🚀 Ready to set up your TokenLaunchPro platform? This will configure database, payments, marketing, and deployment.')) {
          startPlatformSetup();
        }
      }, 2000);
    } else {
      console.log('Platform already configured.');
    }

  } catch (err) {
    console.error('Initialization failed:', err);
  }
}

// ✅ FIXED: Wrap in IIAFE to resolve await syntax error
(async () => {
  try {
    await main();
    console.log('✅ TokenLaunchPro initialized successfully!');
  } catch (error) {
    console.error('TokenLaunchPro initialization failed:', error);
  }
})();