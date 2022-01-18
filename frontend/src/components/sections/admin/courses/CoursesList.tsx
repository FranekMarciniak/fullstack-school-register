import React, { useEffect, useState, ReactElement } from "react";
import { connect } from "react-redux";
import { deleteCourseAction } from "../../../../redux/actions/admin/coursesActions";
import Input from "../../../Input";
import CourseCard from "../../../cards/CourseCard";
import { IAdminState } from "../../../../types/global";

interface Props {
  admin: IAdminState;
  deleteCourseAction: (id: number) => void;
}

function CoursesList({ admin, deleteCourseAction }: Props): ReactElement {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([] as any);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => setCourses(admin.courses), []);

  const handleSearch = (text: string) => {
    if (text === "") {
      setCourses(admin.courses);
    } else {
      setCourses(
        courses.filter(
          (course: any) =>
            course.name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      );
    }
  };
  return (
    <>
      <h2 className="text-2xl text-center font-semibold text-font-200 ">
        Courses list
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
            ? courses.map((teacher: any, i: number) => (
                <CourseCard
                  course={teacher}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteTeacher={deleteCourseAction}
                />
              ))
            : admin.courses.map((teacher: any, i: number) => (
                <CourseCard
                  course={teacher}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteTeacher={deleteCourseAction}
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

export default connect(mapStateToProps, { deleteCourseAction })(CoursesList);
