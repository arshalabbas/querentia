import FeedsTable from "@/components/adminComponents/FeedsTable";
import QuestionsTable from "@/components/adminComponents/QuestionsTable";

const Page = () => {
  return (
    <div>
      <h1 className="text-head">Questions</h1>
      <div>
        <FeedsTable />
      </div>
    </div>
  );
};

export default Page;
