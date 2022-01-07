import React, { useEffect, useState, ReactElement } from "react";
import { connect } from "react-redux";
import Input from "../../../Input";
import { IAdminState } from "../../../../types/global";
import HourCard from "../../../cards/HourCard";

interface Props {
  admin: IAdminState;
}

function CoursesList({ admin }: Props): ReactElement {
  const [search, setSearch] = useState("");
  const [hours, setHours] = useState([] as any);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => setHours(admin.hours), []);

  const handleSearch = (text: string) => {
    if (text === "") {
      setHours(admin.hours);
    } else {
      setHours(
        hours.filter(
          (hour: any) =>
            hour.intervalName.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      );
    }
  };
  return (
    <>
      <form className="mt-5">
        <Input
          name="hour name"
          placeholder="Search for the hour"
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
            ? hours.map((hour: any, i: number) => (
                <HourCard
                  hour={hour}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteHour={() => console.log("object")}
                />
              ))
            : admin.hours.map((hour: any, i: number) => (
                <HourCard
                  hour={hour}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteHour={() => console.log("object")}
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

export default connect(mapStateToProps, {})(CoursesList);
