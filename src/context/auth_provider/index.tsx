import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: string | null; // Replace with a user object type if necessary
  login: (username: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Authentication provider to handle all the auth call
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [user] = useState<null>(null);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Login function
  const login = async (data: any) => {
    console.log(data);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
