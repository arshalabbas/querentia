"use server";

import { revalidatePath } from "next/cache";
import Feed from "../models/feed.model";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import mongoose from "mongoose";

interface Params {
  title: string;
  description: string;
  userId: string;
  path: string;
}

export async function PostFeed({ title, description, userId, path }: Params) {
  try {
    connectToDB();

    const userInfo = await User.findOne({ id: userId });
    const postedFeed = await Feed.create({
      title,
      description,
      author: userInfo._id,
      createdAt: new Date(),
    });

    await User.findOneAndUpdate(
      { id: userId },
      { $push: { feeds: postedFeed._id } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error posting feed: ${error.message}`);
  }
}

export async function fetchFeeds(pageNumber = 1, pageSize = 20) {
  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    connectToDB();
    const feedsQuery = Feed.find()
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: "desc" })
      .populate({
        path: "author",
        model: User,
      });

    const feeds = await feedsQuery.exec();
    return { feeds };
  } catch (error: any) {
    throw new Error(`Error fetching feeds: ${error.message}`);
  }
}

export async function upVote(feedId: string, userId: string, pathname: string) {
  try {
    const feedObjectId = new mongoose.Types.ObjectId(feedId);
    const user = await User.findOne({ id: userId });

    const feed = await Feed.findById(feedObjectId);
    const hasUpVoted = feed.vote.upvote.includes(user._id);

    const hasDownVoted = feed.vote.downvote.includes(user._id);

    if (hasUpVoted) {
      await Feed.findByIdAndUpdate(
        feedObjectId,
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
      await Feed.findByIdAndUpdate(
        feedObjectId,
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
      await Feed.findByIdAndUpdate(
        feedObjectId,
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
  feedId: string,
  userId: string,
  pathname: string
) {
  try {
    const feedObjectId = new mongoose.Types.ObjectId(feedId);
    const user = await User.findOne({ id: userId });

    const feed = await Feed.findById(feedObjectId);
    const hasDownVoted = feed.vote.downvote.includes(user._id);
    const hasUpVoted = feed.vote.upvote.includes(user._id);

    if (hasDownVoted) {
      await Feed.findByIdAndUpdate(
        feedObjectId,
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
      await Feed.findByIdAndUpdate(
        feedObjectId,
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
      await Feed.findByIdAndUpdate(
        feedObjectId,
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

export async function fetchUserVoteOnFeed(
  questionId: string,
  userId: string,
  pathname: string
) {
  try {
    connectToDB();

    const feedObjectId = new mongoose.Types.ObjectId(questionId);
    const feed = await Feed.findById(feedObjectId);
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

export async function fetchUserFeeds(userId: string) {
  try {
    connectToDB();

    // Find all questions authored by the user with the given userId
    const userInfo = await User.findOne({ id: userId }).populate({
      path: "feeds",
      model: Feed,
      populate: [
        {
          path: "author",
          model: User,
          select: "username name avatar id",
        },
      ],
    });
    return userInfo.feeds;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}
