import React from "react";
import Accordion from "../Accordion";

interface Props {
  open: boolean;
  course: any;
  setOpen: () => void;
  deleteTeacher: (id: number) => void;
}

const CourseCard = ({ open, course, setOpen, deleteTeacher }: Props) => {
  return (
    <Accordion open={open} setOpen={setOpen}>
      <>
        <p className="mx-2 my-1">{course.name}</p>
        {open ? (
          <>
            <p className="mx-2 my-1">
              {`${course.teacher.firstName}  ${course.teacher.lastName}`}
            </p>
            <p className="mx-2 my-1">{course.group.name}</p>
            <button
              onClick={() => deleteTeacher(course.id ? course.id : 0)}
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

export default CourseCard;
