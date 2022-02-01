import React, { ReactElement, useEffect, useState } from "react";
import { IHour, ILesson } from "../../types/global";
interface Props {
  hours: IHour[];
  lessons: ILesson[];
  deleteLesson?: (id: number) => void;
}

interface ITimetableLesson {
  id: number | null;
  hour: IHour;
  lesson: ILesson | null;
  periodNumber: number;
}

function TimetableDay({ hours, lessons, deleteLesson }: Props): ReactElement {
  const [day, setDay] = useState([] as ITimetableLesson[]);
  useEffect(() => {
    const tempDay = [] as Array<ITimetableLesson>;
    hours.forEach((hour) => {
      if (!lessons) return;
      const lesson = lessons.find(
        (lesson) => lesson.hour.periodNumber === hour.periodNumber
      );
      tempDay.push({
        periodNumber: hour.periodNumber,
        hour,
        lesson: lesson ? lesson : null,
        id: lesson ? lesson.id : null,
      });
    });
    setDay(tempDay);
  }, [lessons]);
  return (
    <>
      <div
        className="flex flex-col gap-2  my-7 border-2 "
        style={{ minWidth: "14rem" }}
      >
        {day.map((lesson, i: number) => {
          return (
            <div
              key={i}
              className="flex flex-col justify-start font-mono"
              style={{ minHeight: "7rem" }}
            >
              <p className="block text-center mt-0 bg-gray-400">
                {lesson.hour.intervalName}
              </p>
              {lesson.lesson ? (
                <>
                  <p className="px-3 block">
                    {lesson.periodNumber}. {lesson.lesson.course.name}
                  </p>
                  {deleteLesson ? (
                    <p className="px-3 block">
                      {lesson.lesson.course.teacher.firstName}{" "}
                      {lesson.lesson.course.teacher.lastName}
                    </p>
                  ) : (
                    <p className="px-3 block">
                      {lesson.lesson.course.group.name}
                    </p>
                  )}
                  {deleteLesson ? (
                    <button
                      onClick={() => deleteLesson(lesson.id ? lesson.id : 0)}
                      className=" ml-2 mr-auto mt-3 px-2 py-1  rounded-md my-1 bg-red-300 hover:bg-red-500 transition-all duration-500 text-white"
                    >
                      Delete
                    </button>
                  ) : null}
                </>
              ) : (
                <p className="px-3 block">Free time</p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TimetableDay;
