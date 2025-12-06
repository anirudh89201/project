import * as SecureStorage from "expo-secure-store";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signedIn, SetSignedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await SecureStorage.getItemAsync("authToken");
        if (storedToken) {
          setToken(storedToken);
          SetSignedIn(true);
        }
      } catch (error) {
        console.log("Error reading token:", error);
      } finally {
        SetLoading(false);
      }
    };

    checkToken();
  }, []);

  const signIn = async (newToken) => {
    await SecureStorage.setItemAsync("authToken", String(newToken));
    setToken(newToken);
    SetSignedIn(true);
  };

  const signOut = async () => {
    await SecureStorage.deleteItemAsync("authToken");
    setToken(null);
    SetSignedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ signedIn, signIn, signOut, token, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
