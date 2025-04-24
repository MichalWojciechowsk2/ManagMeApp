"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types/user";
import UserService from "../services/UserService";

const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    UserService.initMockedUsers();
    const fetchedUser = UserService.getLoggedInUser();
    if (fetchedUser) {
      setUser(fetchedUser);
    } else {
      console.log("No user found in ls");
    }
  }, []);
  useEffect(() => {
    if (user) {
      console.log(`Logged in user: ${user.name}`);
    }
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
