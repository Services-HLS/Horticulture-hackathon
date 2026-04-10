import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "state" | "district" | "farmer";

interface User {
  role: UserRole;
  name: string;
  district?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, login: () => false, logout: () => { } });

const roleUsers: Record<UserRole, User> = {
  state: { role: "state", name: "Dr. Rajesh Kumar", district: "All Districts" },
  district: { role: "district", name: "Sri. Venkata Rao", district: "Tirupati" },
  farmer: { role: "farmer", name: "Ramaiah", district: "Tirupati" },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("horticulture_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback((username: string, password: string) => {
    // Demo credentials matching logic
    if (password === "1234") {
      let loggedUser: User | null = null;
      if (username === "state_officer") loggedUser = roleUsers.state;
      if (username === "tirupati_officer") loggedUser = roleUsers.district;
      if (username === "farmer_tirupati") loggedUser = roleUsers.farmer;

      if (loggedUser) {
        setUser(loggedUser);
        localStorage.setItem("horticulture_user", JSON.stringify(loggedUser));
        return true;
      }
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("horticulture_user");
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
