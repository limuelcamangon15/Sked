import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Client } from "@microsoft/microsoft-graph-client";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("ms_access_token")?.value;

  console.log(accessToken);

  if (!accessToken) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, date } = body;

  const graph = Client.init({
    authProvider: (done) => done(null, accessToken),
  });

  const event = {
    subject: title,
    start: {
      dateTime: `${date}T00:00:00`,
      timeZone: "Asia/Manila",
    },
    end: {
      dateTime: `${date}T23:59:59`,
      timeZone: "Asia/Manila",
    },
  };

  await graph.api("/me/events").post(event);

  return NextResponse.json({ message: "Event added to MS Teams!" });
}
