import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";

import AuthHeading from "@/components/AuthHeading";
import BaseButton from "@/components/base/BaseButton";
import InputField from "@/components/base/InputField";
import { useStore } from "../store/store";

const getCSRFCookie = async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_HOST}/sanctum/csrf-cookie`);
};

export default function Auth() {
  useEffect(() => {
    getCSRFCookie();
  }, []);

  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ emailError: "", passwordError: "", submitError: "" });
  const { emailError, passwordError, submitError } = errors;
  const isEmailValid = () => {
    if (email === "") {
      setErrors((prev) => ({ ...prev, emailError: "Cannot be empty" }));
      return false;
    }
    const lastAtPos = email.lastIndexOf("@");
    const lastDotPos = email.lastIndexOf(".");

    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
      setErrors((prev) => ({ ...prev, emailError: "Please write a valid email" }));
      return false;
    }
    return true;
  };
  const isPasswordValid = () => {
    if (!/^(?=.{8,})/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        passwordError: "Password must have at least 8 characters",
      }));
      return false;
    }
    if (!/^(?=.*?[A-Z])/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        passwordError: "Password must include at least one uppercase",
      }));
      return false;
    }
    if (!/^(?=.*[a-z])/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        passwordError: "Password must include at least one lowercase",
      }));
      return false;
    }

    if (!/^(?=.*\W)/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        passwordError: "Password must include at least one special character",
      }));
      return false;
    }
    return true;
  };
  const formIsValid = () => isEmailValid() && isPasswordValid();
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-2/3">
        <AuthHeading text={"Log in to access unique features"} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setErrors({ emailError: "", passwordError: "", submitError: "" });
            if (formIsValid()) {
              setIsLoading(true);
              axios
                .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, inputValue)
                .then((response) => {
                  const token = response.data;
                  useStore.setState({ token });
                  Router.push("/");
                  toast.success("Successful login!", {
                    hideProgressBar: true,
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                })
                .catch((err) => {
                  if (err.response) {
                    setErrors((prev) => ({
                      ...prev,
                      submitError: "Wrong email or password",
                    }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      submitError: "Something went wrong, try again later.",
                    }));
                  }
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }
          }}
        >
          <div className="mx-auto w-1/3">
            <div className="mb-6 flex flex-col space-y-4">
              <InputField
                type="text"
                value={email}
                label="Email"
                name="email"
                onChange={(e) => setInputValue((prev) => ({ ...prev, email: e.target.value }))}
                error={emailError}
              />
              <InputField
                type="password"
                value={password}
                label="Password"
                name="password"
                onChange={(e) =>
                  setInputValue((prev) => ({ ...prev, password: e.target.value }))
                }
                error={passwordError}
              />
              {submitError && <div className="text-xs text-red-500">{submitError}</div>}
            </div>
            <div className="flex flex-col items-center justify-between space-y-6">
              <BaseButton text={"Log in"} isLoading={isLoading} />
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
