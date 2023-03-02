export default function Heading({ text }: { text: string }) {
  return (
    <div className="mb-10 text-center">
      <div className="mb-4 text-3xl font-semibold">Welcome to the doctor’s app</div>
      <p className="text-base text-gray-900">{text}</p>
    </div>
  );
}
