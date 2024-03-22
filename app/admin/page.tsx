import { adminPanelRoutes } from "@/constants/admin";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (userInfo.userType !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <h1 className="text-head text-center">Querentia - DashBoard</h1>
      <div className="grid grid-flow-rows grid-cols-4 gap-5 my-12">
        {adminPanelRoutes.map((route, index) => (
          <Link href={route.route} key={index}>
            <div className="shadow rounded flex gap-5 bg-base-300 max-w-fit px-12 py-6">
              <route.Icon className="text-lg" />
              {route.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
