import { auth } from './auth.js';

(async () => {
  try {
    await auth.init();
    console.log('Auth initialized successfully');
    
    // Add event listeners for Get Started buttons
    document.addEventListener('DOMContentLoaded', () => {
      const navButton = document.getElementById('navGetStartedButton');
      const heroButton = document.getElementById('heroGetStartedButton');
      
      if (navButton) {
        navButton.addEventListener('click', showLogin);
      }
      
      if (heroButton) {
        heroButton.addEventListener('click', showLogin);
      }
    });
    
  } catch (error) {
    console.error('Failed to initialize auth:', error);
  }
})();

// Define showLogin function globally
function showLogin() {
  console.log('Get Started clicked - Login/Signup modal would open here');
  // TODO: Implement actual login/signup modal
  alert('Welcome to TokenLaunchPro! Login/Signup functionality coming soon.');
}