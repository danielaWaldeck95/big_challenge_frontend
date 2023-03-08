import { useEffect, useState } from "react";
import axios from "axios";

import { useStore } from "./store/store";

export default function Home() {
  interface IUser {
    name: string;
  }

  const { token } = useStore();

  const [user, setUser] = useState<IUser>();

  const getUser = async () => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`).then((response) => {
      setUser(response.data);
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>{user && <h1 className="text-3xl font-bold underline">Welcome {user.name}!</h1>}</div>
  );
}
