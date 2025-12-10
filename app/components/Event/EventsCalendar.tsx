"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { supabase } from "@/app/lib/supabase";

export default function EventsCalendar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) router.push("/login");
    else setLoading(false);
  }

  if (loading) return <p>Loading...</p>;
  return (
    <div className="w-full min-h-dvh flex flex-col p-5">
      <div className="grow">
        <FullCalendar
          height="100%"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: "Christmas Day", date: "2025-12-25" },
            { title: "Monthsary", date: "2025-12-04" },
          ]}
        />
      </div>

      <button
        className="bg-red-600 text-white p-2 cursor-pointer rounded-md"
        onClick={() => {
          supabase.auth.signOut();
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
