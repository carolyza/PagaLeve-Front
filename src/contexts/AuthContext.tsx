import { createContext, useState } from "react";

interface IAuthContext {
  token: string | null;
  userId: any | null;
  signIn: (token: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = "pagaleve-token";
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(persistedToken);
  const [userId, setUserId] = useState<number | null>();

  function signIn(data: any) {
    setToken(data.token);
    setUserId(data.id);
    localStorage.setItem(LOCAL_STORAGE_KEY, data.token);
  }

  function signOut() {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ token, userId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
