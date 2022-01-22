import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "../../components/Select";
import { Meta } from "../../layout/Meta";
import {
  getStudentsAction,
  deleteUserAction,
  clearStudents,
} from "../../redux/actions/admin/usersActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState } from "../../types/global";
import AddStudentFrom from "../../components/sections/admin/students/AddStudentForm";
import { getGroupsAction } from "../../redux/actions/admin/groupsActions";
import StudentsList from "../../components/sections/admin/students/StudentsList";
interface Props {
  getStudentsAction: (id: number) => void;
  getGroupsAction: () => void;
  clearStudents: () => void;
  deleteUserAction: (id: any) => void;
  admin: IAdminState;
}

const Add_teachers = ({
  clearStudents,
  getStudentsAction,
  admin,
  getGroupsAction,
}: Props) => {
  const [group, setGroup] = useState(0);
  useEffect(() => {
    if (group === 0) {
      clearStudents();
    } else {
      getStudentsAction(group);
    }
    getGroupsAction();
  }, [group]);

  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 lg:h-screen">
        <main className="w-full h-full flex flex-col lg:flex-row flex-wrap items-center lg:items-baseline ">
          <section className="w-full max-h-full lg:w-1/2  px-2 flex flex-col ">
            {" "}
            <h2 className="text-2xl text-center font-semibold text-font-200 ">
              Search students
            </h2>
            <Select
              options={admin.groups}
              keyToDisplay="name"
              defaultVal="Select Group"
              value={group}
              setValue={setGroup}
            />
            <StudentsList />
          </section>
          <section className="w-full lg:w-1/2 py-5 px-2 ">
            <AddStudentFrom />
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
  getStudentsAction,
  deleteUserAction,
  getGroupsAction,
  clearStudents,
})(Add_teachers as React.FC);
export default Routes.withRole(ConnectedComponent, "admin");
