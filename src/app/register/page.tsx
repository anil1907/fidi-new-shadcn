"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { registerSchema, RegisterFormData } from "@/lib/auth-schemas";
import { authService } from "@/lib/auth-service";
import { setAuthCookie } from "@/lib/auth-cookies";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);
      
      if (response.success && response.token) {
        setAuthCookie(response.token);
        router.push("/dashboard");
      } else {
        setError(response.message || "Kayıt oluşturulamadı");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Kayıt Ol</CardTitle>
          <CardDescription>
            Yeni hesap oluşturmak için bilgilerinizi giriniz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ad</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Adınız"
                  {...register("firstName")}
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Soyadınız"
                  {...register("lastName")}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
            </Button>

            <div className="text-center text-sm">
              Zaten hesabınız var mı?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Giriş yap
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}