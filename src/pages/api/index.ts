// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

function createHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

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
  user: IUser;
}

export const getCSRFCookie = () => {
  axios.get(`${process.env.NEXT_PUBLIC_HOST}/sanctum/csrf-cookie`);
};

export const login = (loginUser: LoginUser) =>
  axios
    .post<ILoginResponse>(`${process.env.NEXT_PUBLIC_API_URL}/login`, loginUser)
    .then(({ data }) => data);

export const signUp = (newUser: NewUser) =>
  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, newUser).then(({ data }) => data);

export const logout = async (token: string) => {
  const headers = createHeaders(token);
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {}, { headers });
};
