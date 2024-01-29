"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();
  return (
    <div className="btm-nav bg-base-200 md:hidden">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <Link
            key={item.label}
            className={`${isActive && "active"}`}
            href={item.route}
            data-tip={item.label}
          >
            <Image
              src={item.imgURL}
              alt={`${item.label}-icon`}
              width={22}
              height={22}
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
