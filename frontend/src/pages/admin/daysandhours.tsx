import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Meta } from "../../layout/Meta";
import { getDaysAction } from "../../redux/actions/admin/daysActions";
import { getHoursAction } from "../../redux/actions/admin/hoursActions";
import { getClassroomsAction } from "../../redux/actions/admin/classroomsActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState } from "../../types/global";
import AddDayForm from "../../components/sections/admin/days/AddDayForm";
import DaysList from "../../components/sections/admin/days/DaysList";
import AddHourForm from "../../components/sections/admin/hours/AddHourForm";
import HoursList from "../../components/sections/admin/hours/HoursList";
interface Props {
  admin: IAdminState;
  getDaysAction: () => void;
  getClassroomsAction: () => void;
  getHoursAction: () => void;
}

const Others = ({
  getClassroomsAction,
  getDaysAction,
  getHoursAction,
}: Props) => {
  useEffect(() => {
    getDaysAction();
    getClassroomsAction();
    getHoursAction();
  }, []);
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 lg:h-screen">
        <main className="w-full h-full flex flex-col lg:flex-row flex-wrap items-center lg:items-baseline ">
          <section className="w-full max-h-full lg:w-1/2  px-2 flex flex-col ">
            <AddDayForm />
            <DaysList />
          </section>
          <section className="w-full lg:w-1/2 py-5 px-2 ">
            <AddHourForm />
            <HoursList />
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
  getDaysAction,
  getClassroomsAction,
  getHoursAction,
})(Others as React.FC);
export default Routes.withRole(ConnectedComponent, "admin");
