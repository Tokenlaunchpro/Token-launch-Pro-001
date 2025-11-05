import { supabase } from './supabase.js';

export class EmailNotifications {
  constructor() {
    this.templates = {
      welcome: {
        subject: 'Welcome to TokenLaunchPro! 🚀',
        template: (data) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f8fafc; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #9333ea; font-size: 28px; margin: 0;">TokenLaunchPro</h1>
            </div>
            
            <div style="background: #1a1a1a; padding: 30px; border-radius: 12px; border: 1px solid #2a2a2a;">
              <h2 style="color: #22d3ee; margin-top: 0;">Welcome ${data.fullName}! 🎉</h2>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for joining TokenLaunchPro! You're now part of the most advanced platform for creating and launching cryptocurrency tokens.
              </p>
              
              <div style="background: #9333ea; background: linear-gradient(135deg, #9333ea 0%, #22d3ee 100%); padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: white;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: white;">
                  <li>Complete your profile setup</li>
                  <li>Choose your subscription plan</li>
                  <li>Start creating your first token</li>
                  <li>Access our comprehensive documentation</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${window.location.origin}" style="background: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Get Started Now
                </a>
              </div>
              
              <p style="font-size: 14px; color: #94a3b8; margin-bottom: 0;">
                Need help? Reply to this email or visit our <a href="${window.location.origin}#contact" style="color: #22d3ee;">support center</a>.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #64748b;">
              <p>© 2024 TokenLaunchPro. All rights reserved.</p>
            </div>
          </div>
        `
      },
      
      payment_success: {
        subject: 'Payment Successful - Welcome to {{planName}}! 💳',
        template: (data) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f8fafc; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #9333ea; font-size: 28px; margin: 0;">TokenLaunchPro</h1>
            </div>
            
            <div style="background: #1a1a1a; padding: 30px; border-radius: 12px; border: 1px solid #2a2a2a;">
              <h2 style="color: #22d3ee; margin-top: 0;">Payment Successful! ✅</h2>
              
              <p style="font-size: 16px; line-height: 1.6;">
                Hi ${data.fullName}, your payment has been processed successfully!
              </p>
              
              <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #9333ea; margin-top: 0;">Subscription Details</h3>
                <p><strong>Plan:</strong> ${data.planName}</p>
                <p><strong>Amount:</strong> $${(data.amount / 100).toFixed(2)}</p>
                <p><strong>Next Billing:</strong> ${data.nextBilling}</p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6;">
                You now have access to all ${data.planName} features. Start creating your tokens today!
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${window.location.origin}" style="background: linear-gradient(135deg, #9333ea 0%, #22d3ee 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Access Dashboard
                </a>
              </div>
            </div>
          </div>
        `
      },
      
      token_deployed: {
        subject: 'Token Deployed Successfully! 🪙',
        template: (data) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f8fafc; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #9333ea; font-size: 28px; margin: 0;">TokenLaunchPro</h1>
            </div>
            
            <div style="background: #1a1a1a; padding: 30px; border-radius: 12px; border: 1px solid #2a2a2a;">
              <h2 style="color: #22d3ee; margin-top: 0;">🎉 Token Deployed Successfully!</h2>
              
              <p style="font-size: 16px; line-height: 1.6;">
                Congratulations ${data.fullName}! Your token "${data.tokenName}" has been successfully deployed to the blockchain.
              </p>
              
              <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #9333ea; margin-top: 0;">Token Details</h3>
                <p><strong>Name:</strong> ${data.tokenName}</p>
                <p><strong>Symbol:</strong> ${data.tokenSymbol}</p>
                <p><strong>Total Supply:</strong> ${data.totalSupply.toLocaleString()}</p>
                <p><strong>Network:</strong> ${data.network}</p>
                <p><strong>Contract Address:</strong> <code style="background: #0a0a0a; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${data.contractAddress}</code></p>
              </div>
              
              <div style="background: linear-gradient(135deg, #9333ea 0%, #22d3ee 100%); padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: white;">Next Steps</h3>
                <ul style="margin: 0; padding-left: 20px; color: white;">
                  <li>Security audit is now in progress</li>
                  <li>Set up your marketing campaigns</li>
                  <li>Configure token distribution</li>
                  <li>Monitor analytics and performance</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${window.location.origin}" style="background: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  View Token Dashboard
                </a>
              </div>
            </div>
          </div>
        `
      },
      
      audit_complete: {
        subject: 'Security Audit Complete - {{tokenName}} ✅',
        template: (data) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f8fafc; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #9333ea; font-size: 28px; margin: 0;">TokenLaunchPro</h1>
            </div>
            
            <div style="background: #1a1a1a; padding: 30px; border-radius: 12px; border: 1px solid #2a2a2a;">
              <h2 style="color: #22d3ee; margin-top: 0;">🔒 Security Audit Complete</h2>
              
              <p style="font-size: 16px; line-height: 1.6;">
                Great news ${data.fullName}! The security audit for "${data.tokenName}" has been completed.
              </p>
              
              <div style="background: ${data.auditScore >= 90 ? '#059669' : data.auditScore >= 70 ? '#d97706' : '#dc2626'}; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: white;">Audit Results</h3>
                <p style="margin: 0; color: white; font-size: 18px;"><strong>Security Score: ${data.auditScore}/100</strong></p>
                <p style="margin: 5px 0 0 0; color: white;">Vulnerabilities Found: ${data.vulnerabilities}</p>
              </div>
              
              ${data.recommendations && data.recommendations.length > 0 ? `
                <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #9333ea; margin-top: 0;">Recommendations</h3>
                  <ul style="margin: 0; padding-left: 20px;">
                    ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${window.location.origin}" style="background: linear-gradient(135deg, #9333ea 0%, #22d3ee 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  View Full Report
                </a>
              </div>
            </div>
          </div>
        `
      }
    };
  }

  // Queue email notification
  async queueEmail(emailType, recipientEmail, data) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const template = this.templates[emailType];
      if (!template) throw new Error('Invalid email template');

      const subject = template.subject.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key] || match);
      const content = template.template(data);

      const { error } = await supabase
        .from('email_notifications')
        .insert({
          user_id: user?.id,
          email_type: emailType,
          recipient_email: recipientEmail,
          subject,
          content,
          status: 'pending'
        });

      if (error) throw error;

      // In production, trigger actual email sending
      await this.sendQueuedEmails();

      return { success: true };
    } catch (error) {
      console.error('Email queueing failed:', error);
      throw error;
    }
  }

  // Send welcome email
  async sendWelcomeEmail(userEmail, fullName) {
    return this.queueEmail('welcome', userEmail, { fullName });
  }

  // Send payment success email
  async sendPaymentSuccessEmail(userEmail, fullName, planName, amount, nextBilling) {
    return this.queueEmail('payment_success', userEmail, {
      fullName,
      planName,
      amount,
      nextBilling
    });
  }

  // Send token deployed email
  async sendTokenDeployedEmail(userEmail, fullName, tokenData) {
    return this.queueEmail('token_deployed', userEmail, {
      fullName,
      ...tokenData
    });
  }

  // Send audit complete email
  async sendAuditCompleteEmail(userEmail, fullName, auditData) {
    return this.queueEmail('audit_complete', userEmail, {
      fullName,
      ...auditData
    });
  }

  // Process queued emails (in production, this would be a background job)
  async sendQueuedEmails() {
    try {
      const { data: pendingEmails, error } = await supabase
        .from('email_notifications')
        .select('*')
        .eq('status', 'pending')
        .limit(10);

      if (error) throw error;

      for (const email of pendingEmails || []) {
        try {
          // In production, integrate with email service (SendGrid, AWS SES, etc.)
          console.log('Sending email:', {
            to: email.recipient_email,
            subject: email.subject,
            html: email.content
          });

          // Simulate email sending
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Update status to sent
          await supabase
            .from('email_notifications')
            .update({
              status: 'sent',
              sent_at: new Date().toISOString()
            })
            .eq('id', email.id);

        } catch (emailError) {
          console.error('Failed to send email:', emailError);
          
          // Update status to failed
          await supabase
            .from('email_notifications')
            .update({ status: 'failed' })
            .eq('id', email.id);
        }
      }
    } catch (error) {
      console.error('Email processing failed:', error);
    }
  }

  // Get email history for user
  async getEmailHistory() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('email_notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}