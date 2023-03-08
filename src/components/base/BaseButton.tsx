import ClipLoader from "react-spinners/ClipLoader";

type ButtonProps = {
  isLoading?: boolean;
  text: string;
};

export default function BaseButton({ isLoading, text }: ButtonProps) {
  return (
    <button
      disabled={isLoading}
      className="flex w-full items-center justify-center rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:bg-blue-400"
      type="submit"
    >
      {text}
      {isLoading && (
        <ClipLoader
          className="ml-4"
          size={20}
          color={"#FFFFFF"}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </button>
  );
}
