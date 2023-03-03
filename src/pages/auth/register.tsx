import { useState } from "react";
import Link from "next/link";

import AuthHeading from "@/components/AuthHeading";
import BaseButton from "@/components/base/BaseButton";
import InputField from "@/components/base/InputField";

export default function Auth() {
  const [formValues, setForm] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirmation: "",
    userType: "doctor",
  });
  const { email, name, password, passwordConfirmation, userType } = formValues;
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name: inputName, value: inputValue } = e.target;
    setForm((prev) => ({
      ...prev,
      [inputName]: inputValue,
    }));
  };
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-2/3">
        <AuthHeading text={"Sign up to access unique features"} />
        <form>
          <div className="mx-auto w-2/3">
            <div className="mb-6 grid items-center gap-6 md:grid-cols-2">
              <InputField
                type="text"
                value={name}
                label="Name"
                name="name"
                onChange={handleChange}
              />
              <InputField
                type="email"
                value={email}
                label="Email"
                name="email"
                onChange={handleChange}
              />
              <InputField
                type="password"
                value={password}
                label="Password"
                name="password"
                onChange={handleChange}
              />
              <InputField
                type="password"
                value={passwordConfirmation}
                label="Repeat Password"
                name="passwordConfirmation"
                onChange={handleChange}
              />
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
                    onChange={handleChange}
                    id="doctor"
                    type="radio"
                    value="doctor"
                    name="userType"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label htmlFor="doctor" className="ml-2 text-sm font-medium">
                    Doctor
                  </label>
                </div>
                <div className="flex w-full items-center border-l border-gray-300 py-2 px-3">
                  <input
                    checked={userType === "patient"}
                    onChange={handleChange}
                    id="patient"
                    type="radio"
                    value="patient"
                    name="userType"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label htmlFor="patient" className="ml-2 text-sm font-medium">
                    Patient
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between space-y-6">
              <BaseButton text={"Sign up"} />

              <div className="flex items-center space-x-2">
                <p className="text-base text-gray-500">Already have an account?</p>
                <Link className="text-sm text-blue-600 hover:text-blue-700" href="/auth">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
