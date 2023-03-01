import { useState } from "react";
import Link from "next/link";

import AuthHeading from "@/components/AuthHeading";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <form>
        <div className="mx-auto w-1/3">
          <div className="mb-6 flex flex-col space-y-4">
            <label className="text-sm text-gray-700">Email</label>
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="w-full appearance-none rounded border border-gray-300 bg-white py-2 px-3 leading-tight focus:outline-none"
              id="email"
              type="email"
            />

            <label className="text-sm text-gray-700">Password</label>
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="mb-3 w-full appearance-none rounded border border-gray-300 bg-white py-2 px-3 leading-tight focus:outline-none"
              id="password"
              type="password"
            />
          </div>
          <div className="flex flex-col items-center justify-between space-y-6">
            <button
              className="w-full rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Log In
            </button>
            <div className="flex items-center space-x-2">
              <p className="text-base text-gray-500">Dont have an account yet?</p>
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
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-2/3">
        <AuthHeading text={"Log in to access unique features"} />
        <LoginForm />
      </div>
    </div>
  );
}
