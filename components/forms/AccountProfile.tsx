"use client";

import Image from "next/image";
import { TextInput } from "@/components/ui/TextInput";
import { TextArea } from "@/components/ui/TextArea";
import { useState } from "react";
import { multiAvatarUrl } from "@/lib/util";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserValidation,
  UserValidationType,
} from "@/lib/validation/UserValidatoin";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface Props {
  user: {
    id: string;
    objectId: string;
    name: string;
    username: string;
    bio: string;
    avatar?: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const currentUser = useUser();
  const [randomAvatar, setRandomAvatar] = useState(
    user.avatar && user.avatar !== ""
      ? user.avatar
      : multiAvatarUrl(Math.random())
  );
  const pathname = usePathname();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserValidationType>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
    },
  });

  const onSubmit = async (values: UserValidationType) => {
    await updateUser({
      name: values.name,
      username: values.username,
      path: pathname,
      userId: user.id,
      bio: values.bio || "",
      avatar: randomAvatar,
    }).then(async () => {
      await currentUser.user?.reload();
      router.push("/");
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-start"
    >
      <div className="w-full flex items-center gap-4">
        <div
          onClick={() => {
            setRandomAvatar(multiAvatarUrl(Math.random()));
          }}
          className="max-w-[100px] max-h-[100px] rounded-full hover:scale-95 transition bg-base-300"
        >
          <Image
            src={randomAvatar}
            alt="avatar_image"
            width={100}
            height={100}
            className="rounded-full cursor-pointer"
          />
        </div>
        <p className="text-secondary">Click the avatar to change</p>
      </div>
      <div className="divider"></div>
      <div>
        <TextInput
          name="name"
          register={register}
          label="Name"
          placeholder="Your name..."
          errorMessage={errors.name && errors.name.message}
        />

        <TextInput
          name="username"
          register={register}
          label="Username"
          placeholder="Your username..."
          errorMessage={errors.username && errors.username.message}
        />

        <TextArea
          name="bio"
          register={register}
          label="Bio"
          placeholder="I'm a plain human :)"
          errorMessage={errors.bio && errors.bio.message}
        />
        <button
          type="submit"
          className={`w-full btn btn-info mt-5 ${
            isSubmitting && "btn-disabled"
          }`}
        >
          {btnTitle}
        </button>
      </div>
    </form>
  );
};

export default AccountProfile;
