import { auth } from './auth.js';

// Use IIAFE to handle async initialization at module entry point
(async () => {
  try {
    await auth.init();
    console.log('Auth initialized successfully');
  } catch (error) {
    console.error('Failed to initialize auth:', error);
  }
})();