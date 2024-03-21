"use server";

import { revalidatePath } from "next/cache";
import Poll from "../models/poll.model";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import mongoose from "mongoose";

interface Params {
  title: string;
  description: string;
  userId: string;
  options: {
    id: number;
    title: string;
  }[];
}

// Function to post poll
export async function postPoll({
  title,
  description,
  userId,
  options,
}: Params) {
  try {
    connectToDB();

    const userInfo = await User.findOne({ id: userId });

    await Poll.create({
      title,
      description,
      author: userInfo._id,
      createdAt: new Date(),
      options,
    });
  } catch (error: any) {
    throw new Error(`Error posting poll: ${error.message}`);
  }
}

// Function to fetch Polls
export async function fetchPolls(pageNumber = 1, pageSize = 20) {
  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    connectToDB();
    const pollQuery = Poll.find()
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: "desc" })
      .populate({
        path: "author",
        model: User,
      });

    const polls = await pollQuery.exec();
    return { polls };
  } catch (error: any) {
    throw new Error(`Error fetching polls: ${error.message}`);
  }
}

// Funciton to fetch random poll
export async function fetchRandomPoll() {
  try {
    connectToDB();

    const randomPoll = await Poll.aggregate([{ $sample: { size: 1 } }]);
    if (randomPoll.length > 0) {
      await Poll.populate(randomPoll, {
        path: "author",
        model: User,
        select: "username avatar",
      });

      await Poll.populate(randomPoll, {
        path: "options.votes",
        model: User,
      });
    } else {
      return null;
    }
    return randomPoll[0];
  } catch (error: any) {
    throw new Error(`Error fetching random poll: ${error.message}`);
  }
}

export async function upVote(pollId: string, userId: string, pathname: string) {
  try {
    const pollObjectId = new mongoose.Types.ObjectId(pollId);
    const user = await User.findOne({ id: userId });

    const poll = await Poll.findById(pollObjectId);
    const hasUpVoted = poll.vote.upvote.includes(user._id);

    const hasDownVoted = poll.vote.downvote.includes(user._id);

    if (hasUpVoted) {
      await Poll.findByIdAndUpdate(
        pollObjectId,
        {
          $pull: {
            "vote.upvote": user._id,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else if (hasDownVoted) {
      await Poll.findByIdAndUpdate(
        pollObjectId,
        {
          $pull: {
            "vote.downvote": user._id,
          },
          $addToSet: {
            "vote.upvote": user._id,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      await Poll.findByIdAndUpdate(
        pollObjectId,
        {
          $addToSet: {
            "vote.upvote": user._id,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(
      `Error when up voting the question/answer: ${error.message}`
    );
  }
}

export async function downVote(
  pollId: string,
  userId: string,
  pathname: string
) {
  try {
    const pollObjectId = new mongoose.Types.ObjectId(pollId);
    const user = await User.findOne({ id: userId });

    const poll = await Poll.findById(pollObjectId);
    const hasDownVoted = poll.vote.downvote.includes(user._id);
    const hasUpVoted = poll.vote.upvote.includes(user._id);

    if (hasDownVoted) {
      await Poll.findByIdAndUpdate(
        pollObjectId,
        {
          $pull: {
            "vote.downvote": user._id,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else if (hasUpVoted) {
      await Poll.findByIdAndUpdate(
        pollObjectId,
        {
          $pull: {
            "vote.upvote": user._id,
          },
          $addToSet: {
            "vote.downvote": user._id,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      await Poll.findByIdAndUpdate(
        pollObjectId,
        {
          $addToSet: {
            "vote.downvote": user._id,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(
      `Error when down voting the question/answer: ${error.message}`
    );
  }
}

// Function to check a user voted on a poll
export async function fetchUserVotedOnPoll(
  pollId: string,
  userId: string,
  pathname: string
) {
  try {
    connectToDB();

    const feedObjectId = new mongoose.Types.ObjectId(pollId);
    const feed = await Poll.findById(feedObjectId);
    const user = await User.findOne({ id: userId });

    const hasUpVoted = feed.vote.upvote.includes(user._id);
    const hasDownVoted = feed.vote.downvote.includes(user._id);

    revalidatePath(pathname);
    return { upvote: hasUpVoted, downvote: hasDownVoted };
  } catch (error: any) {
    throw new Error(
      `Error on fetching the vote details of the user: ${error.message}`
    );
  }
}

interface votePollOptionParams {
  pollId: string;
  optionId: number;
  userId: string;
  pathname: string;
}

// To vote poll option
export async function votePollOption({
  pollId,
  optionId,
  userId,
  pathname,
}: votePollOptionParams) {
  try {
    // Fetch the poll document
    const poll = await Poll.findById(new mongoose.Types.ObjectId(pollId));
    const option = poll.options.find((opt: any) => opt.id === optionId);

    const user = await User.findOne({ id: userId });
    if (option.votes.includes(user._id)) return;

    option.votes.push(user._id);
    poll.save();
    revalidatePath(pathname);
  } catch (error) {
    console.error("Error voting for option:", error);
    return "An error occurred while voting for the option.";
  }
}
