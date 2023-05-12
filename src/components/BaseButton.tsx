import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  text: string;
}

export function BaseButton({ disabled, isLoading, text }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className="flex w-full items-center justify-center rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:bg-blue-400"
      type="submit"
    >
      {text}
      {isLoading && <ArrowPathIcon className="ml-4 h-5 animate-spin" />}
    </button>
  );
}
