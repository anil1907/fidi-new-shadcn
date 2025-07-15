export const AUTH_COOKIE_NAME = "auth-token";
export const REFRESH_COOKIE_NAME = "refresh-token";
export const TOKEN_TYPE_COOKIE_NAME = "token-type";
export const EXPIRES_IN_COOKIE_NAME = "expires-in";

export const setAuthCookie = (accessToken: string, refreshToken?: string, tokenType?: string, expiresIn?: number) => {
  const maxAge = expiresIn || 30 * 24 * 60 * 60; // expiresIn yoksa 30 gün (saniye)
  document.cookie = `${AUTH_COOKIE_NAME}=${accessToken}; max-age=${maxAge}; path=/; secure; samesite=strict`;
  if (refreshToken) {
    document.cookie = `${REFRESH_COOKIE_NAME}=${refreshToken}; max-age=${maxAge}; path=/; secure; samesite=strict`;
  }
  if (tokenType) {
    document.cookie = `${TOKEN_TYPE_COOKIE_NAME}=${tokenType}; max-age=${maxAge}; path=/; secure; samesite=strict`;
  }
  if (expiresIn) {
    document.cookie = `${EXPIRES_IN_COOKIE_NAME}=${expiresIn}; max-age=${maxAge}; path=/; secure; samesite=strict`;
  }
};

export const removeAuthCookie = () => {
  document.cookie = `${AUTH_COOKIE_NAME}=; max-age=0; path=/`;
  document.cookie = `${REFRESH_COOKIE_NAME}=; max-age=0; path=/`;
  document.cookie = `${TOKEN_TYPE_COOKIE_NAME}=; max-age=0; path=/`;
  document.cookie = `${EXPIRES_IN_COOKIE_NAME}=; max-age=0; path=/`;
};

export const getAuthCookie = (): string | null => {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  const authCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`)
  );
  if (authCookie) {
    return authCookie.split("=")[1];
  }
  return null;
};