export default function BaseButton({ text }: { text: string }) {
  return (
    <button
      className="w-full rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
      type="submit"
    >
      {text}
    </button>
  );
}
