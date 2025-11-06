import { supabase } from './supabase.js';

export class Auth {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.listeners = [];
  }

  async init() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        this.currentUser = session.user;
        this.isAuthenticated = true;
        await this.ensureProfile(session.user);
      }
      
      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (session) {
          this.currentUser = session.user;
          this.isAuthenticated = true;
          await this.ensureProfile(session.user);
        } else {
          this.currentUser = null;
          this.isAuthenticated = false;
        }
        this.notifyListeners();
      });
      
      this.notifyListeners();
    } catch (error) {
      console.error('Auth initialization failed:', error);
    }
  }

  // Sign up new user
  async signUp(email, password, fullName, company = '') {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company: company
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        await this.createProfile(data.user, fullName, company);
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  }

  // Sign in existing user
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  }

  // Sign out user
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      this.currentUser = null;
      this.isAuthenticated = false;
      this.notifyListeners();
      
      return { success: true };
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  }

  // Get current session
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Get session failed:', error);
      return null;
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  // Create user profile
  async createProfile(user, fullName, company) {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email,
          full_name: fullName,
          company: company,
          subscription_plan: 'free'
        });

      if (error && error.code !== '23505') { // Ignore duplicate key error
        throw error;
      }
    } catch (error) {
      console.error('Profile creation failed:', error);
    }
  }

  // Ensure user profile exists
  async ensureProfile(user) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        await this.createProfile(user, user.user_metadata?.full_name || '', user.user_metadata?.company || '');
      }
    } catch (error) {
      console.error('Profile check failed:', error);
    }
  }

  // Get user profile
  async getUserProfile() {
    if (!this.currentUser) return null;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', this.currentUser.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get profile failed:', error);
      return null;
    }
  }

  // Update user profile
  async updateProfile(updates) {
    if (!this.currentUser) throw new Error('No authenticated user');

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', this.currentUser.id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  }

  // Add auth state listener
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove auth state listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notify all listeners of auth state changes
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback({
          user: this.currentUser,
          isAuthenticated: this.isAuthenticated
        });
      } catch (error) {
        console.error('Listener callback failed:', error);
      }
    });
  }

  // Reset password
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  }

  // Update password
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Password update failed:', error);
      throw error;
    }
  }
}

// Create and export auth instance with proper async initialization
export const auth = new Auth();

// Initialize auth asynchronously
(async () => {
  await auth.init();
})();

export default auth;