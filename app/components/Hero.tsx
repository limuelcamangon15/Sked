import {
  ArrowLeft,
  ArrowRightCircle,
  LogIn,
  Rocket,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

function Hero() {
  return (
    <section className="flex items-center justify-center px-8 md:px-16">
      <div className="w-6/7">
        <h1 className="text-5xl font-semibold tracking-tight leading-tight">
          Smart Scheduling. Real-Time Microsoft Teams Sync. Powered by{" "}
          <p className="inline tracking-tighter">Sked</p>.
        </h1>

        <p className="mt-6 text-lg text-neutral-600 max-w-lg">
          Schedule your events in Sked and keep everything up to date in
          Microsoft Teams.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href={"/signup"}
            className="flex items-center gap-2 group hover:scale-103 px-6 py-3 bg-blue-950 text-white rounded-xl shadow-lg hover:bg-blue-900 transition-all duration-300"
          >
            <Rocket className="group-hover:-rotate-360 transition-all duration-1000" />
            Sign up and continue for free
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
