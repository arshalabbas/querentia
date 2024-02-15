"use client";

import PostHeader from "@/components/shared/PostHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QuestionValidation,
  QuestionValidationType,
} from "@/lib/validation/QuestionValidation";
import { postQuestion } from "@/lib/actions/question.actions";
import { usePathname, useRouter } from "next/navigation";

const QuestionForm = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuestionValidationType>({
    resolver: zodResolver(QuestionValidation),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: QuestionValidationType) => {
    await postQuestion({
      title: values.title,
      description: values.description || "",
      userId,
      path: pathname,
    }).then(() => router.push("/home"));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-start"
    >
      <PostHeader
        register={register}
        placeholder="What's your problem?"
        errors={errors}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-info btn-wide mt-3"
      >
        Post
      </button>
    </form>
  );
};

export default QuestionForm;
