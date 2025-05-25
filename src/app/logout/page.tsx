"use client";

import { useRouter } from "next/navigation";
import { useUser } from "../../../context/UserContext";
import { useEffect, useState } from "react";
import UserApiService from "../../../services/UserApiService";

const LogoutPage = () => {
  const router = useRouter();
  const { setCurrentUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await UserApiService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      setCurrentUser(null);
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Are you sure you want to log out?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            {isLoading ? "Logging out..." : "Confirm"}
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
