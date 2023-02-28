export default function Heading({text}: {text: string}) {
    return (
        <div className="text-center mb-10">
            <div className="text-3xl font-semibold mb-4">Welcome to the doctor’s app</div>
            <p className="text-base text-gray-900">{text}</p>
        </div>
    )
}   