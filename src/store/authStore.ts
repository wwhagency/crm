import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/database';

interface AuthState {
  user: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  signUp: (email: string, password: string, profile: Partial<Profile>) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email, password, isAdmin = false) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Verify admin role if attempting admin login
    if (isAdmin) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Unauthorized admin access');
      }
    }
  },
  signUp: async (email, password, profile) => {
    const { error: signUpError, data } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: profile
      }
    });
    if (signUpError) throw signUpError;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ ...profile, id: data.user.id }]);
      if (profileError) throw profileError;
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
  loadUser: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      set({ user: profile, loading: false });
    } else {
      set({ user: null, loading: false });
    }
  }
}));