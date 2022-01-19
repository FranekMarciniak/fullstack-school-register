import React, { useEffect, useState, ReactElement } from "react";
import { connect } from "react-redux";
import Input from "../../../Input";
import { IAdminState } from "../../../../types/global";
import DayCard from "../../../cards/DayCard";
import { deleteDayAction } from "../../../../redux/actions/admin/daysActions";

interface Props {
  admin: IAdminState;
  deleteDayAction: (id: number) => void;
}

function CoursesList({ admin, deleteDayAction }: Props): ReactElement {
  const [search, setSearch] = useState("");
  const [days, setDays] = useState([] as any);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => setDays(admin.days), []);

  const handleSearch = (text: string) => {
    if (text === "") {
      setDays(admin.days);
    } else {
      setDays(
        days.filter(
          (day: any) => day.name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      );
    }
  };
  return (
    <>
      <form className="mt-5">
        <Input
          name="Day name"
          placeholder="Search for the day"
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
            ? days.map((day: any, i: number) => (
                <DayCard
                  day={day}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteDay={deleteDayAction}
                />
              ))
            : admin.days.map((day: any, i: number) => (
                <DayCard
                  day={day}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteDay={deleteDayAction}
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

export default connect(mapStateToProps, { deleteDayAction })(CoursesList);
