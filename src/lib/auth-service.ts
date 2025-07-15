import axios from "axios";
import { APP_CONFIG } from "@/config/app-config";
import { LoginFormData, RegisterFormData } from "./auth-schemas";

const api = axios.create({
  baseURL: APP_CONFIG.api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const authService = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  },

  async register(data: RegisterFormData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/register", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  },
};