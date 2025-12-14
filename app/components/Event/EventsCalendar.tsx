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
  const [syncLoading, setSyncLoading] = useState(false);
  const [holidays, setHolidays] = useState([]);
  //const [country, setCountry] = useState("PH");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const COUNTRIES = [
    { code: "US", name: "USA", color: "#1E293B" }, // deep slate blue
    { code: "KR", name: "Korea", color: "#3F1D1D" }, // dark muted red
    { code: "PH", name: "Philippines", color: "#1F3D2B" }, // deep forest green
  ];

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
      await fetchHolidays(currentYear);
      setLoading(false);
    }
  }

  async function fetchHolidays(year: number = new Date().getFullYear()) {
    try {
      const requests = COUNTRIES.map((country) =>
        fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/${country.code}`
        ).then((res) => {
          if (!res.ok) {
            throw new Error(
              "error getting holidays for country" + country.code
            );
          }

          return res.json();
        })
      );

      const responses = await Promise.all(requests);

      const mergedHolidayEvents = responses.flatMap((data, index) => {
        const country = COUNTRIES[index];

        return data.map((holiday: { localName: string; date: string }) => ({
          title: `${holiday.localName} (${country.code})`,
          date: holiday.date,
          backgroundColor: country.color,
          countryCode: country.code,
        }));
      });

      setHolidays(mergedHolidayEvents);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }

    /*try {
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
    }*/
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
          {syncLoading ? "Syncing..." : "Sync with Teams"}
          {syncLoading && <Loader className="inline animate-spin" />}
        </button>
      </div>
      <div className="grow">
        <FullCalendar
          height="100%"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          datesSet={(info) => {
            const year = info.view.currentStart.getFullYear();
            console.log("this year is", year);
            if (year !== currentYear) {
              setCurrentYear(year);
              fetchHolidays(year);
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
