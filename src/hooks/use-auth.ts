"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { tokenService } from "@/lib/token-service";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authToken = tokenService.getAccessToken();
    if (authToken) {
      setToken(authToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logout = () => {
    tokenService.clearTokens();
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