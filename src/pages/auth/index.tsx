import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";

import AuthHeading from "@/components/AuthHeading";
import BaseButton from "@/components/base/BaseButton";
import InputField from "@/components/base/InputField";
import { useStore } from "../store/store";

export default function Auth() {
  const getCSRFCookie = async () => {
    await axios.get("http://localhost/sanctum/csrf-cookie");
  };

  useEffect(() => {
    getCSRFCookie();
  }, []);

  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, inputValue).then((response) => {
      // set token value
      const token = response.data;
      useStore.setState({ token });
      Router.push("/");
    });
  };

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-2/3">
        <AuthHeading text={"Log in to access unique features"} />
        <form onSubmit={handleSubmit}>
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
