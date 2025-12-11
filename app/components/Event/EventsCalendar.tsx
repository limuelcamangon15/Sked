"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { supabase } from "@/app/lib/supabase";

export default function EventsCalendar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState([]);
  const [country, setCountry] = useState("PH");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    checkSession();
  }, []);

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

  if (loading) return <p>Loading...</p>;
  return (
    <div className="w-full min-h-dvh flex flex-col p-5">
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

      {/*<button
        className="bg-red-600 text-white p-2 cursor-pointer rounded-md"
        onClick={() => {
          supabase.auth.signOut();
          router.push("/login");
        }}
      >
        Logout
      </button>*/}
    </div>
  );
}
