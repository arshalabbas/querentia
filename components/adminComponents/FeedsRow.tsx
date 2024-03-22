"use client";

import { removeUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import AlertModal, { alertButtonOnClickHandler } from "../ui/AlertModal";
import { usePathname, useRouter } from "next/navigation";
import { deleteFeedById } from "@/lib/actions/feed.actions";

interface Props {
  title: string;
  description: string;
  questionId: string;
}

const QuestionRow = ({ title, description, questionId }: Props) => {
  const pathname = usePathname();
  const deleteHandler = async () => {
    await deleteFeedById(questionId, pathname);
  };
  return (
    <tr className="hover">
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold">{title}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold">{description}</div>
          </div>
        </div>
      </td>
      <th>
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => alertButtonOnClickHandler(`${questionId}-delete`)}
        >
          <BiTrash className="text-2xl text-error" />
        </button>
        <AlertModal
          buttonTitle="Delete"
          id={`${questionId}-delete`}
          successHandler={deleteHandler}
          title="Delete Confirmation"
          body={`Do you want to delete this question?`}
        />
      </th>
    </tr>
  );
};

export default QuestionRow;
