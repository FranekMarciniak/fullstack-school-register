import React from "react";
import Accordion from "../Accordion";
import { IFetchedUser } from "../../types/global";

interface Props {
  open: boolean;
  user: IFetchedUser;
  setOpen: () => void;
  deleteTeacher: (id: number) => void;
}

const TeachersCard = ({ open, user, setOpen, deleteTeacher }: Props) => {
  return (
    <Accordion open={open} setOpen={setOpen}>
      <>
        <p className="mx-2 my-1">{user.firstName || user.email}</p>
        <p className="mx-2 my-1">{user.lastName || null}</p>{" "}
        {open ? (
          <>
            <p className="mx-2 my-1">{user.firstName ? user.email : null}</p>
            <p className="mx-2 my-1">{user.username}</p>
            <button
              onClick={() => deleteTeacher(user.id ? user.id : 0)}
              className="mr-auto ml-2 mt-3 px-4 py-2  rounded-md my-1 bg-red-300 hover:bg-red-500 transition-all duration-500 text-white"
            >
              Delete teacher
            </button>
          </>
        ) : null}
      </>
    </Accordion>
  );
};

export default TeachersCard;
