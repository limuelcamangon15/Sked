import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  return NextResponse.json({
    cookie: cookieStore.get("ms_access_token")?.value || "none",
  });
}
