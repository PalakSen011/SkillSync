export const SignUpInputField = ({
  type,
  placeholder,
  register,
  name,
  errors,
  disabled,
  validation,
}) => (
  <div className="mb-4">
    <input
      type={type}
      className="w-full px-4 py-2"
      placeholder={placeholder}
      {...register(name, validation)}
      disabled={disabled}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm">{errors[name].message}</p>
    )}
  </div>
);

export default SignUpInputField;