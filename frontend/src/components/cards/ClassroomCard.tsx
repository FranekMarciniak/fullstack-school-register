import React from "react";
import Accordion from "../Accordion";

interface Props {
  open: boolean;
  setOpen: () => void;
  deleteClassroom: (id: number) => void;
  classroom: any;
}

const ClassroomCard = ({
  open,
  classroom,
  setOpen,
  deleteClassroom,
}: Props) => {
  return (
    <Accordion open={open} setOpen={setOpen}>
      <>
        <p className="mx-2 my-1">{classroom.name}</p>
        {open ? (
          <>
            <button
              onClick={() => deleteClassroom(classroom.id ? classroom.id : 0)}
              className="mr-auto ml-2 mt-3 px-4 py-2  rounded-md my-1 bg-red-300 hover:bg-red-500 transition-all duration-500 text-white"
            >
              Delete classroom
            </button>
          </>
        ) : null}
      </>
    </Accordion>
  );
};

export default ClassroomCard;
