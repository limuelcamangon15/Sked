import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between w-full h-fit px-10 lg:px-40 py-4">
      <Link
        href={"/"}
        className="bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent font-bold tracking-tighter text-3xl"
      >
        Sked
      </Link>

      <div className="flex gap-5">
        <Link href={"/login"} className="button-secondary">
          Log in
        </Link>

        <Link href={"/signup"} className="button-primary">
          Sign up
        </Link>
      </div>
    </header>
  );
}

export default Header;
