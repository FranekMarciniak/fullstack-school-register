import React from "react";
import Accordion from "./Accordion";
import { IFetchedUser } from "../types/global";

interface Props {
  open: boolean;
  user: IFetchedUser;
  setOpen: () => void;
}

const TeachersCard = ({ open, user, setOpen }: Props) => {
  return (
    <Accordion open={open} setOpen={setOpen}>
      <>
        <p className="mx-2 my-1">{user.firstName || user.email}</p>
        <p className="mx-2 my-1">{user.lastName || null}</p>{" "}
        {open ? (
          <>
            <p className="mx-2 my-1">{user.firstName ? user.email : null}</p>
            <p className="mx-2 my-1">{user.role}</p>
          </>
        ) : null}
      </>
    </Accordion>
  );
};

export default TeachersCard;
