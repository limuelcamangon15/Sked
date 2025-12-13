import { NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";

export async function GET() {
  const pca = new ConfidentialClientApplication({
    auth: {
      clientId: process.env.AZURE_CLIENT_ID!,
      clientSecret: process.env.AZURE_CLIENT_SECRET!,
      authority: `https://login.microsoftonline.com/common`,
    },
  });

  const authUrl = await pca.getAuthCodeUrl({
    scopes: [
      "https://graph.microsoft.com/User.Read",
      "https://graph.microsoft.com/Calendars.ReadWrite",
    ],
    redirectUri: "http://localhost:3000/api/auth/redirect",
    responseMode: "query",
  });

  console.log(authUrl);

  return NextResponse.redirect(authUrl);
}
