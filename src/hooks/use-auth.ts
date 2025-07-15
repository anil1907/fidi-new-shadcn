"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthCookie, removeAuthCookie } from "@/lib/auth-cookies";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authToken = getAuthCookie();
    if (authToken) {
      setToken(authToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logout = () => {
    removeAuthCookie();
    setToken(null);
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  const requireAuth = () => {
    if (isAuthenticated === false) {
      router.push("/auth/login");
    }
  };

  return {
    isAuthenticated,
    token,
    logout,
    requireAuth,
    isLoading: isAuthenticated === null,
  };
};