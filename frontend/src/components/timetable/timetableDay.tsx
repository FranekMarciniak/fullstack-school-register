import React, { ReactElement, useEffect, useState } from "react";
interface Props {
  hours: any[];
  lessons: any[];
  deleteLesson?: (id: number) => void;
}

function TimetableDay({ hours, lessons, deleteLesson }: Props): ReactElement {
  const [day, setDay] = useState([] as any);
  useEffect(() => {
    const tempDay = [] as any;
    hours.forEach((hour) => {
      if (!lessons) return;
      const lesson = lessons.find(
        (lesson) => lesson.hour.periodNumber === hour.periodNumber
      );
      tempDay.push({
        periodNumber: hour.periodNumber,
        hour,
        lesson: lesson ? lesson : null,
      });
    });
    setDay(tempDay);
  }, [lessons]);
  return (
    <>
      <div
        className="flex flex-col gap-2  mt-5 border-2 "
        style={{ minWidth: "14rem" }}
      >
        {day.map((lesson: any, i: number) => {
          return (
            <div
              key={i}
              className="flex flex-col justify-start font-mono"
              style={{ minHeight: "4rem" }}
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
                      onClick={() => deleteLesson(day.id ? day.id : 0)}
                      className=" ml-2 mr-auto mt-3 px-2 py-1  rounded-md my-1 bg-red-300 hover:bg-red-500 transition-all duration-500 text-white"
                    >
                      Delete
                    </button>
                  ) : null}
                </>
              ) : (
                <p className="px-3 block">Free time</p>
              )}
              {console.log(lesson)}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TimetableDay;
