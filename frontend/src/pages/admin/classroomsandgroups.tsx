import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Meta } from "../../layout/Meta";
import { getClassroomsAction } from "../../redux/actions/adminActions";
import { getGroupsAction } from "../../redux/actions/admin/groupsActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState } from "../../types/global";
import AddGroupFrom from "../../components/sections/admin/groups/AddGroupForm";
import GroupsList from "../../components/sections/admin/groups/GroupsList";
import AddClassroomForm from "../../components/sections/admin/classrooms/AddClassromFrom";
import ClassroomList from "../../components/sections/admin/classrooms/ClassroomsList";
interface Props {
  admin: IAdminState;
  getClassroomsAction: () => void;
  getGroupsAction: () => void;
}

const Others = ({ getClassroomsAction, getGroupsAction }: Props) => {
  useEffect(() => {
    getClassroomsAction();
    getGroupsAction();
  }, []);
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 lg:h-screen">
        <main className="w-full h-full flex flex-col lg:flex-row flex-wrap items-center lg:items-baseline ">
          <section className="w-full max-h-full lg:w-1/2  px-2 flex flex-col ">
            <AddGroupFrom />
            <GroupsList />
          </section>
          <section className="w-full lg:w-1/2 py-5 px-2 ">
            <AddClassroomForm />
            <ClassroomList />
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
  getClassroomsAction,
  getGroupsAction,
})(Others as React.FC);
export default Routes.withRole(ConnectedComponent, "admin");
