import React from "react";
import Link from "next/link";
interface INavButton {
  href: string;
  text: string;
  navState: string;
  setState: () => void;
}

import { MdPermIdentity } from "react-icons/md";
const NavButton = ({ href, text, setState, navState }: INavButton) => {
  const active = href === navState ? true : false;
  return (
    <Link href={href}>
      <a
        className={`w-full py-3 rounded-lg flex items-center hover:bg-gray-100 md:hover:bg-gray-200 transition-all duration-500 my-2 
       ${
         active ? "before:absolute" : "before:hidden"
       } before:w-1 before:h-7 before:bg-indigo-400  before:rounded-r-lg `}
        onClick={() => setState()}
      >
        <MdPermIdentity
          size="1.6em"
          color="var(--secondary)"
          className="ml-8"
        />
        <p className="pl-4 text-gray-600 font-medium">{text}</p>
      </a>
    </Link>
  );
};

export default NavButton;
