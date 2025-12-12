import { NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) return NextResponse.redirect("/");

  const pca = new ConfidentialClientApplication({
    auth: {
      clientId: process.env.AZURE_CLIENT_ID!,
      clientSecret: process.env.AZURE_CLIENT_SECRET!,
      authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    },
  });

  let token;
  try {
    token = await pca.acquireTokenByCode({
      code,
      scopes: ["User.Read", "Calendars.ReadWrite"],
      redirectUri: "http://localhost:3000/api/auth/redirect",
    });
  } catch (err) {
    console.error("Token exchange failed:", err);
    return NextResponse.json(
      { error: "Failed to exchange code for token" },
      { status: 500 }
    );
  }

  const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/event`);
  res.cookies.set("ms_access_token", token.accessToken!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });

  return res;
}
