"use client";
import { useForm } from "react-hook-form";
import {
  FeedValidation,
  FeedValidationType,
} from "@/lib/validation/FeedValidation";
import { TextInput } from "../ui/TextInput";
import { TextArea } from "../ui/TextArea";
import PostHeader from "../shared/PostHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFeed } from "@/lib/actions/feed.actions";
import { usePathname, useRouter } from "next/navigation";

const FeedForm = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FeedValidationType>({
    resolver: zodResolver(FeedValidation),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: FeedValidationType) => {
    await PostFeed({
      title: values.title,
      description: values.description || "",
      userId,
      path: pathname,
    }).then(() => router.push("/feeds"));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-start"
    >
      <PostHeader
        errors={errors}
        placeholder="What do you wanna share today?"
        register={register}
      />
      <button
        type="submit"
        className="btn btn-info btn-wide mt-3"
        disabled={isSubmitting}
      >
        Post Feed
      </button>
    </form>
  );
};

export default FeedForm;
