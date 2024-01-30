interface Props {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  register: any;
}

export const TextInput = ({
  label,
  name,
  placeholder,
  errorMessage,
  register,
}: Props) => {
  return (
    <label className="form-control flex flex-col w-full mt-3">
      <div className="label">
        <span className="label-text text-lg">{label}</span>
      </div>
      <input
        type="text"
        placeholder={placeholder || "Type here..."}
        className={`input input-bordered w-full ${
          errorMessage && "input-error"
        }`}
        {...register(name)}
      />
      {errorMessage && <p className="text-error mt-2">{errorMessage}</p>}
    </label>
  );
};
