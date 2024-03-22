import { fetchUserQuestions } from "@/lib/actions/question.actions";
import QuestionCard from "../ui/QuestionCard";

const ProfileQuestionsList = async ({ userId }: { userId: string }) => {
  const questions = await fetchUserQuestions(userId);
  return (
    <section className="flex flex-col gap-5 mt-5">
      {questions.length === 0 ? (
        <p className="text-secondary-content text-center text-3xl mt-10 font-extrabold">
          No Questions Yet
        </p>
      ) : (
        questions.map((question: any) => {
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
        })
      )}
    </section>
  );
};

export default ProfileQuestionsList;
