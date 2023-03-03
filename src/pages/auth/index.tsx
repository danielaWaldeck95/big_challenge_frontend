import { useState } from "react";
import Link from "next/link";

import AuthHeading from "@/components/AuthHeading";
import BaseButton from "@/components/base/BaseButton";
import InputField from "@/components/base/InputField";

export default function Auth() {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-2/3">
        <AuthHeading text={"Log in to access unique features"} />
        <form>
          <div className="mx-auto w-1/3">
            <div className="mb-6 flex flex-col space-y-4">
              <InputField
                type="text"
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
            </div>
            <div className="flex flex-col items-center justify-between space-y-6">
              <BaseButton text={"Log in"} />
              <div className="flex items-center space-x-2">
                <p className="text-base text-gray-500">Dont have an account yet?</p>
                <Link
                  className="text-sm text-blue-600 hover:text-blue-700"
                  href="/auth/register"
                >
                  Sign up{" "}
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
