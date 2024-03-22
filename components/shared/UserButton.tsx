import Image from "next/image";
import Link from "next/link";
import { SignOutButton, SignedIn, currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
const UserButton = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);
  return (
    <div className="flex-none">
      {/* <div className="mx-4 flex gap-1">
        <Image
          src={"/assets/coins.svg"}
          width={16}
          height={16}
          alt="coins_icon"
        />
        <p className="font-bold text-lg">{userInfo?.points}</p>
      </div> */}
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
              src={userInfo.avatar || "https://api.multiavatar.com/random.png"}
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-md max-sm:menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {userInfo.userType == "admin" && (
            <li>
              <Link href={"/admin"}>Admin Panel</Link>
            </li>
          )}
          <li>
            <Link href={`/profile/${userInfo.id}`} className="justify-between">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <SignedIn>
            <li>
              <SignOutButton>Logout</SignOutButton>
            </li>
          </SignedIn>
        </ul>
      </div>
    </div>
  );
};

export default UserButton;
