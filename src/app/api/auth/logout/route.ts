import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/authCookie";

/**
 * Cierra la sesión eliminando la cookie httpOnly del JWT.
 */
export async function POST() {
  const response = NextResponse.json({ success: true });
  clearAuthCookie(response);
  return response;
}
