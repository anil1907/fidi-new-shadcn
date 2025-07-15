"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuthCookie, removeAuthCookie } from "@/lib/auth-cookies";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAuthCookie();
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    removeAuthCookie();
    router.push("/login");
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Çıkış Yap
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hoş Geldiniz</CardTitle>
              <CardDescription>
                Dashboard'a başarıyla giriş yaptınız
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Bu sayfa kimlik doğrulama sonrası erişilebilen korumalı bir alandır.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>
                Hesap ayarlarınızı yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Profili Düzenle
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Güvenlik</CardTitle>
              <CardDescription>
                Hesap güvenlik ayarları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Şifre Değiştir
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}