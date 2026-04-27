'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface UserState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

export function useUser(): UserState {
  const supabase = createClient()
  const [userState, setUserState] = useState<UserState>({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user ?? null;
      // @ts-ignore - 'app_metadata' is a valid property on Supabase user objects, assuming you've set it up with triggers/functions
      const userRole = user?.app_metadata?.claims?.role || user?.user_metadata?.role || 'user';
      const isAdmin = userRole === 'admin';
      
      setUserState({ user, isAdmin, loading: false });
    });

    // Also fetch initial session to avoid flicker
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;
      // @ts-ignore
      const userRole = user?.app_metadata?.claims?.role || user?.user_metadata?.role || 'user';
      const isAdmin = userRole === 'admin';
      setUserState({ user, isAdmin, loading: false });
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userState;
}
