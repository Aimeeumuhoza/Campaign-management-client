/* eslint-disable */
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  name: string;
  children: ReactNode;
  onClick: () => void;
}

export default function SideNavLink({ to, name, onClick, children }: Props) {
  return (
    <li className="group text-sm">
      <NavLink
        onClick={onClick}
        to={to}
        className={({ isActive }) =>
          `${
            isActive
              ? "flex items-center px-4 py-3 text-white bg-green-500 rounded-lg"
              : "flex items-center px-4 py-3 text-[#8D9498] hover:text-purple-600"
          } ${
            !isActive
              ? "hover:bg-gray-100 hover:rounded-md hover:text-black"
              : ""
          }`
        }
      end>
        {children}
        <span className="ml-3">{name}</span>
      </NavLink>
    </li>
  );
}
