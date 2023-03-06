import { useEffect, useState } from "react";
import axios from "axios";

import { useStore } from "./store/store";

export default function Home() {
  const { token } = useStore();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`).then((response) => {
      // set token value
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
