import Image from "next/image";
import Link from "next/link";
import UserButton from "./UserButton";

const TopBar = () => {
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
      <UserButton />
    </div>
  );
};

export default TopBar;
