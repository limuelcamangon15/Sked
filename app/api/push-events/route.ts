import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Client } from "@microsoft/microsoft-graph-client";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("ms_access_token")?.value;

  console.log("Cookie store:", cookieStore);
  console.log("Access token:", accessToken);

  if (!accessToken) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, date } = body;

  console.log("TITLE" + title + "     Date: " + date);
  const graph = Client.init({
    authProvider: (done) => done(null, accessToken),
  });

  console.log("ABOT DITO");

  const event = {
    subject: title,
    start: {
      dateTime: `${date}T12:32:40.871Z`,
      timeZone: "UTC",
    },
    end: {
      dateTime: `${date}T12:32:40.871Z`,
      timeZone: "UTC",
    },
  };

  console.log(event);

  try {
    const me = await graph.api("/me").get();
    console.log("Graph /me result:", me);
  } catch (error: any) {
    console.error("Graph /me error:", error);
    return NextResponse.json(
      { error: "Graph /me failed", details: error.message },
      { status: 401 }
    );
  }

  try {
    await graph.api("/me/events").post(event);
  } catch (error: any) {
    console.error("Graph /me/events post error:", error);
    return NextResponse.json(
      { error: "Failed to add event", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Event added to Microsoft Calendar!" });
}
