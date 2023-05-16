import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useStore } from "~/store/store";

const paths = [
  { path: "/auth", roles: ["GUEST"] },
  { path: "/register", roles: ["GUEST"] },
  { path: "/email-verified", roles: ["GUEST"] },

  { path: "/", roles: ["DOCTOR", "PATIENT"] },
  { path: "/submission", roles: ["DOCTOR", "PATIENT"] },

  { path: "/task-history", roles: ["DOCTOR"] },

  { path: "/info", roles: ["PATIENT"] },
  { path: "/new-submission", roles: ["PATIENT"] },
];

const containsRole = (path: string, role: string): boolean => {
  const matchingPath = paths.find((item) => item.path === path);
  return matchingPath?.roles.includes(role) ?? true;
};

function getRole(role?: string) {
  if (role === "DOCTOR" || role === "PATIENT") {
    return role;
  }
  return "GUEST";
}

export const RouteGuard = (props: { children: React.ReactNode }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    function authCheck(url: string) {
      const path = url.split("?")[0];
      const pathToCheck = `/${path.split("/")[1]}`;
      const role = getRole(useStore.getState().user?.role[0]);
      if (containsRole(pathToCheck, role)) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        let redirectPath = "/";

        if (role === "GUEST") {
          redirectPath = "/auth";
        }

        router.push({
          pathname: redirectPath,
        });
      }
    }
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  if (!authorized) {
    return <></>;
  }

  return <>{props.children}</>;
};
