import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

/**
 * Endpoint del formulario de contacto.
 * Verifica el token de reCAPTCHA en el servidor (siteverify) antes de
 * procesar el mensaje. Sin esta verificación, el reCAPTCHA del cliente no
 * ofrece protección real (un bot puede omitir el widget).
 */
export async function POST(request: NextRequest) {
  try {
    const { recaptchaToken } = await request.json();

    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, error: "Debe completar el reCAPTCHA" },
        { status: 400 }
      );
    }

    if (!RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY no está configurada");
      return NextResponse.json(
        { success: false, error: "Configuración de servidor incorrecta" },
        { status: 500 }
      );
    }

    // Verificar el token contra la API de Google
    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        }),
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { success: false, error: "Verificación de reCAPTCHA fallida" },
        { status: 400 }
      );
    }

    // TODO: con el reCAPTCHA ya verificado, aquí se procesa el envío real
    // del mensaje (correo / persistencia en Strapi). Por ahora se confirma
    // la recepción.
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error procesando el formulario de contacto:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
