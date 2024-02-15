import { FieldErrors } from "react-hook-form";
import { TextArea } from "../ui/TextArea";
import { TextInput } from "../ui/TextInput";

const PostHeader = ({
  placeholder,
  register,
  errors,
}: {
  placeholder: string;
  register: any;
  errors: FieldErrors<{
    title: string;
    description?: string | undefined;
  }>;
}) => {
  return (
    <div>
      <TextInput
        label="Title"
        name="title"
        errorMessage={errors.title && errors.title.message}
        placeholder={placeholder}
        register={register}
      />
      <TextArea
        label="Description"
        name="description"
        errorMessage={errors.description && errors.description.message}
        register={register}
      />
    </div>
  );
};

export default PostHeader;
