"use client";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
// import LogInModal from "./Log/LogInModal";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

import Link from "next/link";

const Navbar = () => {
  const { currentUser } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 mb-5">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Home page */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MenageMe
          </span>
        </a>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <p className="mt-0">
                Hello {currentUser.name} {currentUser.surname}
              </p>
              <Link
                href="/logout"
                className="bg-blue-700 text-white p-2 w-20 rounded cursor-pointer hover:bg-violet-600 text-center"
              >
                <button>Log Out</button>
              </Link>
            </>
          ) : (
            <Link href={"/login"}>
              <button className="bg-blue-700 text-white p-2 w-20 rounded cursor-pointer hover:bg-violet-600">
                Login
              </button>
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="text-white w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5 text-black" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
