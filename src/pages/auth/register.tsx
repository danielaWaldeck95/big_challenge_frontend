import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { z } from "zod";

import AuthHeading from "@/components/AuthHeading";
import BaseButton from "@/components/base/BaseButton";
import Input from "@/components/base/Input";
import showToast from "@/utils/showToast";
import { signUp } from "../api";

const UserTypes = ["doctor", "patient"];
const validationSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    name: z.string().min(2, { message: "Name is required" }),
    password: z
      .string()
      .min(8, { message: "At least 8 characters" })
      .regex(/^(?=.*?[A-Z])/, { message: "At least one uppercase" })
      .regex(/^(?=.*?[a-z])/, { message: "At least one lowercase" })
      .regex(/^(?=.*\W)/, { message: "At least one special character" }),
    passwordConfirmation: z.string().min(1, { message: "Confirm Password is required" }),
    userType: z.string().refine((val) => UserTypes.includes(val)),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

type FormValues = z.infer<typeof validationSchema>;

const getRegisterData = (data: FormValues) => ({
  email: data.email,
  name: data.name,
  password: data.password,
  password_confirmation: data.passwordConfirmation,
  user_type: data.userType.toUpperCase(),
});

export default function Register() {
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: { userType: "doctor" },
    resolver: zodResolver(validationSchema),
    reValidateMode: "onChange",
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: signUp,
    onError: (e) => showToast({ error: e, source: "registerUser", type: "error" }),
    onSuccess: () => {
      router.push("/auth");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(getRegisterData(data));
  };
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="w-2/3">
        <AuthHeading text={"Sign up to access unique features"} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto w-2/3">
            <div className="mb-6 grid items-start gap-6 md:grid-cols-2">
              <Input
                {...register("name")}
                id={"name"}
                name="name"
                label="Name"
                error={errors.name?.message}
                type="text"
                disabled={isLoading}
              />
              <Input
                {...register("email")}
                id={"email"}
                name="email"
                label="Email"
                error={errors.email?.message}
                type="email"
                disabled={isLoading}
              />
              <Input
                {...register("password")}
                label="Password"
                name="password"
                error={errors.password?.message}
                type="password"
                id={"password"}
                disabled={isLoading}
              />
              <Input
                {...register("passwordConfirmation")}
                name="passwordConfirmation"
                error={errors.passwordConfirmation?.message}
                type="password"
                id={"passwordConfirmation"}
                label="Repeat Password"
                disabled={isLoading}
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
                    {...register("userType")}
                    disabled={isLoading}
                    type="radio"
                    name="userType"
                    value="doctor"
                    id="doctor"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label htmlFor="doctor" className="ml-2 text-sm font-medium">
                    Doctor
                  </label>
                </div>
                <div className="flex w-full items-center border-l border-gray-300 py-2 px-3">
                  <input
                    {...register("userType")}
                    disabled={isLoading}
                    type="radio"
                    name="userType"
                    value="patient"
                    id="patient"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label htmlFor="patient" className="ml-2 text-sm font-medium">
                    Patient
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between space-y-6">
              <BaseButton text={"Sign up"} isLoading={isLoading} disabled={isLoading} />

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
