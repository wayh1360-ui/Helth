import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export interface AuthUserInfo {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'admin' | 'user';
  isAdmin: boolean;
}

export { useAuth } from '../hooks/useAuth';

// Built-in default admin emails (can be extended via VITE_ADMIN_EMAILS in .env)
const DEFAULT_ADMIN_EMAILS = [
  'wayh1360@gmail.com',
];

/**
 * Get all configured admin emails (from env or defaults)
 */
export function getAdminEmails(): string[] {
  const envAdmins = import.meta.env.VITE_ADMIN_EMAILS
    ? String(import.meta.env.VITE_ADMIN_EMAILS)
        .split(',')
        .map((e: string) => e.trim().toLowerCase())
        .filter(Boolean)
    : [];
  
  const set = new Set([...DEFAULT_ADMIN_EMAILS.map(e => e.toLowerCase()), ...envAdmins]);
  return Array.from(set);
}

/**
 * Check if a given email belongs to the Admin list
 */
export function isEmailAdmin(email?: string | null): boolean {
  if (!email) return false;
  const adminList = getAdminEmails();
  return adminList.includes(email.trim().toLowerCase());
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

// In-memory cache for fast synchronous checks
let cachedUser: User | null = null;
let cachedSession: Session | null = null;

// Initialize cached user from supabase session
supabase.auth.getSession().then(({ data: { session } }) => {
  cachedSession = session;
  cachedUser = session?.user ?? null;
});

// Keep cache updated with onAuthStateChange
supabase.auth.onAuthStateChange((_event, session) => {
  cachedSession = session;
  cachedUser = session?.user ?? null;
});

export function extractUserInfo(user: User | null): AuthUserInfo | null {
  if (!user) return null;
  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'User';
  const avatarUrl =
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    undefined;

  const email = user.email || '';
  const isAdmin = isEmailAdmin(email);

  return {
    id: user.id,
    email,
    name,
    avatarUrl,
    role: isAdmin ? 'admin' : 'user',
    isAdmin
  };
}

export function getCurrentUser(): User | null {
  return cachedUser;
}

export function getCurrentUserInfo(): AuthUserInfo | null {
  return extractUserInfo(cachedUser);
}

export function isAuthenticated(): boolean {
  return !!cachedUser;
}

/**
 * Trigger Supabase OAuth Sign In with Google Gmail
 */
export async function signInWithGoogle(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  } catch (err: any) {
    return { error: err?.message || 'Failed to sign in with Google' };
  }
}

/**
 * Sign out current authenticated user
 */
export async function signOutUser(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    cachedUser = null;
    cachedSession = null;
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  } catch (err: any) {
    return { error: err?.message || 'Failed to sign out' };
  }
}

/**
 * Subscribe to Supabase Auth changes
 */
export function subscribeAuth(
  callback: (user: User | null, info: AuthUserInfo | null) => void
): () => void {
  // Fire immediately with cached state
  callback(cachedUser, extractUserInfo(cachedUser));

  // Also query session to ensure fresh state
  supabase.auth.getSession().then(({ data: { session } }) => {
    cachedSession = session;
    cachedUser = session?.user ?? null;
    callback(cachedUser, extractUserInfo(cachedUser));
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    cachedSession = session;
    cachedUser = session?.user ?? null;
    callback(cachedUser, extractUserInfo(cachedUser));
  });

  return () => {
    subscription.unsubscribe();
  };
}

/**
 * React hook to listen for real-time Supabase Auth state changes
 */
export function useSupabaseUser() {
  const [authState, setAuthState] = useState<AuthState>({
    user: cachedUser,
    session: cachedSession,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!mounted) return;
      if (error) {
        setAuthState({ user: null, session: null, loading: false, error: error.message });
      } else {
        cachedSession = session;
        cachedUser = session?.user ?? null;
        setAuthState({ user: session?.user ?? null, session, loading: false, error: null });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      cachedSession = session;
      cachedUser = session?.user ?? null;
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
        error: null
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const userInfo = extractUserInfo(authState.user);

  return {
    ...authState,
    userInfo,
    userName: userInfo?.name || null,
    userAvatar: userInfo?.avatarUrl || null,
    userEmail: userInfo?.email || null,
    isAdmin: !!userInfo?.isAdmin,
    role: userInfo?.role || 'user',
    signInWithGoogle,
    signOut: signOutUser
  };
}
