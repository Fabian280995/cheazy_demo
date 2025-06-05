import { Session, User } from "@supabase/supabase-js";
import { router, SplashScreen } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

SplashScreen.preventAutoHideAsync();

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  isAuthenticated?: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  initialized: false,
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async (_event: any, session: any) => {
        setSession(session);
        setUser(session ? session.user : null);
        setInitialized(true);
      }
    );
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;

    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);
  }, [initialized, session]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        initialized,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
