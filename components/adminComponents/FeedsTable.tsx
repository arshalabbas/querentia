import React from "react";
import QuestionRow from "./QuestionRow";
import { fetchFeeds } from "@/lib/actions/feed.actions";

const FeedsTable = async () => {
  const feeds = await fetchFeeds();
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
          {feeds.feeds.map((feed, index) => (
            <QuestionRow
              key={index}
              title={feed.title}
              description={feed.description}
              questionId={feed._id.toString()}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedsTable;
