"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "../../../context/UserContext";
import UserApiService from "../../../services/UserApi";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setCurrentUser } = useUser();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const userData = await response.json();
      localStorage.setItem("token", userData.token);

      const loggedUser = await UserApiService.getLoggedInUser();
      setCurrentUser(loggedUser);

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow">
        <h2 className="text-xl mb-4 text-gray-700">Log In</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Login
          </label>
          <input
            data-testid="login-input"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            data-testid="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
          />
        </div>
        <div>
          <Link
            href={"/register"}
            className="text-gray-600 hover:underline hover:text-violet-600"
          >
            Don't have account? Click here
          </Link>
        </div>
        <button
          onClick={() =>
            (window.location.href = "http://localhost:5000/api/auth/google")
          }
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-[50%] mt-4 right"
        >
          Log in with Google
        </button>
        <div className="flex justify-end space-x-2">
          <button
            data-testid="login-button"
            onClick={handleLogin}
            className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded-md cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
