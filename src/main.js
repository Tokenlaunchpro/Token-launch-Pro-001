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

// ✅ FIXED: no top-level await
main()
  .then(() => console.log('✅ TokenLaunchPro initialized successfully!'))
  .catch(console.error);