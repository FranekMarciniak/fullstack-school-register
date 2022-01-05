import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Meta } from "../../layout/Meta";
import {} from "../../redux/actions/adminActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState } from "../../types/global";
interface Props {
  admin: IAdminState;
}

const Lessons = ({}: Props) => {
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 lg:h-screen">
        <main className="w-full h-full flex flex-col lg:flex-row flex-wrap items-center lg:items-baseline ">
          <section className="w-full max-h-full lg:w-1/2  px-2 flex flex-col "></section>
          <section className="w-full lg:w-1/2 py-5 px-2 "></section>
        </main>
      </div>
    </Main>
  );
};
const mapStateToProps = ({ admin }: { admin: IAdminState }) => ({
  admin,
});

const ConnectedComponent = connect(mapStateToProps, {})(Lessons as React.FC);
export default Routes.withRole(ConnectedComponent, "admin");
