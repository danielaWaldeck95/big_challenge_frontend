import { ComponentType } from "react";
import Link from "next/link";

interface NavItemProps {
  href: string;
  name: string;
  navIcon: ComponentType<{ className?: string }>;
  onClick: () => void;
  selected: boolean;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavItem({ href, name, navIcon, onClick, selected }: NavItemProps) {
  const Icon = navIcon;
  return (
    <Link
      href={href}
      className={classNames(
        selected ? "bg-gray-900 text-white" : "hover:bg-gray-900 hover:text-white",
        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
      )}
      onClick={onClick}
    >
      <Icon
        className={classNames(
          selected ? "text-white" : "text-gray-300 group-hover:text-white",
          "h-6 w-6 shrink-0",
        )}
        aria-hidden="true"
      />
      {name}
    </Link>
  );
}
