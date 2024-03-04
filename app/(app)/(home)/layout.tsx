"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isFeedsTabActive = pathname.includes("/feeds") || pathname === "/feeds";
  return (
    <>
      {/* Home Section */}
      <div role="tablist" className="tabs tabs-bordered mb-6">
        <Link
          href={"/"}
          role="tab"
          className={`tab ${!isFeedsTabActive && "tab-active"}`}
        >
          Questions
        </Link>
        <Link
          href={"/feeds"}
          role="tab"
          className={`tab ${isFeedsTabActive && "tab-active"}`}
        >
          Feeds
        </Link>
      </div>
      {children}
    </>
  );
};

export default RootLayout;
