  document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById('navGetStartedButton');
    // Show setup wizard on first visit
    const hasSeenSetup = localStorage.getItem('tokenlaunchpro-setup-complete');
    if (!hasSeenSetup) {
      setTimeout(() => {
        setupWizard.init();
      }, 2000); // Show after 2 seconds
    }
    
    const heroButton = document.getElementById('heroGetStartedButton');
    
    if (navButton) {
      navButton.addEventListener('click', showLogin);
      const setupButton = document.getElementById('setupButton');
    }
    
    if (heroButton) {
      heroButton.addEventListener('click', showLogin);
    }
  });

try {
      
      if (setupButton) {
        setupButton.addEventListener('click', () => {
          setupWizard.init();
        });
      }
  await auth.init();
  console.log('Auth initialized successfully');
} catch (error) {
  console.error('Failed to initialize auth:', error);
}

// Define showLogin function globally
function showLogin() {
import { setupWizard } from './setup-wizard.js';
  // Show setup wizard first if not completed
  const hasSeenSetup = localStorage.getItem('tokenlaunchpro-setup-complete');
  if (!hasSeenSetup) {
    setupWizard.init();
  } else {
    console.log('Get Started clicked - Login/Signup modal would open here');
    // TODO: Implement actual login/signup modal
    alert('Welcome to TokenLaunchPro! Login/Signup functionality coming soon.');
  }
  // Add event listeners for Get Started buttons
}