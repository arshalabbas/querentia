import AnswerForm from "@/components/forms/AnswerForm";
import QuestionActionCard from "@/components/ui/QuestionActionCard";
// import QuestionCard from "@/components/ui/QuestionCard";
import { fetchQuestionById } from "@/lib/actions/question.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

const Page = async ({ params }: { params: { id: string } }) => {
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
  return (
    <section>
      <QuestionActionCard
        title={question.title}
        description={question.description}
        author={authorData}
        userId={user.id}
        questionId={question._id.toString()}
        voteLength={questionVoteLength}
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
          {question.answers.map((answer: any) => {
            const answerAuthorData = {
              username: answer.author.username,
              id: answer.author.id,
              avatar: answer.author.avatar,
            };
            const answerVoteLength =
              answer.vote.upvote.length - answer.vote.downvote.length;
            return (
              <QuestionActionCard
                key={JSON.stringify(answer._id)}
                title={answer.title}
                author={answerAuthorData}
                userId={user.id}
                questionId={answer._id.toString()}
                voteLength={answerVoteLength}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Page;
