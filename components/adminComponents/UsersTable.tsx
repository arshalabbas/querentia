import React from "react";
import TableRow from "./TableRow";
import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

const UsersTable = async () => {
  const currentLogginedUser = await currentUser();
  if (!currentLogginedUser) return null;
  const users = await fetchUsers({ userId: currentLogginedUser.id });
  return (
    <div className="overflow-x-auto">
      <table className="table table-lg">
        {/* head */}
        <thead>
          <tr>
            <th>User Info</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <TableRow
              userId={user.id}
              key={index}
              avatar={user.avatar}
              username={user.username}
              name={user.name}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
