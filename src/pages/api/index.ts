// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export type NewUser = {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  user_type: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

interface ILoginResponse {
  message: string;
  token: string;
}

export const getCSRFCookie = async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_HOST}/sanctum/csrf-cookie`);
};

export const login = (formValues: LoginUser) =>
  axios
    .post<ILoginResponse>(`${process.env.NEXT_PUBLIC_API_URL}/login`, formValues)
    .then(({ data }) => data);

export const signUp = async (data: NewUser) => {
  const { data: response } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/signup`,
    data,
  );
  return response.data;
};
