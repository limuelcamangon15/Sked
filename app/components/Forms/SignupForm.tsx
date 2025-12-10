"use client";

import { createUser } from "@/app/lib/actions/user";
import { UserType } from "@/app/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignupForm() {
  const router = useRouter();

  const [user, setUser] = useState<UserType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      alert("Please fill all fields");
      return;
    }

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    const result = await createUser(userData);

    if (result?.success) {
      alert("Signup success! User created.");
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      router.push("/login");
    } else {
      alert(`Signup failed: ${result?.error || "Unknown error"}`);
    }
  }

  return (
    <>
      <div className="flex gap-5 w-full ">
        <section className="hidden lg:flex items-center justify-center w-full">
          <div className="w-6/7">
            <div>
              <h1 className="text-5xl font-semibold tracking-tight leading-tight">
                Welcome to{" "}
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
              Start your Sked account and keep your calendar perfectly aligned
              with Microsoft Teams.
            </p>
          </div>
        </section>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-7 items-center justify-center w-full h-full tracking-wide"
        >
          <div className="tracking-normal text-center">
            <h1 className="text-2xl">
              Create your{" "}
              <span className="bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent font-bold tracking-tighter">
                Sked
              </span>{" "}
              account
            </h1>
            <p className="text-sm text-white/70">
              Enter your details to get started
            </p>
          </div>

          <div className="flex flex-col gap-2 w-100 md:w-1/2">
            <label
              htmlFor="firstName"
              className="text-sm font-thin text-white/70"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={user.firstName}
              onChange={(e) =>
                setUser({
                  ...user,
                  firstName: e.currentTarget.value,
                })
              }
              placeholder="Enter your first name"
              className="outline-0 rounded-lg p-3 bg-gray-900 placeholder:text-white/30"
            />
          </div>

          <div className="flex flex-col gap-2 w-100 md:w-1/2">
            <label
              htmlFor="lastName"
              className="text-sm font-thin text-white/70"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={user.lastName}
              onChange={(e) =>
                setUser({
                  ...user,
                  lastName: e.currentTarget.value,
                })
              }
              placeholder="Enter your last name"
              className="outline-0 rounded-lg p-3 bg-gray-900 placeholder:text-white/30"
            />
          </div>

          <div className="flex flex-col gap-2 w-100 md:w-1/2">
            <label
              htmlFor="lastName"
              className="text-sm font-thin text-white/70"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              placeholder="sked@myemail.com"
              className="outline-0 rounded-lg p-3 bg-gray-900 placeholder:text-white/30"
            />
          </div>

          <div className="flex flex-col gap-2 w-100 md:w-1/2">
            <label
              htmlFor="lastName"
              className="text-sm font-thin text-white/70"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              placeholder="••••••••"
              className="outline-0 rounded-lg p-3 bg-gray-900 tracking-widest placeholder:text-white/30"
            />
          </div>

          <div className="w-100 md:w-1/2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full mt-5 py-4 px-6 cursor-pointer text-white bg-blue-950 rounded-lg hover:bg-blue-900 hover:text-white hover:scale-103 transition-all duration-300"
            >
              Sign up
            </button>
            <p className="text-center text-white/50 tracking-normal">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="text-white hover:text-white/70 transition-all duration-300"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
