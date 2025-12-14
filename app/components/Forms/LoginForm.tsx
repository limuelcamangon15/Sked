"use client";

import { supabase } from "@/app/lib/supabase";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log(session);

      if (session) {
        window.location.href = "/api/auth/login";
        router.refresh();

        // no longer needed, the api/auth/login will redirect after setting cookies
        //router.push("/event");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="flex gap-5 w-full ">
        <section className="hidden lg:flex items-center justify-center w-1/2 max-h-dvh p-20">
          <div className="w-6/7">
            <div>
              <h1 className="text-5xl font-semibold tracking-tight leading-tight">
                Welcome back to{" "}
                <Link
                  href={"/"}
                  className="inline bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent font-bold tracking-tighter"
                >
                  Sked
                </Link>
                .
              </h1>
              <p className="text-5xl font-semibold tracking-tight leading-tight">
                Schedule Once. Sync Everywhere.
              </p>
            </div>

            <p className="mt-6 text-lg text-neutral-600 max-w-lg">
              Log in to keep your schedule up to date across Sked and Microsoft
              Teams.
            </p>
          </div>
        </section>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-7 items-center justify-center w-full lg:w-1/2 min-h-dvh tracking-wide"
        >
          <div className="tracking-normal text-center">
            <h1 className="text-2xl">
              Log in to{" "}
              <span className="bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent font-bold tracking-tighter">
                Sked
              </span>
            </h1>
            <p className="text-sm text-white/70">
              Enter your details to log in your account
            </p>
          </div>

          <div className="flex flex-col gap-2 w-100 md:w-1/2">
            <label htmlFor="email" className="text-sm font-thin text-white/70">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="sked@myemail.com"
              className="input"
            />
          </div>

          <div className="flex flex-col gap-2 w-100 md:w-1/2">
            <label
              htmlFor="password"
              className="text-sm font-thin text-white/70"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="••••••••"
              className="input"
            />
          </div>

          <div className="w-100 md:w-1/2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full mt-5 p-3 cursor-pointer text-white bg-blue-950 rounded-lg hover:bg-blue-900 hover:text-white hover:scale-103 transition-all duration-300"
            >
              Log in
              {loading && <Loader className="animate-spin inline ml-2" />}
            </button>
            <p className="text-center text-white/50 tracking-normal">
              Don&apos;t have an account?{" "}
              <Link href={"/signup"} className="link">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
