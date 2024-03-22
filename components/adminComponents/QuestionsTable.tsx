import React from "react";
import TableRow from "./TableRow";
import { currentUser } from "@clerk/nextjs";
import { fetchQuestions } from "@/lib/actions/question.actions";
import QuestionRow from "./QuestionRow";

const QuestionsTable = async () => {
  const questions = await fetchQuestions();
  return (
    <div className="overflow-x-auto">
      <table className="table table-lg">
        {/* head */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {questions.questions.map((question, index) => (
            <QuestionRow
              key={index}
              title={question.title}
              description={question.description}
              questionId={question._id.toString()}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsTable;
