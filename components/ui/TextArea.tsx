interface Props {
  label: string;
  name: string;
  placeholder?: string;
  defaultContent?: string;
  errorMessage?: string;
  register: any;
}

export const TextArea = ({
  label,
  name,
  placeholder,
  defaultContent,
  errorMessage,
  register,
}: Props) => {
  return (
    <label className="form-control flex flex-col my-2">
      <div className="label">
        <span className="label-text text-lg">{label}</span>
      </div>
      <textarea
        name={name}
        className="textarea textarea-bordered h-32 w-full"
        placeholder={placeholder || "Type here..."}
        defaultValue={defaultContent || ""}
        {...register(name)}
      ></textarea>
      {errorMessage && <p className="text-error mt-2">{errorMessage}</p>}
    </label>
  );
};
