/*
  # Complete TokenLaunchPro Database Schema

  1. New Tables
    - `subscriptions` - Customer subscription management
    - `payments` - Payment history and transactions
    - `deployed_tokens` - Real deployed token contracts
    - `email_notifications` - Email notification queue
    - `audit_reports` - Security audit results
    - `marketing_campaigns` - Marketing automation

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
    - Secure payment and token data

  3. Features
    - Payment processing integration
    - Blockchain token deployment tracking
    - Email notification system
    - Advanced analytics and reporting
*/

-- Subscriptions table for payment processing
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_type text NOT NULL CHECK (plan_type IN ('starter', 'professional', 'enterprise')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payments table for transaction history
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE CASCADE,
  stripe_payment_intent_id text,
  amount integer NOT NULL,
  currency text DEFAULT 'usd',
  status text NOT NULL CHECK (status IN ('succeeded', 'pending', 'failed')),
  description text,
  created_at timestamptz DEFAULT now()
);

-- Deployed tokens table for blockchain integration
CREATE TABLE IF NOT EXISTS deployed_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  token_name text NOT NULL,
  token_symbol text NOT NULL,
  total_supply bigint NOT NULL,
  contract_address text,
  blockchain_network text NOT NULL DEFAULT 'ethereum',
  deployment_status text NOT NULL DEFAULT 'pending' CHECK (deployment_status IN ('pending', 'deploying', 'deployed', 'failed')),
  deployment_tx_hash text,
  gas_used bigint,
  deployment_cost numeric(18, 8),
  audit_status text DEFAULT 'pending' CHECK (audit_status IN ('pending', 'in_progress', 'completed', 'failed')),
  audit_score integer CHECK (audit_score >= 0 AND audit_score <= 100),
  created_at timestamptz DEFAULT now(),
  deployed_at timestamptz
);

-- Email notifications queue
CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email_type text NOT NULL CHECK (email_type IN ('welcome', 'payment_success', 'token_deployed', 'audit_complete')),
  recipient_email text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Security audit reports
CREATE TABLE IF NOT EXISTS audit_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_id uuid REFERENCES deployed_tokens(id) ON DELETE CASCADE,
  audit_type text NOT NULL CHECK (audit_type IN ('standard', 'premium', 'enterprise')),
  vulnerabilities_found integer DEFAULT 0,
  security_score integer CHECK (security_score >= 0 AND security_score <= 100),
  report_data jsonb,
  recommendations text[],
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Marketing campaigns for automation
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  token_id uuid REFERENCES deployed_tokens(id) ON DELETE CASCADE,
  campaign_name text NOT NULL,
  campaign_type text NOT NULL CHECK (campaign_type IN ('social_media', 'email', 'influencer', 'press_release')),
  target_audience jsonb,
  budget numeric(10, 2),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  metrics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  launched_at timestamptz
);

-- Enable RLS on all tables
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployed_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for deployed_tokens
CREATE POLICY "Users can read own tokens"
  ON deployed_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens"
  ON deployed_tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens"
  ON deployed_tokens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for email_notifications
CREATE POLICY "Users can read own notifications"
  ON email_notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for audit_reports
CREATE POLICY "Users can read own audit reports"
  ON audit_reports
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM deployed_tokens 
    WHERE deployed_tokens.id = audit_reports.token_id 
    AND deployed_tokens.user_id = auth.uid()
  ));

-- RLS Policies for marketing_campaigns
CREATE POLICY "Users can manage own campaigns"
  ON marketing_campaigns
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_deployed_tokens_user_id ON deployed_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_deployed_tokens_status ON deployed_tokens(deployment_status);
CREATE INDEX IF NOT EXISTS idx_email_notifications_status ON email_notifications(status);
CREATE INDEX IF NOT EXISTS idx_audit_reports_token_id ON audit_reports(token_id);
CREATE INDEX IF NOT EXISTS idx_marketing_campaigns_user_id ON marketing_campaigns(user_id);