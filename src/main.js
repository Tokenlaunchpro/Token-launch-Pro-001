import { auth } from './auth.js';

// Initialize auth before starting the application
async function initializeApp() {
  try {
    await auth.init();
    console.log('Auth initialized successfully');
  } catch (error) {
    console.error('Failed to initialize auth:', error);
  }
}

// Start the application
initializeApp();