import { auth } from './auth.js';

try {
  await auth.init();
  console.log('Auth initialized successfully');
} catch (error) {
  console.error('Failed to initialize auth:', error);
}