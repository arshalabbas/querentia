import FeedForm from "@/components/forms/FeedForm";
import PollForm from "@/components/forms/PollForm";
import QuestionForm from "@/components/forms/QuestionForm";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  return (
    <div>
      <h1 className="text-head">Create</h1>
      <div role="tablist" className="tabs tabs-lifted tabs-lg mt-3">
        <input
          type="radio"
          name="post-tab"
          role="tab"
          className="tab"
          aria-label="Question"
          defaultChecked={true}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <QuestionForm userId={user.id} />
        </div>

        <input
          type="radio"
          name="post-tab"
          role="tab"
          className="tab"
          aria-label="Poll"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <PollForm />
        </div>

        <input
          type="radio"
          name="post-tab"
          role="tab"
          className="tab"
          aria-label="Feed"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <FeedForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
