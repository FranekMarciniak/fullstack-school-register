import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "../../components/Select";
import { Meta } from "../../layout/Meta";
import {
  getTimetableAction,
  clearTimetableAction,
} from "../../redux/actions/admin/timetableActions";
import { getDaysAction } from "../../redux/actions/admin/daysActions";
import { getHoursAction } from "../../redux/actions/admin/hoursActions";
import { getGroupsAction } from "../../redux/actions/admin/groupsActions";
import { deleteLessonAction } from "../../redux/actions/admin/lessonsActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import { IAdminState, IDay } from "../../types/global";
import TimetableDay from "../../components/timetable/timetableDay";
interface Props {
  admin: IAdminState;
  getTimetableAction: (group?: number) => void;
  getGroupsAction: () => void;
  clearTimetableAction: () => void;
  getHoursAction: () => void;
  getDaysAction: () => void;
  deleteLessonAction: (id: number) => void;
}

const Timetable = ({
  admin,
  getTimetableAction,
  getGroupsAction,
  clearTimetableAction,
  getDaysAction,
  getHoursAction,
  deleteLessonAction,
}: Props) => {
  const [group, setGroup] = useState(0);
  const [daysToDisplay, setDaysToDisplay] = useState([] as string[]);
  useEffect(() => {
    getHoursAction();
    getDaysAction();
  }, []);
  useEffect(() => {
    getGroupsAction();
    if (group && group !== 0) {
      getTimetableAction(group);
    } else if (group === 0) {
      clearTimetableAction();
      setDaysToDisplay([]);
    }
  }, [group]);
  useEffect(() => {
    if (admin.timetable) {
      setDaysToDisplay(Object.keys(admin.timetable));
    } else {
      setDaysToDisplay([]);
    }
  }, [admin.timetable]);
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 ">
        <main className="w-full h-full flex flex-col flex-wrap ">
          <section className="w-full mb-10 px-2 flex ">
            <Select
              options={admin.groups}
              defaultVal="Select Group"
              value={group}
              setValue={setGroup}
              keyToDisplay="name"
            />
          </section>
          <section className="flex flex-wrap items-start gap-4 ">
            {daysToDisplay.map((value: string, i: number) => (
              <div className="flex flex-col items-center">
                <h3 className="font-medium text-lg font-mono">
                  {admin.days[0]
                    ? (admin.days as any).find(
                        (day: IDay) => day.dayNumber == parseInt(value)
                      ).name
                    : null}
                </h3>
                <TimetableDay
                  key={i}
                  hours={admin.hours}
                  lessons={admin.timetable[parseInt(value)] as any}
                  deleteLesson={deleteLessonAction}
                />
              </div>
            ))}
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
  getTimetableAction,
  getGroupsAction,
  getHoursAction,
  getDaysAction,
  clearTimetableAction,
  deleteLessonAction,
})(Timetable as React.FC);
export default Routes.withRole(ConnectedComponent, "admin");
