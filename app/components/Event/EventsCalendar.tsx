"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { supabase } from "@/app/lib/supabase";
import { Loader } from "lucide-react";

export default function EventsCalendar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [syncLoding, setSyncLoading] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [country, setCountry] = useState("US");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    fetchHolidays(country);
  }, [country]);

  async function checkSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
    } else {
      await fetchHolidays(country);
      setLoading(false);
    }
  }

  async function fetchHolidays(
    countryCode: string,
    year: number = new Date().getFullYear()
  ) {
    try {
      const res = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
      );

      if (!res.ok)
        throw new Error("failed fetching holiday for " + countryCode);
      const data = await res.json();
      console.log(data);

      const holidayEvents = data.map(
        (holiday: { localName: unknown; date: unknown }) => ({
          title: holiday.localName,
          date: holiday.date,
        })
      );

      setHolidays(holidayEvents);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  }

  async function pushHolidaysToMSTeams() {
    setSyncLoading(true);

    await fetch("/api/push-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ holidays }),
      credentials: "include",
    });

    setSyncLoading(false);
    alert("Synced success");
  }

  if (loading) return <p>Loading...</p>;
  return (
    <div className="w-full min-h-dvh flex flex-col p-5 gap-2">
      <div className="flex gap-5 w-full items-center justify-center">
        <button
          onClick={() => pushHolidaysToMSTeams()}
          className="button-primary hover:drop-shadow-lg hover:drop-shadow-amber-50"
        >
          Sync with Teams{" "}
          {syncLoding && <Loader className="inline animate-spin" />}
        </button>

        <select
          className="text-black bg-white/50 cursor-pointer rounded"
          name="country"
          id="country"
          onChange={(e) => setCountry(e.currentTarget.value)}
        >
          <option value="US">USA</option>
          <option value="KR">Korea</option>
          <option value="PH">Philippines</option>
        </select>
      </div>
      <div className="grow">
        <FullCalendar
          height="100%"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          datesSet={(info) => {
            const year = info.start.getFullYear();
            if (year !== currentYear) {
              setCurrentYear(year);
              fetchHolidays(country, year);
            }
          }}
          events={holidays}
        />
      </div>

      {
        <div className="flex justify-end">
          <button
            className="bg-red-600 w-40 text-white p-2 cursor-pointer rounded-md"
            onClick={() => {
              supabase.auth.signOut();
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      }
    </div>
  );
}
