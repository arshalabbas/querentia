"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProgressTab = () => {
  const pathname = usePathname();
  const tagPath = pathname.split("/").pop();
  return (
    <div role="tablist" className="tabs tabs-bordered">
      <div role="tab" className="tab tab-active cursor-default">
        Profile
      </div>
      <div
        role="tab"
        className={`tab ${tagPath === "tags" && "tab-active"} cursor-default`}
      >
        Tags
      </div>
    </div>
  );
};

export default ProgressTab;
