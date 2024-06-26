"use server";

import { revalidatePath } from "next/cache";
import Question from "../models/question.model";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import mongoose from "mongoose";

interface Params {
  title: string;
  description: string;
  userId: string;
  path: string;
}

export async function postQuestion({
  title,
  description,
  userId,
  path,
}: Params) {
  try {
    connectToDB();

    const userInfo = await User.findOne({ id: userId });

    const postedQuestion = await Question.create({
      title,
      description,
      author: userInfo._id,
      createdAt: new Date(),
    });

    await User.findOneAndUpdate(
      { id: userId },
      {
        $push: { questions: postedQuestion._id },
      }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error posting question: ${error.message}`);
  }
}

export async function fetchQuestions(pageNumber = 1, pageSize = 1000) {
  const skipAmount = (pageNumber - 1) * pageSize;
  try {
    connectToDB();
    const questionsQuery = Question.find({
      parentId: { $in: [null, undefined] },
    })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: "desc" })
      .populate({
        path: "author",
        model: User,
      });

    const totalQuestionsCount = await User.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const questions = await questionsQuery.exec();
    const isNext = totalQuestionsCount > skipAmount + questions.length;
    return { questions, isNext };
  } catch (error: any) {
    throw new Error(`Error fetching questions: ${error.message}`);
  }
}

export async function searchQuestions() {
  try {
    connectToDB();
  } catch (error: any) {
    throw new Error(`Error searching questions: ${error.message}`);
  }
}

export async function fetchQuestionById(questionId: string) {
  try {
    connectToDB();

    const question = await Question.findById(questionId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name username avatar",
      })
      .populate({
        path: "answers",
        options: { sort: { createdAt: "desc" } },
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name username parentId avatar",
          },
        ],
      })
      .exec();

    return question;
  } catch (error: any) {
    throw new Error(`Error fetching the question by id: ${error.message}`);
  }
}

export async function addAnswerToQuestion(
  questionId: string,
  text: string,
  userId: string,
  path: string
) {
  try {
    connectToDB();

    const originalQuestion = await Question.findById(questionId);
    if (!originalQuestion) {
      throw new Error(`Question not found!`);
    }

    const answerQuestion = new Question({
      title: text,
      author: userId,
      parentId: questionId,
      createdAt: new Date(),
    });

    const savedAnswerQuestion = await answerQuestion.save();

    originalQuestion.answers.push(savedAnswerQuestion._id);

    await originalQuestion.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment: ${error.message}`);
  }
}

export async function upVote(
  questionId: string,
  userId: string,
  pathname: string
) {
  try {
    const questionObjectId = new mongoose.Types.ObjectId(questionId);
    const user = await User.findOne({ id: userId });

    const question = await Question.findById(questionObjectId);
    const hasUpVoted = question.vote.upvote.includes(user._id);

    const hasDownVoted = question.vote.downvote.includes(user._id);

    if (hasUpVoted) {
      await Question.findByIdAndUpdate(
        questionObjectId,
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
      await Question.findByIdAndUpdate(
        questionObjectId,
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
      await Question.findByIdAndUpdate(
        questionObjectId,
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
  questionId: string,
  userId: string,
  pathname: string
) {
  try {
    const questionObjectId = new mongoose.Types.ObjectId(questionId);
    const user = await User.findOne({ id: userId });

    const question = await Question.findById(questionObjectId);
    const hasDownVoted = question.vote.downvote.includes(user._id);
    const hasUpVoted = question.vote.upvote.includes(user._id);

    if (hasDownVoted) {
      await Question.findByIdAndUpdate(
        questionObjectId,
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
      await Question.findByIdAndUpdate(
        questionObjectId,
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
      await Question.findByIdAndUpdate(
        questionObjectId,
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

export async function fetchUserVoteOnPost(
  questionId: string,
  userId: string,
  pathname: string
) {
  try {
    connectToDB();

    const questionObjectId = new mongoose.Types.ObjectId(questionId);
    const question = await Question.findById(questionObjectId);
    const user = await User.findOne({ id: userId });

    const hasUpVoted = question.vote.upvote.includes(user._id);
    const hasDownVoted = question.vote.downvote.includes(user._id);

    revalidatePath(pathname);
    return { upvote: hasUpVoted, downvote: hasDownVoted };
  } catch (error: any) {
    throw new Error(
      `Error on fetching the vote details of the user: ${error.message}`
    );
  }
}

export async function deleteQuestionById(questionId: string, pathname: string) {
  try {
    connectToDB();

    await Question.deleteOne({ _id: new mongoose.Types.ObjectId(questionId) });
    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(`Error deleting the question: ${error.message}`);
  }
}

export async function fetchFilterecQuestions(searchQuery: string) {
  try {
    connectToDB();

    const mongooseQuery = Question.find({
      parentId: { $in: [null, undefined] },
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    }).populate({ path: "author", model: User, select: "username avatar" });
    // mongooseQuery.sort({ createdAt: "desc" });

    const data = mongooseQuery.exec();
    return data;
  } catch (error: any) {
    throw new Error(`Error searching: ${error.message}`);
  }
}

export async function fetchUserQuestions(userId: string) {
  try {
    connectToDB();

    // Find all questions authored by the user with the given userId
    const userInfo = await User.findOne({ id: userId }).populate({
      path: "questions",
      model: Question,
      populate: [
        {
          path: "author",
          model: User,
          select: "username name avatar id",
        },
      ],
    });
    return userInfo.questions;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}
