"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();
  return (
    <div className="btm-nav md:hidden">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <Link
            key={item.label}
            className={`${isActive && "active"}`}
            href={item.route}
          >
            <Image
              src={item.imgURL}
              alt={`${item.label}-icon`}
              width={28}
              height={28}
              className="invert"
            />
            <span className="btm-nav-label max-sm:hidden">
              {item.label.split(" ")[0]}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;
