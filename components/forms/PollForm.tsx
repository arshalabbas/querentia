"use client";

import { useForm } from "react-hook-form";
import pollValidation, {
  pollValidationType,
} from "@/lib/validation/PollValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import PostHeader from "../shared/PostHeader";
import PollOptions from "../shared/PollOptions";

const PollForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<pollValidationType>({
    resolver: zodResolver(pollValidation),
  });

  const onSubmit = (values: pollValidationType) => {
    console.log("what's happening");
    console.log(values);
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
