"use client";

import { votePollOption } from "@/lib/actions/poll.actions";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

interface Props {
  pollId: string;
  options: {
    id: number;
    title: string;
    progress: number;
  }[];
  pathname: string;
}

const PollOptionsForCard = ({ pollId, options, pathname }: Props) => {
  const { userId } = useAuth();
  const handleVote = async (option: { id: number; title: string }) => {
    console.log(option);
    await votePollOption({
      pollId,
      optionId: option.id,
      pathname,
      userId: userId || "",
    });
  };
  return (
    <div className="card">
      <ul className="menu menu-lg max-sm:menu-sm gap-5">
        {options.map((option) => (
          <li key={option.id} className="bg-white rounded-md">
            <button
              onClick={() => handleVote(option)}
              className="flex flex-col items-start"
            >
              <p>{option.title}</p>
              <progress
                className="progress progress-primary w-full"
                value={option.progress}
                max="100"
              ></progress>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollOptionsForCard;
