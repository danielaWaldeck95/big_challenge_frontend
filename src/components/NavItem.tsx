import { ComponentType } from "react";
import Link from "next/link";

import { tw } from "~/merge-classNames";

interface NavItemProps {
  href: string;
  name: string;
  navIcon: ComponentType<{ className?: string }>;
  onClick: () => void;
  selected: boolean;
}

export function NavItem({ href, name, navIcon, onClick, selected }: NavItemProps) {
  const Icon = navIcon;
  return (
    <Link
      href={href}
      className={tw(
        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-gray-900 hover:text-white",
        selected ? "bg-gray-900 text-white" : "",
      )}
      onClick={onClick}
    >
      <Icon
        className={tw(
          "h-6 w-6 shrink-0 text-gray-300 group-hover:text-white",
          selected ? "text-white" : "",
        )}
        aria-hidden="true"
      />
      {name}
    </Link>
  );
}
