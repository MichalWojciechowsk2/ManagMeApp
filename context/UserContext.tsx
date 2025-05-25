"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types/user";
import UserApiService from "../services/UserApiService";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  allUsers: User[];
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  allUsers: [],
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [users, loggedInUser] = await Promise.all([
          UserApiService.getAllUsers(),
          UserApiService.getLoggedInUser(),
        ]);

        setAllUsers(users);
        if (loggedInUser) {
          setCurrentUser(loggedInUser);
        } else {
          console.log("No user found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log(`Logged in user: ${currentUser.name}`);
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, allUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
