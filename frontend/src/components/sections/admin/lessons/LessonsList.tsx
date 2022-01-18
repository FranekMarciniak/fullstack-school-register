import React, { useEffect, useState, ReactElement } from "react";
import { connect } from "react-redux";
import { deleteLessonAction } from "../../../../redux/actions/admin/lessonsActions";
import Input from "../../../Input";
import { IAdminState } from "../../../../types/global";
import LessonCard from "../../../cards/LessonCard";

interface Props {
  admin: IAdminState;
  deleteLessonAction: (id: number) => void;
}

function LessonsList({ admin, deleteLessonAction }: Props): ReactElement {
  const [search, setSearch] = useState("");
  const [lessons, setLessons] = useState([] as any);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => setLessons(admin.lessons), []);

  const handleSearch = (text: string) => {
    if (text === "") {
      setLessons(admin.lessons);
    } else {
      setLessons(
        lessons.filter(
          (lesson: any) =>
            lesson.course.name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      );
    }
  };
  return (
    <>
      <h2 className="text-2xl text-center font-semibold text-font-200 ">
        Lessons list
      </h2>
      <form className="mt-5">
        <Input
          name="Course name"
          placeholder="Search for the courses"
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          value={search}
        ></Input>
      </form>
      <div className=" lg:flex-grow flex overflow-y-auto overflow-x-hidden w-full">
        <ul className="list-none w-full">
          {search
            ? lessons.map((lesson: any, i: number) => (
                <LessonCard
                  lesson={lesson}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteLesson={deleteLessonAction}
                />
              ))
            : admin.lessons.map((lesson: any, i: number) => (
                <LessonCard
                  lesson={lesson}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteLesson={deleteLessonAction}
                />
              ))}
        </ul>
      </div>
    </>
  );
}
const mapStateToProps = ({ admin }: { admin: IAdminState }) => ({
  admin,
});

export default connect(mapStateToProps, { deleteLessonAction })(LessonsList);
