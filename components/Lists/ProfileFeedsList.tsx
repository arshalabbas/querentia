import FeedCard from "@/components/ui/FeedCard";
import {
  fetchFeeds,
  fetchUserFeeds,
  fetchUserVoteOnFeed,
} from "@/lib/actions/feed.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";

const ProfileFeedsList = async () => {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const user = await currentUser();
  if (!user) return null;
  const feeds = await fetchUserFeeds(user.id);
  const userInfo = await fetchUser(user.id);

  const feedsWithAuthorData = await Promise.all(
    feeds.map(async (feed: any) => {
      const feedAuthorData = {
        username: feed.author.username,
        id: feed.author.id,
        avatar: feed.author.avatar,
      };

      const feedVoteLength =
        feed.vote.upvote.length - feed.vote.downvote.length;
      const userVoted = await fetchUserVoteOnFeed(
        feed._id.toString(),
        userInfo.id,
        pathname
      );
      return {
        id: feed._id.toString(),
        title: feed.title,
        description: feed.description,
        author: feedAuthorData,
        userId: userInfo.id,
        feedId: feed._id.toString(),
        voteLength: feedVoteLength,
        userVoted,
      };
    })
  );

  return (
    <div>
      <section className="flex flex-col gap-5 my-5">
        {feeds.length === 0 ? (
          <p className="text-secondary-content text-center text-3xl mt-10 font-extrabold">
            No Feeds Yet
          </p>
        ) : (
          feedsWithAuthorData.map((feedData: any) => (
            <FeedCard key={feedData.id} {...feedData} />
          ))
        )}
      </section>
    </div>
  );
};

export default ProfileFeedsList;
