import React from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

interface Props {
  open: boolean;
}

const TeachersCard = ({ open }: Props) => {
  return (
    <div className="shadow-md bg-gray-300  w-full flex flex-wrap justify-around items-center py-2 my-4">
      <p className="mx-2">Franciszek</p>
      <p className="mx-2">Marciniak</p>

      {open ? (
        <MdKeyboardArrowUp className="cursor-pointer mx-2" size="1.4em" />
      ) : (
        <MdKeyboardArrowDown className="cursor-pointer mx-2" size="1.4em" />
      )}
    </div>
  );
};

export default TeachersCard;
