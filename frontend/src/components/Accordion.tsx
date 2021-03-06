import React, { ReactElement } from "react";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  // MdModeEdit,
} from "react-icons/md";

interface Props {
  children: React.ReactElement;
  open: boolean;
  closedStylesProps?: string;
  setOpen: () => void;
}

function Accordion({
  children,
  open,
  setOpen,
  closedStylesProps,
}: Props): ReactElement {
  const openStyles = "flex flex-col";
  const closedStyles = closedStylesProps
    ? closedStylesProps
    : "flex justify-around items-center";

  return (
    <div
      className={`rounded-lg shadow bg-gray-300 w-full relative flex transition-all px-3 duration-200 ${
        open ? "my-4" : "my-2"
      }`}
    >
      <div className={` py-2 my-2 w-11/12 ${open ? openStyles : closedStyles}`}>
        {children}
      </div>

      <div className="flex justify-center w-1/12 pr-4">
        {open ? (
          <button className="cursor-pointer px-3" onClick={setOpen}>
            <MdKeyboardArrowUp size="1.4em" />
          </button>
        ) : (
          <button className="cursor-pointer px-3" onClick={setOpen}>
            <MdKeyboardArrowDown size="1.4em" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Accordion;
