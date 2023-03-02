type InputFieldProps = {
  label?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  value: string;
};

export default function InputField({
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}: InputFieldProps): JSX.Element {
  return (
    <div className="flex flex-col space-y-4">
      {label && (
        <label className="text-sm text-gray-700" htmlFor="input-field">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        name={name}
        className="w-full appearance-none rounded border border-gray-300 bg-white py-2 px-3 leading-tight focus:outline-none"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
