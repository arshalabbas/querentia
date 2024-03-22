import Report from "../models/report.model";
import connectToDB from "../mongoose";

export async function postReport({
  reason,
  postId,
  postType,
}: {
  reason: string;
  postId: string;
  postType: string;
}) {
  try {
    connectToDB();

    await Report.create({
      reason,
      postId,
      postType,
      createdAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(`Error posting reports: ${error.message}`);
  }
}
