"use client";

import { useForm } from "react-hook-form";
import pollValidation, {
  pollValidationType,
} from "@/lib/validation/PollValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import PostHeader from "../shared/PostHeader";
import PollOptions from "../shared/PollOptions";
import { postPoll } from "@/lib/actions/poll.actions";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const PollForm = () => {
  const router = useRouter();
  const { userId } = useAuth();
  if (!userId) return null;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<pollValidationType>({
    resolver: zodResolver(pollValidation),
  });

  const onSubmit = async (
    values: pollValidationType & { [key: string]: string }
  ) => {
    const options = Object.keys(values)
      .filter((key) => key.startsWith("option-"))
      .map((key, index) => {
        return {
          id: index,
          title: values[key],
        };
      });
    await postPoll({
      title: values.title,
      description: values.description || "",
      userId,
      options,
    }).then(() => {
      router.push("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PostHeader
        errors={errors}
        placeholder="Poll Title"
        register={register}
      />
      <PollOptions register={register} />
      <button
        type="submit"
        className="btn btn-info btn-wide mt-3"
        disabled={isSubmitting}
      >
        Create Poll
      </button>
    </form>
  );
};

export default PollForm;
