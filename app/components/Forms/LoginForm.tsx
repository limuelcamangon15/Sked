import Link from "next/link";

function LoginForm() {
  return (
    <>
      <div className="flex gap-5 w-full ">
        <section className="hidden lg:flex items-center justify-center w-full">
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

        <form className="flex flex-col gap-7 items-center justify-center w-full h-full tracking-wide">
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
              placeholder="sked@myemail.com"
              className="outline-0 rounded-lg p-3 bg-gray-900"
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
              placeholder="••••••••"
              className="outline-0 rounded-lg p-3 bg-gray-900 tracking-widest"
            />
          </div>

          <div className="w-100 md:w-1/2 flex flex-col gap-2">
            <button className="w-full mt-5 py-4 px-6 cursor-pointer text-white bg-blue-950 rounded-lg hover:bg-blue-900 hover:text-white hover:scale-103 transition-all duration-300">
              Log in
            </button>
            <p className="text-center text-white/50 tracking-normal">
              Don&apos;t have an account?{" "}
              <Link
                href={"/signup"}
                className="text-white hover:text-white/70 transition-all duration-300"
              >
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
