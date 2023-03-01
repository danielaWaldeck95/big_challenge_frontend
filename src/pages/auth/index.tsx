import { useState } from "react";
import AuthHeading from "@/components/AuthHeading";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <form>
        <div className="w-1/3 mx-auto">
          <div className="flex flex-col space-y-4 mb-6">
            <label className="text-gray-700 text-sm">Email</label>
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="bg-white appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none"
              id="email"
              type="email"
            />

            <label className="text-gray-700 text-sm">Password</label>
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="bg-white appearance-none border border-gray-300 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none"
              id="password"
              type="password"
            />
          </div>
          <div className="flex flex-col items-center justify-between space-y-6">
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none w-full"
              type="submit"
            >
              Log In
            </button>
            <div className="flex items-center space-x-2">
              <p className="text-gray-500 text-base">
                Dont have an account yet?
              </p>
              <Link
                className="text-sm text-blue-600 hover:text-blue-700"
                href="/auth/register"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default function Auth() {
  return (
    <div className="min-h-screen mx-auto items-center flex flex-col justify-center">
      <div className="w-2/3">
        <AuthHeading text={"Log in to access unique features"} />
        <LoginForm />
      </div>
    </div>
  );
}
