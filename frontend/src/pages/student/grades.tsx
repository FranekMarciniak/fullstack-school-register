import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Meta } from "../../layout/Meta";
import { getGradesAction } from "../../redux/actions/student/gradesActions";
import { getCoursesAction } from "../../redux/actions/teacher/coursesActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import GradesTable from "../../components/sections/student/GradesTable";
interface Props {
  student: any;
  getGradesAction: () => void;
}

const Grades = ({ getGradesAction, student }: Props) => {
  useEffect(() => {
    getGradesAction();
  }, []);

  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col flex-wrap items-center justify-content lg:h-screen ">
        <main className="w-full h-full flex flex-col flex-wrap mt-4 ">
          <section className="flex flex-wrap items-start gap-4 ">
            <GradesTable studentState={student} />
          </section>
        </main>
      </div>
    </Main>
  );
};
const mapStateToProps = ({ student }: { student: any }) => ({
  student,
});

const ConnectedComponent = connect(mapStateToProps, {
  getCoursesAction,
  getGradesAction,
})(Grades as React.FC);
export default Routes.withRole(ConnectedComponent, "student");
