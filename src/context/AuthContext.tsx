import { createContext, useContext, ReactNode, useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type {
  SignUpWithPasswordCredentials,
  SignInWithPasswordCredentials,
  AuthTokenResponsePassword,
  Session,
  AuthResponse,
} from '@supabase/supabase-js';

function fetchSession() {
  return supabase.auth.getSession().then(({ data, error }) => {
    // error : supabase 오류 / 인증 없으면  data.session = null
    if (error) throw new Error('supabase error');
    return data.session;
  });
}

type AuthContextType = {
  session: Session | null;
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<AuthTokenResponsePassword['data']>;
  signOut: () => Promise<void>;
  signUp: (credentials: SignInWithPasswordCredentials) => Promise<AuthResponse['data']>;
};

const sessionPromise = fetchSession();

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(use(sessionPromise));

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (credentials: SignInWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const signUp = async (credentials: SignUpWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signUp(credentials);
    if (error) throw error;
    return data;
  };

  const value = { session, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => <AuthProvider>{children}</AuthProvider>;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthContextProvider 내부에서만 사용되야 합니다!');
  }
  return context;
};
