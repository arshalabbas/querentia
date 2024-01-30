"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";

const TopBar = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  return (
    <div className="navbar fixed top-0 z-30 bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          {/* large devices */}
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={130}
            height={0}
            className="hidden md:block"
          />
          {/* small devices */}
          <Image
            src={"/logo_small.svg"}
            alt="logo"
            width={40}
            height={40}
            className="block md:hidden"
          />
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                width={40}
                height={40}
                alt="Tailwind CSS Navbar component"
                src={user?.imageUrl || "https://api.multiavatar.com/random.png"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md max-sm:menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={() => signOut(() => router.push("/"))}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
