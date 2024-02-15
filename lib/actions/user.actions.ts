"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import { clerkClient } from "@clerk/nextjs";
import Question from "../models/question.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  path: string;
}
export async function updateUser({
  userId,
  username,
  name,
  bio,
  avatar,
  path,
}: Params) {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        avatar,
        onboarded: true,
      },
      { upsert: true }
    );

    clerkClient.users.updateUser(userId, { username });

    if (path === "/profile/edit") {
      revalidatePath(path);
    } else {
      const res = await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          onboardingComplete: true,
        },
      });
    }
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

export async function removeUser(userId: string) {
  try {
    connectToDB();

    await User.deleteOne({ id: userId });
    await clerkClient.users.deleteUser(userId);
  } catch (error: any) {
    throw new Error(`Error removing user: ${error.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();
    const userQuestions = await Question.find({ author: userId });

    const answersIds = userQuestions.reduce((acc, userQuestion) => {
      return acc.concat(userQuestion.answers);
    }, []);

    const answers = await Question.find({
      _id: { $in: answersIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name avatar _id",
    });

    return answers;
  } catch (error: any) {
    throw new Error(`Error fetching the activities: ${error.message}`);
  }
}
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);
    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}
