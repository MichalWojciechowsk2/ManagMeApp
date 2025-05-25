"use client";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
// import LogInModal from "./Log/LogInModal";
import Link from "next/link";

const Navbar = () => {
  const { currentUser } = useUser();

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 mb-5">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Home page */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MenageMe
          </span>
        </a>

        {currentUser ? (
          <div className="flex">
            <p className="mt-2 mr-5">
              Hello {currentUser.name} {currentUser.surname}
            </p>
            <Link
              href="/logout"
              className="bg-blue-700 text-white p-2 w-20 rounded cursor-pointer hover:bg-violet-600 text-center"
            >
              <button>Log Out</button>
            </Link>
          </div>
        ) : (
          <Link href={"/login"}>
            <button className="bg-blue-700 text-white p-2 w-20 rounded cursor-pointer hover:bg-violet-600">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
