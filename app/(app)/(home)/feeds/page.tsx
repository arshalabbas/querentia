import AnswerForm from "@/components/forms/AnswerForm";
import FeedCard from "@/components/ui/FeedCard";
import { fetchFeeds, fetchUserVoteOnFeed } from "@/lib/actions/feed.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";

const Page = async () => {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const result = await fetchFeeds(1, 30);
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  const author = {
    username: userInfo.username,
    avatar: userInfo.avatar,
  };

  const feedsWithAuthorData = await Promise.all(
    result.feeds.map(async (feed: any) => {
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
      <h1 className="text-head">Feeds</h1>
      <section className="flex flex-col gap-5 my-5">
        {result.feeds.length === 0 ? (
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

export default Page;
