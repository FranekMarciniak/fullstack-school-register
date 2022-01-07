import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Meta } from "../../layout/Meta";
import {
  getGroupsAction,
  getTeachersAction,
  getCoursesAction,
} from "../../redux/actions/adminActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState } from "../../types/global";
import AddCourseForm from "../../components/sections/admin/courses/AddCourseForm";
import AddGroupFrom from "../../components/sections/admin/groups/AddGroupForm";
import CoursesList from "../../components/sections/admin/courses/CoursesList";
interface Props {
  admin: IAdminState;
  getGroupsAction: () => void;
  getTeachersAction: () => void;
  getCoursesAction: () => void;
}

const CoursesPage = ({
  admin,
  getGroupsAction,
  getCoursesAction,
  getTeachersAction,
}: Props) => {
  useEffect(() => {
    getGroupsAction();
    getTeachersAction();
    getCoursesAction();
  }, []);

  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 lg:h-screen">
        <main className="w-full h-full flex flex-col lg:flex-row flex-wrap items-center lg:items-baseline ">
          <section className="w-full  lg:w-1/2 mb-10 px-2 flex flex-col ">
            <CoursesList />
          </section>
          <section className="w-full lg:w-1/2  px-2 ">
            <AddCourseForm teachers={admin.teachers} groups={admin.groups} />
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
  getGroupsAction,
  getTeachersAction,
  getCoursesAction,
})(CoursesPage as React.FC);
export default Routes.withRole(ConnectedComponent, "admin");
