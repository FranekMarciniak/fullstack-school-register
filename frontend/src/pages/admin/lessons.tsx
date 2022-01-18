import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Meta } from "../../layout/Meta";
import { getDaysAction } from "../../redux/actions/admin/daysActions";
import { getHoursAction } from "../../redux/actions/admin/hoursActions";
import { getClassroomsAction } from "../../redux/actions/admin/classroomsActions";
import { getLessonsAction } from "../../redux/actions/admin/lessonsActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState } from "../../types/global";
import LessonsList from "../../components/sections/admin/lessons/LessonsList";
import AddLessonForm from "../../components/sections/admin/lessons/AddLessonForm";
import { getCoursesAction } from "../../redux/actions/admin/coursesActions";
interface Props {
  admin: IAdminState;
  getLessonsAction: () => void;
  getDaysAction: () => void;
  getClassroomsAction: () => void;
  getHoursAction: () => void;
  getCoursesAction: () => void;
}

const Lessons = ({
  getLessonsAction,
  getClassroomsAction,
  getDaysAction,
  getHoursAction,
  getCoursesAction,
}: Props) => {
  useEffect(() => {
    getLessonsAction();
    getDaysAction();
    getClassroomsAction();
    getHoursAction();
    getCoursesAction();
  }, []);
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 lg:h-screen">
        <main className="w-full h-full flex flex-col lg:flex-row flex-wrap items-center lg:items-baseline ">
          <section className="w-full max-h-full lg:w-1/2  px-2 flex flex-col ">
            <LessonsList />
          </section>
          <section className="w-full lg:w-1/2 py-5 px-2 ">
            <AddLessonForm />
          </section>
        </main>
      </div>
    </Main>
  );
};
const mapStateToProps = ({ admin }: { admin: IAdminState }) => ({
  admin,
});

const ConnectedComponent = connect(mapStateToProps, {
  getLessonsAction,
  getDaysAction,
  getClassroomsAction,
  getHoursAction,
  getCoursesAction,
})(Lessons as React.FC);
export default Routes.withRole(ConnectedComponent, "admin");
