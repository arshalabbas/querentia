import QuestionCard from "@/components/ui/QuestionCard";
import { fetchQuestions } from "@/lib/actions/question.actions";

const Page = async () => {
  const result = await fetchQuestions(1, 30);
  return (
    <div>
      <h1 className="text-head">Home</h1>
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