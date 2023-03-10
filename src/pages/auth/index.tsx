import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";

import AuthHeading from "@/components/AuthHeading";
import BaseButton from "@/components/base/BaseButton";
import InputField from "@/components/base/InputField";
import { useStore } from "../store/store";

interface IErrors {
  emailErrors: string[];
  passwordErrors: string[];
  submitError: string;
}
interface IFormValues {
  email: string;
  password: string;
}

interface IResponse {
  message: string;
  token: string;
}

const getCSRFCookie = async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_HOST}/sanctum/csrf-cookie`);
};

const login = (formValues: IFormValues) =>
  axios.post<IResponse>(`${process.env.NEXT_PUBLIC_API_URL}/login`, formValues);

export default function Auth() {
  useEffect(() => {
    getCSRFCookie();
  }, []);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const { email, password } = formValues;
  const [errors, setErrors] = useState<IErrors>({
    emailErrors: [],
    passwordErrors: [],
    submitError: "",
  });
  const { emailErrors, passwordErrors, submitError } = errors;

  const resetKey = (prevState: IErrors, keyToReset: string) => ({
    ...prevState,
    [keyToReset]: [],
  });

  const isEmailValid = (emailValue: string) => {
    setErrors((prevState) => resetKey(prevState, "emailErrors"));
    if (!/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/.test(emailValue)) {
      setErrors((prev) => ({
        ...prev,
        emailErrors: [...prev.emailErrors, "Please write a valid email"],
      }));
      return false;
    }
    return true;
  };

  const isPasswordValid = (passwordValue: string) => {
    setErrors((prevState) => resetKey(prevState, "passwordErrors"));
    let isValid = true;
    if (passwordValue.length < 8) {
      setErrors((prev) => ({
        ...prev,
        passwordErrors: [...prev.passwordErrors, "At least 8 characters"],
      }));
      isValid = false;
    }
    if (!/^(?=.*?[A-Z])/.test(passwordValue)) {
      setErrors((prev) => ({
        ...prev,
        passwordErrors: [...prev.passwordErrors, "At least one uppercase"],
      }));
      isValid = false;
    }
    if (!/^(?=.*[a-z])/.test(passwordValue)) {
      setErrors((prev) => ({
        ...prev,
        passwordErrors: [...prev.passwordErrors, "At least one lowercase"],
      }));
      isValid = false;
    }

    if (!/^(?=.*\W)/.test(passwordValue)) {
      setErrors((prev) => ({
        ...prev,
        passwordErrors: [...prev.passwordErrors, "At least one special character"],
      }));
      isValid = false;
    }
    return isValid;
  };

  const formIsValid = () => {
    const isEmailValidResult = isEmailValid(email);
    const isPasswordValidResult = isPasswordValid(password);
    return isEmailValidResult && isPasswordValidResult;
  };

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-2/3">
        <AuthHeading text={"Log in to access unique features"} />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setHasSubmitted(true);
            setErrors({ emailErrors: [], passwordErrors: [], submitError: "" });
            if (formIsValid()) {
              setIsLoading(true);
              try {
                const response = await login(formValues);
                const { message, token } = response.data;
                useStore.setState({ token });
                Router.push("/");
                toast.success(message, {
                  hideProgressBar: true,
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  if (error.response) {
                    setErrors((prev) => ({
                      ...prev,
                      submitError: "Wrong email or password",
                    }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      submitError: "Woops! Something went wrong, try again later.",
                    }));
                  }
                }
              }
              setIsLoading(false);
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
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prev) => ({ ...prev, email: value }));
                  if (hasSubmitted) isEmailValid(value);
                }}
                errors={emailErrors}
              />
              <InputField
                type="password"
                value={password}
                label="Password"
                name="password"
                onChange={(e) => {
                  const { value } = e.target;
                  setFormValues((prev) => ({ ...prev, password: value }));
                  if (hasSubmitted) isPasswordValid(value);
                }}
                errors={passwordErrors}
              />
              {submitError && <div className="text-xs text-red-500">{submitError}</div>}
            </div>
            <div className="flex flex-col items-center justify-between space-y-6">
              <BaseButton text={"Log in"} isLoading={isLoading} disabled={isLoading} />
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
