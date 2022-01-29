import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Meta } from "../../layout/Meta";
import { getTimetableAction } from "../../redux/actions/teacher/timetableActions";
import { getDaysAction } from "../../redux/actions/admin/daysActions";
import { getHoursAction } from "../../redux/actions/admin/hoursActions";
import { getGroupsAction } from "../../redux/actions/admin/groupsActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState } from "../../types/global";
import TimetableDay from "../../components/timetable/timetableDay";
interface Props {
  admin: IAdminState;
  teacher: any;
  getTimetableAction: (group?: number) => void;
  getDaysAction: () => void;
  getHoursAction: () => void;
}

const Timetable = ({
  admin,
  teacher,
  getTimetableAction,
  getDaysAction,
  getHoursAction,
}: Props) => {
  const [daysToDisplay, setDaysToDisplay] = useState([] as string[]);
  useEffect(() => {
    getDaysAction();
    getHoursAction();
    getTimetableAction();
  }, []);
  useEffect(() => {
    setDaysToDisplay(Object.keys(teacher.timetable));
  }, [teacher.timetable]);
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 lg:h-screen">
        <main className="w-full h-full flex flex-col flex-wrap ">
          <section className="flex flex-wrap items-start gap-4 ">
            {daysToDisplay.map((value: string, i: number) => (
              <div className="flex flex-col items-center" key={i}>
                <h3 className="font-medium text-lg font-mono">
                  {admin.days[0]
                    ? admin.days.find((day) => day.dayNumber == value).name
                    : null}
                </h3>
                <TimetableDay
                  key={i}
                  hours={admin.hours}
                  lessons={teacher.timetable[parseInt(value)]}
                />
              </div>
            ))}
          </section>
        </main>
      </div>
    </Main>
  );
};
const mapStateToProps = ({
  teacher,
  admin,
}: {
  teacher: any;
  admin: IAdminState;
}) => ({
  teacher,
  admin,
});

const ConnectedComponent = connect(mapStateToProps, {
  getGroupsAction,
  getHoursAction,
  getDaysAction,
  getTimetableAction,
})(Timetable as React.FC);
export default Routes.withRole(ConnectedComponent, "teacher");
