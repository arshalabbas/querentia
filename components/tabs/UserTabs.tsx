"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const UserTabs = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const switchTabHandler = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("tab", term);
    } else {
      params.delete("tab");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const currentTab = searchParams.get("tab") || "";
  return (
    <div role="tablist" className="tabs tabs-boxed">
      <button
        onClick={() => switchTabHandler("")}
        role="tab"
        className={`tab ${!currentTab && "tab-active"}`}
      >
        Questions
      </button>
      <button
        onClick={() => switchTabHandler("feeds")}
        role="tab"
        className={`tab ${currentTab == "feeds" && "tab-active"}`}
      >
        Feeds
      </button>
      <button
        onClick={() => switchTabHandler("polls")}
        role="tab"
        className={`tab ${currentTab == "polls" && "tab-active"}`}
      >
        Polls
      </button>
    </div>
  );
};

export default UserTabs;
