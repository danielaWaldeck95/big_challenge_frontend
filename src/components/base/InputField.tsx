import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface IInputFieldProps {
  errors?: string[];
  label?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  value: string;
}

export default function InputField({
  errors,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}: IInputFieldProps): JSX.Element {
  const [inputType, setInputType] = useState<string>(type);
  const handleShowPassword = () =>
    inputType === "password" ? setInputType("text") : setInputType("password");

  const eyeIcon =
    inputType === "password" ? (
      <EyeIcon onClick={handleShowPassword} className="h-6 w-6 text-blue-500" />
    ) : (
      <EyeSlashIcon onClick={handleShowPassword} className="h-6 w-6 text-blue-500" />
    );

  const listErrors =
    errors &&
    errors.map((error) => (
      <div className="text-xs text-red-500" key={error}>
        {error}
      </div>
    ));

  return (
    <div className="flex flex-col space-y-4">
      {label && (
        <label className="text-sm text-gray-700" htmlFor="input-field">
          {label}
        </label>
      )}
      <div>
        <div className="flex w-full items-center space-x-4 rounded border border-gray-300 bg-white  py-2 px-3 leading-tight">
          <input
            type={inputType}
            value={value}
            name={name}
            className="w-full appearance-none focus:outline-none"
            placeholder={placeholder}
            onChange={onChange}
          />
          {value && type === "password" && eyeIcon}
        </div>
        {listErrors}
      </div>
    </div>
  );
}
