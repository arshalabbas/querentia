"use client";

import { sidebarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <div className="flex sticky left-0 top-0 z-20 h-screen max-md:hidden">
      <div className="w-fit min-h-full bg-base-200 text-base-content p-4 pt-28">
        {/* Sidebar content here */}
        <ul className="menu menu-lg">
          {sidebarLinks.map((item) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;
            if (item.route === "/profile")
              item.route = `${item.route}/${userId}`;
            return (
              <li key={item.label} className="my-2">
                <Link
                  href={item.route}
                  className={`${
                    isActive && "active"
                  } max-lg:tooltip max-lg:tooltip-right`}
                  data-tip={item.label}
                >
                  <Image
                    src={item.imgURL}
                    height={24}
                    width={24}
                    alt={`${item.label}-icon`}
                    className={`${!isActive && "invert"}`}
                  />
                  <span className="max-lg:hidden">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center">
        {/* Page content here */}
      </div>
    </div>
  );
};

export default LeftSideBar;
