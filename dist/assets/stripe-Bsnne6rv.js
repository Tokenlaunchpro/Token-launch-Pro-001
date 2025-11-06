import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase.js';

// Initialize Stripe (you'll need to add your publishable key to .env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

export class StripePayments {
  constructor() {
    this.stripe = null;
    this.init();
  }

  async init() {
    this.stripe = await stripePromise;
  }

  // Create subscription for user
  async createSubscription(planType, userEmail) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Plan pricing
      const plans = {
        starter: { price: 9900, name: 'Starter Plan' }, // $99.00
        professional: { price: 29900, name: 'Professional Plan' }, // $299.00
        enterprise: { price: 99900, name: 'Enterprise Plan' } // $999.00
      };

      const plan = plans[planType];
      if (!plan) throw new Error('Invalid plan type');

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          amount: plan.price,
          currency: 'usd',
          planType,
          userEmail
        })
      });

      const { clientSecret, subscriptionId } = await response.json();

      // Confirm payment with Stripe
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret);

      if (error) {
        throw new Error(error.message);
      }

      // Save subscription to database
      await this.saveSubscription(user.id, subscriptionId, planType, paymentIntent);

      return { success: true, subscriptionId };
    } catch (error) {
      console.error('Subscription creation failed:', error);
      throw error;
    }
  }

  // Save subscription to Supabase
  async saveSubscription(userId, stripeSubscriptionId, planType, paymentIntent) {
    const { error: subError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        stripe_subscription_id: stripeSubscriptionId,
        plan_type: planType,
        status: 'active',
        current_period_start: new Date(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      });

    if (subError) throw subError;

    // Save payment record
    const { error: payError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        stripe_payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        description: `${planType} plan subscription`
      });

    if (payError) throw payError;
  }

  // Get user's current subscription
  async getUserSubscription() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // Get payment history
  async getPaymentHistory() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Cancel subscription
  async cancelSubscription() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('subscriptions')
      .update({ status: 'canceled' })
      .eq('user_id', user.id)
      .eq('status', 'active');

    if (error) throw error;
    return { success: true };
  }
}