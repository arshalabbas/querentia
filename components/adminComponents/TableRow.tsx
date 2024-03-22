"use client";

import { removeUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import AlertModal, { alertButtonOnClickHandler } from "../ui/AlertModal";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  avatar: string;
  name: string;
  username: string;
  userId: string;
}

const TableRow = ({ avatar, name, username, userId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const deleteHandler = async () => {
    await removeUser(userId).then(() => {
      router.push(pathname);
    });
  };
  return (
    <tr className="hover">
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <Image
                src={avatar}
                width={50}
                height={50}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">{username}</div>
          </div>
        </div>
      </td>
      <th>
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => alertButtonOnClickHandler(`${userId}-delete`)}
        >
          <BiTrash className="text-2xl text-error" />
        </button>
        <AlertModal
          buttonTitle="Delete"
          id={`${userId}-delete`}
          successHandler={deleteHandler}
          title="Delete Confirmation"
          body={`Do you want to delete this user? @${username}`}
        />
      </th>
    </tr>
  );
};

export default TableRow;
