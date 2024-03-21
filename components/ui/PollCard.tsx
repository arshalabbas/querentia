"use client";

import Image from "next/image";
import AlertModal, { alertButtonOnClickHandler } from "./AlertModal";
import { usePathname } from "next/navigation";
import PollOptionsForCard from "./PollOptionsForCard";

interface Props {
  title: string;
  description: string;
  author: {
    username: string;
    avatar: string;
  };
  userId: string;
  pollId: string;
  userVoted?: {
    upvote: boolean;
    downvote: boolean;
  };
  options: {
    id: number;
    title: string;
    progress: number;
  }[];
}

const PollCard = ({
  title,
  description,
  author,
  userId,
  pollId,
  options,
}: Props) => {
  const pathname = usePathname();
  const deleteQuestionHandler = () => {};
  const sameUser = false;
  return (
    <div className="card bg-primary/85 outline-4 outline-accent outline-dotted px-4">
      <div className="flex p-4 justify-between">
        <div className="flex flex-1 flex-col justify-between h-full">
          <div>
            <p className="card-title text-primary-content">{title}</p>
            <p className="text-primary-content/70">{description}</p>
          </div>
          <div>
            <PollOptionsForCard
              options={options}
              pollId={pollId}
              pathname={pathname}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <div className="rounded-full overflow-hidden">
              <Image
                src={author.avatar}
                className="rounded-full image-full"
                alt="user-avatar"
                width={20}
                height={20}
              />
            </div>
            <p className="text-black">@{author.username}</p>
          </div>
        </div>
        <div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <Image
                src="/assets/more.svg"
                width={18}
                height={18}
                alt="More_Icon"
                className="invert brightness-0"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <AlertModal
                id="delete-alert"
                title="Do you really want to delete your question?"
                buttonTitle="Delete"
                successHandler={deleteQuestionHandler}
              />
              <AlertModal
                id="report-alert"
                title="Report this question"
                buttonTitle="Report"
                successHandler={deleteQuestionHandler}
              />
              <li
                className="btn btn-error"
                onClick={
                  sameUser
                    ? () => alertButtonOnClickHandler("delete-alert")
                    : () => alertButtonOnClickHandler("report-alert")
                }
              >
                {sameUser ? "Delete" : "Report"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollCard;
