"use client";
import React, { useState, useEffect } from "react";
import { User } from "../types/user";
import UserService from "../services/UserService";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchedUser = UserService.getMockedUser();
    setUser(fetchedUser);
  }, []);
  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 mb-5">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Home page */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MenageMe
          </span>
        </a>
        <p className="text-right">
          Hello {user?.name} {user?.surname}
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
