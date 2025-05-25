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

interface UserContextType {
  currentUser: User | null;
  allUsers: User[];
}
const UserContext = createContext<UserContextType>({
  currentUser: null,
  allUsers: [],
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    UserService.initMockedUsers();
    const fetchedUser = UserService.getLoggedInUser();
    if (fetchedUser) {
      setCurrentUser(fetchedUser);
    } else {
      console.log("No user found in ls");
    }
    const allUsers = UserService.getAllUsers();
    setAllUsers(allUsers);
  }, []);
  useEffect(() => {
    if (currentUser) {
      console.log(`Logged in user: ${currentUser.name}`);
    }
  }, []);
  return (
    <UserContext.Provider value={{ currentUser, allUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
