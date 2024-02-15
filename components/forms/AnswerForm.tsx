"use client";

import { addAnswerToQuestion } from "@/lib/actions/question.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import {
  AnswerValidation,
  AnswerValidationType,
} from "@/lib/validation/AnswerValidatoin";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  questionId: string;
  userAvatar: string;
  userId: string;
}

const AnswerForm = ({ questionId, userAvatar, userId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<AnswerValidationType>({
    resolver: zodResolver(AnswerValidation),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: AnswerValidationType) => {
    const userInfo = await fetchUser(userId);
    await addAnswerToQuestion(
      questionId,
      values.text,
      userInfo._id,
      pathname
    ).then(() => reset());
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-3 flex gap-5 py-8 items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full overflow-hidden">
          <Image
            className="rounded-full"
            src={userAvatar}
            width={60}
            height={60}
            alt="avatar-image"
          />
        </div>
        <input
          type="text"
          placeholder="Answer it..."
          className="input w-96 max-w-xs flex-1"
          {...register("text")}
        />
      </div>
      <button type="submit" className="btn btn-info">
        Post
      </button>
    </form>
  );
};

export default AnswerForm;
