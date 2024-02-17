"use client";
import { downVote, upVote } from "@/lib/actions/question.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  description?: string;
  author: {
    username: string;
    id: string;
    avatar: string;
  };
  userId: string;
  questionId: string;
  voteLength: number;
  userVoted?: {
    upvote: boolean;
    downvote: boolean;
  };
}

const QuestionActionCard = ({
  title,
  description,
  author,
  userId,
  questionId,
  voteLength,
  userVoted,
}: Props) => {
  const pathname = usePathname();
  let sameUser = userId === author.id;

  const handleUpvote = async () => {
    await upVote(questionId, userId, pathname);
  };
  const handleDownVote = async () => {
    await downVote(questionId, userId, pathname);
  };
  return (
    <div className="card bg-base-200">
      <div className="flex p-4 justify-between">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex mr-1">
            <button
              className={`btn btn-circle ${
                userVoted?.upvote ? "btn-success" : "btn-ghost"
              }`}
              onClick={handleUpvote}
            >
              <Image
                src="/assets/upvote.svg"
                alt="upvote_icon"
                width={32}
                height={32}
              />
            </button>
          </div>
          <div className="flex mr-1">
            <p>{voteLength}</p>
          </div>
          <div className="flex mr-1">
            <button
              className={`btn btn-circle ${
                userVoted?.downvote ? "btn-error" : "btn-ghost"
              }`}
              onClick={handleDownVote}
            >
              <Image
                src="/assets/downvote.svg"
                alt="share_icon"
                width={32}
                height={32}
              />
            </button>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex flex-1 flex-col justify-between h-full">
          <div>
            <p className="card-title">{title}</p>
            <p className="text-gray-500">{description}</p>
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
            <p className="text-primary">@{author.username}</p>
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
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="btn btn-error">
                {sameUser ? "Delete" : "Report"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionActionCard;
