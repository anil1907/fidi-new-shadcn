export const AUTH_COOKIE_NAME = "auth-token";

export const setAuthCookie = (token: string) => {
  const maxAge = 30 * 24 * 60 * 60; // 30 gün (saniye cinsinden)
  document.cookie = `${AUTH_COOKIE_NAME}=${token}; max-age=${maxAge}; path=/; secure; samesite=strict`;
};

export const removeAuthCookie = () => {
  document.cookie = `${AUTH_COOKIE_NAME}=; max-age=0; path=/`;
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