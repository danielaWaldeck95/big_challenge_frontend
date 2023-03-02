import { useState } from "react";
import Link from "next/link";

import AuthHeading from "@/components/AuthHeading";

function RegisterForm() {
  const [userType, setUserType] = useState("doctor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handleRadioButtonChange = (value: string) => {
    setUserType(value);
  };
  return (
    <>
      <form>
        <div className="mx-auto w-2/3">
          <div className="mb-2 grid items-center gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm text-gray-700">
                Name
              </label>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                className="mt-4 w-full appearance-none rounded border bg-white py-2 px-3 leading-tight focus:outline-none"
                id="name"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-gray-700">
                Email
              </label>
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                className="mt-4 w-full appearance-none rounded border border-gray-300 bg-white py-2 px-3 leading-tight focus:outline-none"
                id="email"
                type="email"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                className="mt-4 mb-3 w-full appearance-none rounded border border-gray-300 bg-white py-2 px-3 leading-tight focus:outline-none"
                id="password"
                type="password"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Repeat Password</label>
              <input
                value={passwordConfirmation}
                onChange={(event) => {
                  setPasswordConfirmation(event.target.value);
                }}
                className="mt-4 mb-3 w-full appearance-none rounded border border-gray-300 bg-white py-2 px-3 leading-tight focus:outline-none"
                id="password_confirmation"
                type="password"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="userTypes" className="text-sm text-gray-700">
              User Type
            </label>
            <div
              id="userTypes"
              className="mt-4 flex w-full items-center justify-center rounded border border-gray-300"
            >
              <div className="flex w-full items-center py-2 px-3">
                <input
                  checked={userType === "doctor"}
                  onChange={(e) => handleRadioButtonChange(e.target.value)}
                  id="doctor"
                  type="radio"
                  value="doctor"
                  name="user-type"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="doctor" className="ml-2 text-sm font-medium">
                  Doctor
                </label>
              </div>
              <div className="flex w-full items-center border-l border-gray-300 py-2 px-3">
                <input
                  checked={userType === "patient"}
                  onChange={(e) => handleRadioButtonChange(e.target.value)}
                  id="patient"
                  type="radio"
                  value="patient"
                  name="user-type"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="patient" className="ml-2 text-sm font-medium">
                  Patient
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between space-y-6">
            <button
              className="w-full rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Sign up
            </button>
            <div className="flex items-center space-x-2">
              <p className="text-base text-gray-500">Already have an account?</p>
              <Link className="text-sm text-blue-600 hover:text-blue-700" href="/auth">
                Log in
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
        <AuthHeading text={"Sign up to access unique features"} />
        <RegisterForm />
      </div>
    </div>
  );
}
