import React, { ReactElement } from "react";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  // MdModeEdit,
} from "react-icons/md";

interface Props {
  children: React.ReactElement;
  open: boolean;
  setOpen: () => void;
}

function Accordion({ children, open, setOpen }: Props): ReactElement {
  const openStyles = "flex-col";
  const closedStyles = "justify-around items-center";
  return (
    <div
      className={`shadow bg-gray-300 w-full relative flex transition-all duration-200 ${
        open ? "my-4" : "my-2"
      }`}
    >
      <div
        className={`flex py-2 my-2 w-11/12 ${open ? openStyles : closedStyles}`}
      >
        {children}
      </div>

      <div className="flex justify-center w-1/12 pr-4">
        {open ? (
          <button className="cursor-pointer " onClick={setOpen}>
            <MdKeyboardArrowUp size="1.4em" />
          </button>
        ) : (
          <button className="cursor-pointer " onClick={setOpen}>
            <MdKeyboardArrowDown size="1.4em" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Accordion;
