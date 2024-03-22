import UsersTable from "@/components/adminComponents/UsersTable";

const Page = () => {
  return (
    <div>
      <h1 className="text-head">Users</h1>
      <div>
        <UsersTable />
      </div>
    </div>
  );
};

export default Page;
