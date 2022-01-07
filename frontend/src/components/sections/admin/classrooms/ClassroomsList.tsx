import React, { useEffect, useState, ReactElement } from "react";
import { connect } from "react-redux";
import Input from "../../../Input";
import { IAdminState } from "../../../../types/global";
import ClassroomCard from "../../../cards/ClassroomCard";

interface Props {
  admin: IAdminState;
}

function ClassroomsList({ admin }: Props): ReactElement {
  const [search, setSearch] = useState("");
  const [classrooms, setClassrooms] = useState([] as any);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => setClassrooms(admin.classrooms), []);

  const handleSearch = (text: string) => {
    if (text === "") {
      setClassrooms(admin.classrooms);
    } else {
      setClassrooms(
        classrooms.filter(
          (classroom: any) =>
            classroom.name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      );
    }
  };
  return (
    <>
      <form className="mt-5">
        <Input
          name="Classroom name"
          placeholder="Search for the classroom"
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
            ? classrooms.map((classroom: any, i: number) => (
                <ClassroomCard
                  classroom={classroom}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteClassroom={() => console.log("object")}
                />
              ))
            : admin.classrooms.map((classroom: any, i: number) => (
                <ClassroomCard
                  classroom={classroom}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteClassroom={() => console.log("object")}
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

export default connect(mapStateToProps, {})(ClassroomsList);
