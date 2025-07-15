import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    // Demo kayıt - gerçek projede bu backend'de olmalı
    // Basit validasyon
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Tüm alanlar gereklidir",
        },
        { status: 400 }
      );
    }

    // E-posta kontrolü (demo için basit)
    if (email === "existing@example.com") {
      return NextResponse.json(
        {
          success: false,
          message: "Bu e-posta adresi zaten kullanımda",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kayıt başarılı",
      token: "demo-jwt-token-" + Date.now(),
      user: {
        id: Date.now().toString(),
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
    });
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