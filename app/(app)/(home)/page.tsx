import PollCard from "@/components/ui/PollCard";
import QuestionCard from "@/components/ui/QuestionCard";
import { fetchRandomPoll } from "@/lib/actions/poll.actions";
import { fetchQuestions } from "@/lib/actions/question.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { calculateProgress } from "@/lib/util";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  const result = await fetchQuestions(1, 30);
  const user = await currentUser();
  if (!user) return null;
  const randomPoll = await fetchRandomPoll();
  const pollVoteLength =
    randomPoll.vote.upvote.length - randomPoll.vote.downvote.length;

  const userInfo = await fetchUser(user.id);

  const optionsProgress = calculateProgress(randomPoll);

  return (
    <div>
      <h1 className="text-head">Home</h1>
      <section className="mt-5">
        <PollCard
          author={{
            username: randomPoll.author.username,
            avatar: randomPoll.author.avatar,
          }}
          description={randomPoll.description}
          title={randomPoll.title}
          voteLength={pollVoteLength}
          userId={userInfo.id}
          pollId={randomPoll._id.toString()}
          options={optionsProgress}
        />
      </section>
      <section className="flex flex-col gap-8 py-5">
        {result.questions.length === 0 ? (
          <p className="text-secondary-content text-center text-3xl mt-10 font-extrabold">
            No Posts Yet
          </p>
        ) : (
          <>
            {result.questions.map((question) => {
              const voteLength =
                question.vote.upvote.length - question.vote.downvote.length;
              return (
                <QuestionCard
                  key={question._id}
                  title={question.title}
                  description={question.description}
                  author={question.author}
                  questionId={question._id}
                  answersLength={question.answers.length}
                  voteLength={voteLength}
                />
              );
            })}
          </>
        )}
      </section>
    </div>
  );
};

export default Page;
