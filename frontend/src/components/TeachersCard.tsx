import React from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { IFetchedUser } from "../types/global";

interface Props {
  open: boolean;
  user: IFetchedUser;
}

const TeachersCard = ({ open, user }: Props) => {
  return (
    <div className="shadow bg-gray-300  w-full flex flex-wrap justify-around items-center py-2 my-2 relative">
      <p className="mx-2">{user.firstName || user.email}</p>
      {/* {I use ternary operator here so email is justify if there is no first and last name} */}
      {user.lastName ? <p className="mx-2">{user.lastName}</p> : null}

      {open ? (
        <MdKeyboardArrowUp
          className="cursor-pointer mx-2 absolute right-0"
          size="1.4em"
        />
      ) : (
        <MdKeyboardArrowDown
          className="cursor-pointer mx-2 absolute right-0"
          size="1.4em"
        />
      )}
    </div>
  );
};

export default TeachersCard;
