import { AUTH_COOKIE_NAME, REFRESH_COOKIE_NAME, TOKEN_TYPE_COOKIE_NAME, EXPIRES_IN_COOKIE_NAME } from "./auth-cookies";

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
}

export const tokenService = {
  getAccessToken(): string | null {
    if (typeof document === "undefined") return null;
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`)
    );
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  },

  getRefreshToken(): string | null {
    if (typeof document === "undefined") return null;
    const cookies = document.cookie.split(";");
    const refreshCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${REFRESH_COOKIE_NAME}=`)
    );
    return refreshCookie ? refreshCookie.split("=")[1] : null;
  },

  getTokenType(): string | null {
    if (typeof document === "undefined") return null;
    const cookies = document.cookie.split(";");
    const typeCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${TOKEN_TYPE_COOKIE_NAME}=`)
    );
    return typeCookie ? typeCookie.split("=")[1] : null;
  },

  getExpiresIn(): number | null {
    if (typeof document === "undefined") return null;
    const cookies = document.cookie.split(";");
    const expiresCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${EXPIRES_IN_COOKIE_NAME}=`)
    );
    return expiresCookie ? parseInt(expiresCookie.split("=")[1]) : null;
  },

  setTokens(data: TokenData): void {
    if (typeof document === "undefined") return;
    
    const maxAge = data.expiresIn || 30 * 24 * 60 * 60; // 30 days default
    
    document.cookie = `${AUTH_COOKIE_NAME}=${data.accessToken}; max-age=${maxAge}; path=/; secure; samesite=strict`;
    document.cookie = `${REFRESH_COOKIE_NAME}=${data.refreshToken}; max-age=${maxAge}; path=/; secure; samesite=strict`;
    
    if (data.tokenType) {
      document.cookie = `${TOKEN_TYPE_COOKIE_NAME}=${data.tokenType}; max-age=${maxAge}; path=/; secure; samesite=strict`;
    }
    
    if (data.expiresIn) {
      document.cookie = `${EXPIRES_IN_COOKIE_NAME}=${data.expiresIn}; max-age=${maxAge}; path=/; secure; samesite=strict`;
    }
  },

  clearTokens(): void {
    if (typeof document === "undefined") return;
    
    document.cookie = `${AUTH_COOKIE_NAME}=; max-age=0; path=/`;
    document.cookie = `${REFRESH_COOKIE_NAME}=; max-age=0; path=/`;
    document.cookie = `${TOKEN_TYPE_COOKIE_NAME}=; max-age=0; path=/`;
    document.cookie = `${EXPIRES_IN_COOKIE_NAME}=; max-age=0; path=/`;
  },

  isTokenExpired(): boolean {
    const expiresIn = this.getExpiresIn();
    if (!expiresIn) return true;
    
    const now = Math.floor(Date.now() / 1000);
    return now >= expiresIn;
  }
};