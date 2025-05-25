"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, name, surname }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow">
        <h2 className="text-xl mb-4 text-gray-700">Register</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Login
          </label>
          <input
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Surname
          </label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
          />
        </div>

        <div>
          <Link
            href={"/login"}
            className="text-gray-600 hover:underline hover:text-violet-600"
          >
            Already have an account? Log in here
          </Link>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleRegister}
            className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded-md cursor-pointer"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
