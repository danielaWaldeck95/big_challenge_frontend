import { useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type InputFieldProps = {
  error?: string;
  label?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  value: string;
};

export default function InputField({
  error,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}: InputFieldProps): JSX.Element {
  const [inputType, setInputType] = useState<string>(type);
  const handleShowPassword = () => {
    if (type === inputType) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  let eyeButtonIcon: IconProp = { ...faEye };
  let eyeButton;
  if (value && type === "password") {
    if (inputType === "text") {
      eyeButtonIcon = { ...faEye };
    } else if (inputType === "password") {
      eyeButtonIcon = { ...faEyeSlash };
    }

    eyeButton = (
      <FontAwesomeIcon
        className="cursor-pointer text-blue-600 hover:text-blue-700"
        onClick={handleShowPassword}
        icon={eyeButtonIcon}
      />
    );
  }
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
          {eyeButton}
        </div>
        {error && <div className="text-xs text-red-500">{error}</div>}
      </div>
    </div>
  );
}
