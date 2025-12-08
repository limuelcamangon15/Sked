import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between w-full h-fit px-50 py-4">
      <h1 className="text-white font-bold tracking-tighter text-3xl">Sked</h1>

      <div className="flex gap-5">
        <Link
          href={"/signup"}
          className="py-2 px-4 cursor-pointer font-medium text-white/70 border border-white/20 rounded-lg hover:border-white transition-all duration-300"
        >
          Sign up
        </Link>
        <Link
          href={"/login"}
          className="py-2 px-6 cursor-pointer font-medium text-black bg-white rounded-lg hover:bg-white/50 transition-all duration-300"
        >
          Log in
        </Link>
      </div>
    </header>
  );
}

export default Header;
