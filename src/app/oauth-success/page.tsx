"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../context/UserContext";
import UserApiService from "../../../services/UserApi";

export default function OAuthSuccessPage() {
  const router = useRouter();
  const { setCurrentUser } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      (async () => {
        try {
          const user = await UserApiService.getLoggedInUser();
          setCurrentUser(user);
          router.replace("/");
        } catch (error) {
          console.error("Error loading user", error);
          router.replace("/login");
        }
      })();
    } else {
      router.replace("/login");
    }
  }, []);

  return <p className="text-center mt-10">Logging you in via Google...</p>;
}
