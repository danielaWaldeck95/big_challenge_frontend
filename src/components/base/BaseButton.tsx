import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface IButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  text: string;
}

export default function BaseButton({ disabled, isLoading, text }: IButtonProps) {
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
