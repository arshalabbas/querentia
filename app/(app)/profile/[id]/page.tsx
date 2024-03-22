import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import UserTabs from "@/components/tabs/UserTabs";
import ProfileQuestionsList from "@/components/Lists/ProfileQuestionsList";
import ProfileFeedsList from "@/components/Lists/ProfileFeedsList";
// import ProfilePollsList from "@/components/Lists/ProfilePollsList";

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
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Questions"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          <ProfileQuestionsList userId={user.id} />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Feeds"
        />
        <div role="tabpanel" className="tab-content p-10">
          <ProfileFeedsList />
        </div>

        {/* <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Polls"
        />
        <div role="tabpanel" className="tab-content p-10">
          <ProfilePollsList />
        </div> */}
      </div>
    </section>
  );
};

export default Page;
