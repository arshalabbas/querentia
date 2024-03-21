import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import UserTabs from "@/components/tabs/UserTabs";
import ListContents from "@/components/Lists/ListContents";
import ProfileQuestionsList from "@/components/Lists/ProfileQuestionsList";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(params.id);

  return (
    <section>
      <ProfileHeader
        id={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imageUrl={userInfo.avatar}
        bio={userInfo.bio}
      />
      <div className="divider"></div>
      <UserTabs />
      <ProfileQuestionsList userId={user.id} />
    </section>
  );
};

export default Page;
