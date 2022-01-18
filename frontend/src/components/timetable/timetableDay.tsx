import React, { ReactElement, useEffect, useState } from "react";

interface Props {
  hours: any[];
  lessons: any[];
}

function TimetableDay({ hours, lessons }: Props): ReactElement {
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
              className="flex flex-col h-16 justify-evenly font-mono"
            >
              <p className="block text-center bg-gray-400">
                {lesson.hour.intervalName}
              </p>
              { }{" "}
              <p className="px-3 block">
                {lesson.lesson
                  ? `${lesson.periodNumber}. ${lesson.lesson.course.name} `
                  : null}
              </p>
              <p className="px-3 block">
                {lesson.lesson
                  ? `-${lesson.lesson.course.teacher.firstName} ${lesson.lesson.course.teacher.lastName}`
                  : null}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TimetableDay;
