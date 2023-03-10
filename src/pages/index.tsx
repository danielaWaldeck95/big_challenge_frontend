import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";

import { useStore } from "./store/store";

interface IUser {
  name: string;
}

const getUser = async () => {
  const { token } = useStore.getState();
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  return axios.get<IUser>(`${process.env.NEXT_PUBLIC_API_URL}/user`);
};

export default function Home() {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    getUser()
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        Router.push("/auth");
      });
  }, []);

  return (
    <div>{user && <h1 className="text-3xl font-bold underline">Welcome {user.name}!</h1>}</div>
  );
}
