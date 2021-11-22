// Hamburger is taken from this tutorial https://konradstaniszewski.com/blog/tailwind-hamburger full credits
import React from "react";

interface Props {
  setState: () => void;
  open: boolean;
}

const HamburgerButton = ({ setState, open }: Props) => {
  const genericHamburgerLine = `h-1 w-8 my-1 rounded-full bg-font-100 transition ease transform duration-300`;

  return (
    <button
      className="md:hidden absolute right-1 flex flex-col h-12 w-16 rounded justify-center items-center group"
      onClick={() => setState()}
    >
      <div
        className={`${genericHamburgerLine} ${
          open
            ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          open ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          open
            ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </button>
  );
};

export default HamburgerButton;
