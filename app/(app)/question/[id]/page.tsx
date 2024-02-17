import AnswerForm from "@/components/forms/AnswerForm";
import QuestionActionCard from "@/components/ui/QuestionActionCard";
// import QuestionCard from "@/components/ui/QuestionCard";
import {
  fetchQuestionById,
  fetchUserVoteOnPost,
} from "@/lib/actions/question.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";

const Page = async ({ params }: { params: { id: string } }) => {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  const question = await fetchQuestionById(params.id);
  const authorData = {
    username: question.author.username,
    id: question.author.id,
    avatar: question.author.avatar,
  };
  const questionVoteLength =
    question.vote.upvote.length - question.vote.downvote.length;

  const userVoted = await fetchUserVoteOnPost(
    question._id.toString(),
    userInfo.id,
    pathname
  );

  const answersWithAuthorData = await Promise.all(
    question.answers.map(async (answer: any) => {
      const answerAuthorData = {
        username: answer.author.username,
        id: answer.author.id,
        avatar: answer.author.avatar,
      };
      const answerVoteLength =
        answer.vote.upvote.length - answer.vote.downvote.length;
      const userVotedOnTheUser = await fetchUserVoteOnPost(
        answer._id.toString(),
        answer.author.id,
        pathname
      );
      return {
        id: answer._id.toString(),
        title: answer.title,
        author: answerAuthorData,
        userId: user.id,
        questionId: answer._id.toString(),
        voteLength: answerVoteLength,
        userVoted: userVotedOnTheUser,
      };
    })
  );
  return (
    <section>
      <QuestionActionCard
        title={question.title}
        description={question.description}
        author={authorData}
        userId={user.id}
        questionId={question._id.toString()}
        voteLength={questionVoteLength}
        userVoted={userVoted}
      />
      <AnswerForm
        userAvatar={userInfo.avatar}
        questionId={params.id}
        userId={user.id}
      />
      <div className="divider"></div>
      <h1 className="text-head">Answers</h1>
      {question.answers.length == 0 ? (
        <p className="text-2xl text-gray-300 text-center">No Answers Yet</p>
      ) : (
        <div className="my-3 flex flex-col gap-5">
          {answersWithAuthorData.map((answerData: any) => (
            <QuestionActionCard key={answerData.id} {...answerData} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Page;
