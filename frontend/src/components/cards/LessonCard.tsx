import React from "react";
import Accordion from "../Accordion";

interface Props {
  open: boolean;
  lesson: any;
  setOpen: () => void;
  deleteLesson: (id: number) => void;
}

const LessonCard = ({ open, lesson, setOpen, deleteLesson }: Props) => {
  return (
    <Accordion
      closedStylesProps="grid grid-cols-2 grid-row-2"
      open={open}
      setOpen={setOpen}
    >
      <>
        <p className="mx-2 my-1">
          <strong> {lesson.hour.periodNumber}. </strong>{" "}
          {lesson.hour.intervalName}
        </p>
        <p className="mx-2 my-1">{lesson.day.name}</p>
        <p className="mx-2 my-1">{lesson.course.name}</p>
        <p className="mx-2 my-1">{lesson.course.group.name}</p>
        {open ? (
          <>
            <p className="mx-2 my-1">
              {`${lesson.course.teacher.firstName}  ${lesson.course.teacher.lastName}`}
            </p>

            <p className="mx-2 my-1">{lesson.classroom.name}</p>
            <button
              onClick={() => deleteLesson(lesson.id ? lesson.id : 0)}
              className="mr-auto ml-2 mt-3 px-4 py-2  rounded-md my-1 bg-red-300 hover:bg-red-500 transition-all duration-500 text-white"
            >
              Delete lesson
            </button>
          </>
        ) : null}
      </>
    </Accordion>
  );
};

export default LessonCard;
