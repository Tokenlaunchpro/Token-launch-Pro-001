-- TokenLaunchPro Production RLS Policies
-- Review these policies before going live

-- Users table policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Subscriptions table policies
CREATE POLICY "Users can read own subscriptions" ON subscriptions
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Deployed tokens table policies
CREATE POLICY "Users can read own tokens" ON deployed_tokens
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens" ON deployed_tokens
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens" ON deployed_tokens
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Payments table policies
CREATE POLICY "Users can read own payments" ON payments
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments" ON payments
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Audit reports table policies
CREATE POLICY "Users can read own audit reports" ON audit_reports
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM deployed_tokens 
    WHERE deployed_tokens.id = audit_reports.token_id 
    AND deployed_tokens.user_id = auth.uid()
  ));

-- Marketing campaigns table policies
CREATE POLICY "Users can manage own campaigns" ON marketing_campaigns
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Email notifications table policies
CREATE POLICY "Users can read own notifications" ON email_notifications
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- SECURITY NOTES FOR PRODUCTION:
-- 1. All policies use auth.uid() to ensure users only access their own data
-- 2. No public access is allowed - all operations require authentication
-- 3. Audit reports use a subquery to ensure users only see reports for their tokens
-- 4. Marketing campaigns allow full CRUD operations for owners
-- 5. Email notifications are read-only for users (system manages writes)