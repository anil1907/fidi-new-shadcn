export interface TokenData {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
}

const ACCESS_KEY = 'access-token';
const REFRESH_KEY = 'refresh-token';
const TYPE_KEY = 'token-type';
const EXPIRES_KEY = 'expires-in';

export const tokenService = {
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_KEY);
  },
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_KEY);
  },
  setTokens(data: TokenData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ACCESS_KEY, data.accessToken);
    localStorage.setItem(REFRESH_KEY, data.refreshToken);
    if (data.tokenType) localStorage.setItem(TYPE_KEY, data.tokenType);
    if (data.expiresIn) localStorage.setItem(EXPIRES_KEY, data.expiresIn.toString());
  },
  clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(TYPE_KEY);
    localStorage.removeItem(EXPIRES_KEY);
  },
};
