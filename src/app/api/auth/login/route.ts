import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Demo authentication - gerçek projede bu backend'de olmalı
    if (email === "demo@example.com" && password === "123456") {
      return NextResponse.json({
        success: true,
        message: "Giriş başarılı",
        token: "demo-jwt-token-" + Date.now(),
        user: {
          id: "1",
          email: email,
          firstName: "Demo",
          lastName: "User",
        },
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Geçersiz e-posta veya şifre",
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Sunucu hatası",
      },
      { status: 500 }
    );
  }
}