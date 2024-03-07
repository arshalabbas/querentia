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
  return (
    <form>
      <PostHeader
        errors={errors}
        placeholder="Poll Title"
        register={register}
      />
      <PollOptions />
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
