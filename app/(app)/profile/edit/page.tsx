import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  const userData = {
    id: user.id,
    objectId: JSON.stringify(userInfo?._id),
    name: userInfo?.name || user.firstName || "",
    username: userInfo?.username || user.username || "",
    bio: userInfo?.bio || "",
    avatar: userInfo?.avatar || "",
  };

  return (
    <>
      <h1 className="text-head max-sm:text-center">Edit Profile</h1>
      <p className="mt-3 text-subtl max-sm:text-center">Make any changes!</p>
      <section className="mt-12">
        <AccountProfile user={userData} btnTitle="Save" />
      </section>
    </>
  );
};

export default Page;
