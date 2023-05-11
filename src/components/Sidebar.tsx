import { useState } from "react";
import { useMutation } from "react-query";
import { HomeIcon, InboxIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Router from "next/router";

import { logout } from "~/api/api";
import NavItem from "~/components/NavItem";
import { useStore } from "~/store/store";

export default function Sidebar() {
  const { setToken, setUser, token, user } = useStore();
  const [selected, setSelected] = useState("Menu");

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setToken("");
      setUser(undefined);
      Router.push("/auth");
    },
  });

  return (
    <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gray-800 px-6 text-gray-300">
        <nav className="flex flex-1 flex-col pt-10">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            <NavItem
              name="Menu"
              href="/#"
              navIcon={HomeIcon}
              selected={selected === "Menu"}
              onClick={() => setSelected("Menu")}
            />
            {user && user.role.includes("PATIENT") && (
              <NavItem
                name="New Submission"
                href="/#"
                navIcon={PlusCircleIcon}
                selected={selected === "New Submission"}
                onClick={() => setSelected("New Submission")}
              />
            )}
            {user && user.role.includes("DOCTOR") && (
              <NavItem
                name="Task History"
                href="/#"
                navIcon={InboxIcon}
                selected={selected === "Task History"}
                onClick={() => setSelected("Task History")}
              />
            )}

            <li className="-mx-6 mt-auto bg-gray-700 text-white">
              <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-400 p-3">
                  <span>{user?.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex flex-col">
                  <span aria-hidden="true">{user?.name}</span>
                  <span
                    className="cursor-pointer text-xs text-gray-300"
                    onClick={() => mutate(token)}
                  >
                    Sign out
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
