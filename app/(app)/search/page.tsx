import QuestionCard from "@/components/ui/QuestionCard";
import SearchBar from "@/components/ui/SearchBar";
import { fetchFilterecQuestions } from "@/lib/actions/question.actions";

async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  const result = await fetchFilterecQuestions(query);

  return (
    <section>
      <h1 className="text-head mb-10">Search</h1>

      <SearchBar />

      <div className="mt-14 flex flex-col gap-5">
        {result.length < 0 ? (
          <p className="no-result"></p>
        ) : (
          <>
            {result.map((question) => {
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
      </div>
    </section>
  );
}

export default Page;
