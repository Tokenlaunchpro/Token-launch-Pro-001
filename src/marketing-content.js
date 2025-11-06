export class MarketingContent {
  constructor() {
    this.content = {
      landingPage: {
        hero: {
          title: 'Launch Your Token Like a Pro',
          subtitle: 'The most advanced platform for creating, deploying, and marketing cryptocurrency tokens with AI-powered automation',
          features: [
            'Deploy in minutes, not months',
            'Multi-chain support (ETH, BSC, Polygon)',
            'Built-in security audits',
            'Automated marketing campaigns'
          ]
        },
        
        valueProposition: {
          title: 'Why Choose TokenLaunchPro?',
          subtitle: 'Join 1,000+ successful token launches with our professional-grade platform',
          benefits: [
            {
              icon: '🚀',
              title: 'Lightning Fast Deployment',
              description: 'Launch your token in under 10 minutes with our AI-powered smart contract generator'
            },
            {
              icon: '🔒',
              title: 'Enterprise Security',
              description: 'Automated security audits and compliance tools ensure your token meets industry standards'
            },
            {
              icon: '📈',
              title: 'Marketing Automation',
              description: 'Built-in social media campaigns, influencer outreach, and community building tools'
            },
            {
              icon: '💰',
              title: 'Revenue Optimization',
              description: 'Advanced tokenomics modeling and yield farming integration for maximum ROI'
            }
          ]
        },

        socialProof: {
          title: 'Trusted by Industry Leaders',
          stats: [
            { number: '1,247', label: 'Tokens Launched' },
            { number: '98.5%', label: 'Success Rate' },
            { number: '$2.5B+', label: 'Total Value Locked' },
            { number: '25,847', label: 'Active Users' }
          ],
          testimonials: [
            {
              name: 'Sarah Chen',
              role: 'CEO, DeFi Innovations',
              quote: 'TokenLaunchPro made our token launch seamless. The automated marketing tools alone saved us months of work.',
              avatar: '👩‍💼'
            },
            {
              name: 'Marcus Rodriguez',
              role: 'Founder, CryptoVentures',
              quote: 'The security audits and compliance features gave our investors complete confidence. Highly recommended!',
              avatar: '👨‍💻'
            },
            {
              name: 'Emily Watson',
              role: 'CTO, BlockchainCorp',
              quote: 'From concept to mainnet in 48 hours. The AI-powered smart contract generation is revolutionary.',
              avatar: '👩‍🔬'
            }
          ]
        }
      },

      emailCampaigns: {
        welcome: {
          subject: 'Welcome to TokenLaunchPro - Your Token Launch Journey Starts Now! 🚀',
          content: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f8fafc; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #9333ea; font-size: 28px; margin: 0;">TokenLaunchPro</h1>
                <p style="color: #22d3ee; font-size: 16px;">The Professional Token Launch Platform</p>
              </div>
              
              <div style="background: #1a1a1a; padding: 30px; border-radius: 12px; border: 1px solid #2a2a2a;">
                <h2 style="color: #22d3ee; margin-top: 0;">Welcome to the Future of Token Launches! 🎉</h2>
                
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  You've just joined the most advanced token launch platform in the industry. Here's what you can do right now:
                </p>
                
                <div style="background: #9333ea; background: linear-gradient(135deg, #9333ea 0%, #22d3ee 100%); padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin: 0 0 15px 0; color: white;">🚀 Quick Start Guide</h3>
                  <ul style="margin: 0; padding-left: 20px; color: white;">
                    <li style="margin-bottom: 8px;">Complete your profile setup</li>
                    <li style="margin-bottom: 8px;">Choose your subscription plan</li>
                    <li style="margin-bottom: 8px;">Create your first token in minutes</li>
                    <li style="margin-bottom: 8px;">Launch automated marketing campaigns</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="#" style="background: #9333ea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Start Your Token Launch →
                  </a>
                </div>
                
                <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h4 style="color: #9333ea; margin-top: 0;">💎 What Makes Us Different?</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #e2e8f0;">
                    <li>AI-powered smart contract generation</li>
                    <li>Multi-chain deployment (ETH, BSC, Polygon)</li>
                    <li>Automated security audits</li>
                    <li>Built-in marketing automation</li>
                    <li>24/7 expert support</li>
                  </ul>
                </div>
                
                <p style="font-size: 14px; color: #94a3b8; margin-bottom: 0; text-align: center;">
                  Questions? Reply to this email or visit our <a href="#" style="color: #22d3ee;">support center</a>.
                </p>
              </div>
            </div>
          `
        },

        onboarding: {
          subject: 'Ready to Launch? Your Step-by-Step Token Creation Guide 📋',
          content: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f8fafc; padding: 20px;">
              <h2 style="color: #22d3ee;">Your Token Launch Roadmap 🗺️</h2>
              
              <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #9333ea;">Step 1: Define Your Token</h3>
                <p>Choose your token name, symbol, and total supply. Our AI will suggest optimal tokenomics.</p>
              </div>
              
              <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #9333ea;">Step 2: Select Blockchain</h3>
                <p>Deploy on Ethereum for maximum reach, BSC for low fees, or Polygon for fast transactions.</p>
              </div>
              
              <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #9333ea;">Step 3: Security Audit</h3>
                <p>Our automated tools scan for vulnerabilities and ensure compliance with industry standards.</p>
              </div>
              
              <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #9333ea;">Step 4: Launch & Market</h3>
                <p>Deploy your token and activate our marketing automation for maximum visibility.</p>
              </div>
            </div>
          `
        }
      },

      socialMedia: {
        twitter: [
          {
            text: '🚀 Just launched my token in 5 minutes with @TokenLaunchPro! The AI-powered platform handles everything from smart contracts to marketing. This is the future of DeFi! #TokenLaunch #DeFi #Crypto',
            hashtags: ['TokenLaunch', 'DeFi', 'Crypto', 'AI', 'Blockchain']
          },
          {
            text: '💎 Why spend months on token development when you can launch professionally in minutes? TokenLaunchPro = Smart contracts + Security audits + Marketing automation. All in one platform! 🔥',
            hashtags: ['CryptoLaunch', 'SmartContracts', 'DeFi']
          },
          {
            text: '🔒 Security first! TokenLaunchPro automatically audits your smart contracts and ensures compliance. No more worrying about vulnerabilities. Launch with confidence! ✅',
            hashtags: ['CryptoSecurity', 'SmartContractAudit', 'DeFiSafety']
          }
        ],

        linkedin: [
          {
            title: 'The Evolution of Token Launches: From Months to Minutes',
            content: 'The cryptocurrency industry is rapidly evolving, and so are the tools we use to build it. TokenLaunchPro represents the next generation of token creation platforms, combining AI-powered smart contract generation with enterprise-grade security and automated marketing tools. What used to take development teams months can now be accomplished by anyone in minutes, without compromising on quality or security.'
          },
          {
            title: 'Why Enterprise Clients Choose TokenLaunchPro for Token Launches',
            content: 'Enterprise clients require more than just basic token creation - they need comprehensive solutions that include compliance, security audits, marketing automation, and ongoing support. TokenLaunchPro delivers all of this through a single platform, making it the preferred choice for Fortune 500 companies entering the DeFi space.'
          }
        ],

        instagram: [
          {
            caption: '🚀 From idea to launch in minutes! TokenLaunchPro makes professional token creation accessible to everyone. Swipe to see the magic happen ✨ #TokenLaunch #DeFi #Crypto #Innovation',
            hashtags: ['TokenLaunch', 'DeFi', 'Crypto', 'Innovation', 'Blockchain', 'AI']
          }
        ]
      },

      pressReleases: [
        {
          title: 'TokenLaunchPro Revolutionizes Cryptocurrency Token Creation with AI-Powered Platform',
          subtitle: 'New platform reduces token launch time from months to minutes while maintaining enterprise-grade security',
          content: `
            TokenLaunchPro, the industry's most advanced token creation platform, today announced the launch of its revolutionary AI-powered token generation system. The platform enables businesses and entrepreneurs to create, deploy, and market cryptocurrency tokens in minutes rather than months, while maintaining the highest standards of security and compliance.

            "We're democratizing access to professional token creation," said the TokenLaunchPro team. "What previously required months of development work and significant technical expertise can now be accomplished by anyone with an idea and a few minutes of time."

            Key features of the TokenLaunchPro platform include:
            - AI-powered smart contract generation
            - Multi-chain deployment (Ethereum, BSC, Polygon)
            - Automated security audits and compliance checking
            - Built-in marketing automation tools
            - 24/7 expert support

            The platform has already facilitated over 1,247 successful token launches with a 98.5% success rate, representing over $2.5 billion in total value locked.
          `
        }
      ],

      contentMarketing: {
        blogPosts: [
          {
            title: 'The Complete Guide to Token Launches in 2024',
            excerpt: 'Everything you need to know about creating, deploying, and marketing cryptocurrency tokens in the modern DeFi landscape.',
            content: 'Full blog post content would go here...'
          },
          {
            title: 'Smart Contract Security: Best Practices for Token Creators',
            excerpt: 'Learn how to protect your token and investors with proper security measures and automated auditing tools.',
            content: 'Full blog post content would go here...'
          },
          {
            title: 'Multi-Chain Strategy: Choosing the Right Blockchain for Your Token',
            excerpt: 'Compare Ethereum, BSC, Polygon, and other networks to find the perfect fit for your project.',
            content: 'Full blog post content would go here...'
          }
        ],

        whitepapers: [
          {
            title: 'The Future of Token Creation: AI-Powered Smart Contract Generation',
            description: 'A comprehensive analysis of how artificial intelligence is transforming the token creation process.',
            pages: 24
          }
        ]
      }
    };
  }

  // Get marketing content by type
  getContent(type, subtype = null) {
    if (subtype) {
      return this.content[type]?.[subtype];
    }
    return this.content[type];
  }

  // Generate social media post
  generateSocialPost(platform, topic = 'general') {
    const posts = this.content.socialMedia[platform];
    if (!posts || posts.length === 0) return null;

    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    return randomPost;
  }

  // Create email campaign
  createEmailCampaign(type, personalData = {}) {
    const template = this.content.emailCampaigns[type];
    if (!template) return null;

    let content = template.content;
    
    // Replace placeholders with personal data
    Object.entries(personalData).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(placeholder, value);
    });

    return {
      subject: template.subject,
      content: content
    };
  }

  // Get landing page content
  getLandingPageContent() {
    return this.content.landingPage;
  }

  // Generate press release
  generatePressRelease(companyData = {}) {
    const template = this.content.pressReleases[0];
    let content = template.content;

    // Replace placeholders
    Object.entries(companyData).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(placeholder, value);
    });

    return {
      title: template.title,
      subtitle: template.subtitle,
      content: content
    };
  }
}

// Initialize marketing content
export const marketingContent = new MarketingContent();