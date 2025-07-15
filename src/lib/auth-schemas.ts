import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta gereklidir")
    .email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(1, "Şifre gereklidir"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Ad gereklidir"),
    lastName: z.string().min(1, "Soyad gereklidir"),
    email: z
      .string()
      .min(1, "E-posta gereklidir")
      .email("Geçerli bir e-posta adresi giriniz"),
    password: z
      .string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir"
      ),
    confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;