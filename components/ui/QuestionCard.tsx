import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface Props {
  questionId: string;
  title: string;
  description: string;
  author: {
    username: string;
    id: string;
    avatar: string;
  };
  answersLength: [];
}

const QuestionCard = async ({
  questionId,
  title,
  description,
  author,
  answersLength,
}: Props) => {
  const user = await currentUser();
  if (!user) return null;
  let sameUser = user.id === author.id;
  return (
    <div className="card bg-base-200">
      <div className="flex p-4 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex mr-1">
            <Image
              src="/assets/vote.svg"
              alt="vote_icon"
              width={24}
              height={24}
            />{" "}
            <p>0</p>
          </div>
          <div className="flex mr-1">
            <Image
              src="/assets/reply.svg"
              alt="answers_icon"
              width={24}
              height={24}
            />{" "}
            <p>{answersLength}</p>
          </div>
          <div className="flex mr-1">
            <Image
              src="/assets/share.svg"
              alt="share_icon"
              width={24}
              height={24}
            />{" "}
            <p>0</p>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        <Link className="flex-1" href={`/question/${questionId}`}>
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="card-title">{title}</p>
              <p className="text-gray-500">
                {description.length <= 20
                  ? description
                  : description.substring(0, 50) + "..."}
              </p>
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
        </Link>
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

export default QuestionCard;
