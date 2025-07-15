import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { APP_CONFIG } from '@/config/app-config';
import { tokenService } from './token-service';
import { authService } from './auth-service';

const api = axios.create({
  baseURL: APP_CONFIG.api.baseUrl,
});

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; config: AxiosRequestConfig }[] = [];

function processQueue(token: string | null) {
  failedQueue.forEach((p) => {
    if (token && p.config.headers) {
      p.config.headers.Authorization = `Bearer ${token}`;
    }
    p.resolve(api(p.config));
  });
  failedQueue = [];
}

api.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push({ resolve, config: originalRequest });
        });
      }

      isRefreshing = true;
      try {
        const refreshed = await authService.refreshToken(tokenService.getRefreshToken() ?? '');
        if (refreshed.accessToken && refreshed.refreshToken) {
          tokenService.setTokens({
            accessToken: refreshed.accessToken,
            refreshToken: refreshed.refreshToken,
            tokenType: refreshed.tokenType,
            expiresIn: refreshed.expiresIn,
          });
          processQueue(refreshed.accessToken);
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
          return api(originalRequest);
        }
        throw new Error('Unable to refresh token');
      } catch (refreshError) {
        tokenService.clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
