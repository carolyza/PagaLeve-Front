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
const LOCAL_STORAGE_ID = "pagaleve-id";
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);
const persistedId = localStorage.getItem(LOCAL_STORAGE_ID);

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(persistedToken);
  const [userId, setUserId] = useState<string | null>(persistedId);

  function signIn(loginData: any) {
    setToken(loginData.token);
    setUserId(loginData.data._id);

    localStorage.setItem(LOCAL_STORAGE_KEY, loginData.token);
    localStorage.setItem(LOCAL_STORAGE_ID, loginData.data._id);
  }

  function signOut() {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ID);
  }

  return (
    <AuthContext.Provider value={{ token, userId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
