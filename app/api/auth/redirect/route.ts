import { NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    console.error("No auth code returned");
    return NextResponse.redirect("http://localhost:3000/");
  }

  const pca = new ConfidentialClientApplication({
    auth: {
      clientId: process.env.AZURE_CLIENT_ID!,
      clientSecret: process.env.AZURE_CLIENT_SECRET!,
      authority: "https://login.microsoftonline.com/common",
    },
  });

  try {
    const token = await pca.acquireTokenByCode({
      code,
      scopes: [
        "https://graph.microsoft.com/User.Read",
        "https://graph.microsoft.com/Calendars.ReadWrite",
      ],
      redirectUri: "http://localhost:3000/api/auth/redirect",
    });

    if (!token?.accessToken) {
      throw new Error("No access token returned");
    }

    const res = NextResponse.redirect("http://localhost:3000/event");

    res.cookies.set("ms_access_token", token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("MSAL ERROR:", err);
    return NextResponse.json(
      { error: "Authentication failed", details: err.message },
      { status: 500 }
    );
  }
}
