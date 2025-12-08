import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between w-full h-fit px-10 lg:px-40 py-4">
      <h1 className="text-white font-bold tracking-tighter text-3xl">Sked</h1>

      <div className="flex gap-5">
        <Link
          href={"/signup"}
          className="py-2 px-4 cursor-pointer text-white/70 border border-white/40 rounded-lg hover:border-white hover:scale-103 transition-all duration-300"
        >
          Sign up
        </Link>
        <Link
          href={"/login"}
          className="py-2 px-6 cursor-pointer text-white bg-blue-950 rounded-lg hover:bg-blue-900 hover:scale-103 transition-all duration-300"
        >
          Log in
        </Link>
      </div>
    </header>
  );
}

export default Header;
