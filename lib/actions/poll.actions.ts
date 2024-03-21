"use server";

import { revalidatePath } from "next/cache";
import Poll from "../models/poll.model";
import User from "../models/user.model";
import connectToDB from "../mongoose";

interface Params {
  title: string;
  description: string;
  userId: string;
  options: {
    id: number;
    title: string;
  }[];
}

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
