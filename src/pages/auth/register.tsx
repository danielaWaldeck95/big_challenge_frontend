import AuthHeading from "@/components/AuthHeading";
import Link from "next/link";
import { useState } from "react";

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
        <div className="w-2/3 mx-auto">
          <div className="grid gap-6 mb-2 md:grid-cols-2 items-center">
            <div>
              <label htmlFor="name" className="text-gray-700 text-sm">
                Name
              </label>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                className="mt-4 bg-white appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none"
                id="name"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-700 text-sm">
                Email
              </label>
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                className="mt-4 bg-white appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none"
                id="email"
                type="email"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm">Password</label>
              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                className="mt-4 bg-white appearance-none border border-gray-300 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none"
                id="password"
                type="password"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm">Repeat Password</label>
              <input
                value={passwordConfirmation}
                onChange={(event) => {
                  setPasswordConfirmation(event.target.value);
                }}
                className="mt-4 bg-white appearance-none border border-gray-300 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none"
                id="password_confirmation"
                type="password"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="userTypes" className="text-gray-700 text-sm">
              User Type
            </label>
            <div
              id="userTypes"
              className="mt-4 flex items-center justify-center w-full border border-gray-300 rounded"
            >
              <div className="flex items-center w-full py-2 px-3">
                <input
                  checked={userType == "doctor"}
                  onChange={(e) => handleRadioButtonChange(e.target.value)}
                  id="doctor"
                  type="radio"
                  value="doctor"
                  name="user-type"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="doctor" className="ml-2 text-sm font-medium">
                  Doctor
                </label>
              </div>
              <div className="flex items-center border-gray-300 border-l w-full py-2 px-3">
                <input
                  checked={userType == "patient"}
                  onChange={(e) => handleRadioButtonChange(e.target.value)}
                  id="patient"
                  type="radio"
                  value="patient"
                  name="user-type"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="patient" className="ml-2 text-sm font-medium">
                  Patient
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between space-y-6">
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none w-full"
              type="submit"
            >
              Sign up
            </button>
            <div className="flex items-center space-x-2">
              <p className="text-gray-500 text-base">
                Already have an account?
              </p>
              <Link
                className="text-sm text-blue-600 hover:text-blue-700"
                href="/auth"
              >
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
    <div className="min-h-screen mx-auto items-center flex flex-col justify-center">
      <div className="w-2/3">
        <AuthHeading text={"Sign up to access unique features"} />
        <RegisterForm />
      </div>
    </div>
  );
}
