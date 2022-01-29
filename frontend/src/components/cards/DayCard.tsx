import React from "react";
import { IDay } from "../../types/global";
import Accordion from "../Accordion";

interface Props {
  open: boolean;
  setOpen: () => void;
  deleteDay: (id: number) => void;
  day: IDay;
}

const TeachersCard = ({ open, day, setOpen, deleteDay }: Props) => {
  return (
    <Accordion open={open} setOpen={setOpen}>
      <>
        <p className="mx-2 my-1">{day.dayNumber}</p>
        <p className="mx-2 my-1">{day.name}</p>
        {open ? (
          <>
            <button
              onClick={() => deleteDay(day.id ? day.id : 0)}
              className="mr-auto ml-2 mt-3 px-4 py-2  rounded-md my-1 bg-red-300 hover:bg-red-500 transition-all duration-500 text-white"
            >
              Delete day
            </button>
          </>
        ) : null}
      </>
    </Accordion>
  );
};

export default TeachersCard;
