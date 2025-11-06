// Main initialization function
async function main() {
  try {
    await auth.init();
    console.log('Auth initialized successfully');
  } catch (error) {
    console.error('Failed to initialize auth:', error);
  }

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
}

// Define showLogin function globally
function showLogin() {
  console.log('Get Started clicked - Login/Signup modal would open here');
  // TODO: Implement actual login/signup modal
  alert('Welcome to TokenLaunchPro! Login/Signup functionality coming soon.');
}

// Initialize the application
main();