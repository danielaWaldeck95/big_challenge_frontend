import React, { forwardRef, InputHTMLAttributes, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  errors?: string[];
  label?: React.ReactNode;
  name?: string;
  placeholder?: string;
  type: string;
  value?: string;
}

function Input(
  { error, errors, label, name, placeholder, type, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [inputType, setInputType] = useState<string>(type);

  const handleShowPassword = () =>
    setInputType(inputType === "password" ? "text" : "password");

  const eyeIcon =
    inputType === "password" ? (
      <EyeIcon onClick={handleShowPassword} className="h-6 w-6 text-blue-500" />
    ) : (
      <EyeSlashIcon onClick={handleShowPassword} className="h-6 w-6 text-blue-500" />
    );

  const listErrors =
    errors &&
    errors.map((err) => (
      <div className="text-xs text-red-500" key={err}>
        {err}
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
        <div
          className={`flex w-full items-center space-x-4 rounded border border-gray-300 bg-white  py-2 px-3 leading-tight  ${
            error && "border-red-500"
          }`}
        >
          <input
            {...props}
            ref={ref}
            type={inputType}
            name={name}
            className="w-full appearance-none focus:outline-none"
            placeholder={placeholder}
          />
          {type === "password" && eyeIcon}
        </div>
        {error && <div className="text-xs text-red-500">{error}</div>}
        {listErrors}
      </div>
    </div>
  );
}

export default forwardRef(Input);
