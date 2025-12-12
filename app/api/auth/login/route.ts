import { NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";

export async function GET() {
  const pca = new ConfidentialClientApplication({
    auth: {
      clientId: process.env.AZURE_CLIENT_ID!,
      clientSecret: process.env.AZURE_CLIENT_SECRET!,
      authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    },
  });

  const authUrl = await pca.getAuthCodeUrl({
    scopes: ["User.Read", "Calendars.ReadWrite"],
    redirectUri: "http://localhost:3000/api/auth/redirect",
  });

  console.log(authUrl);

  return NextResponse.redirect(authUrl);
}
