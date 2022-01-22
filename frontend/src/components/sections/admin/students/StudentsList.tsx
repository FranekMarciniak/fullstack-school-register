import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteUserAction } from "../../../../redux/actions/admin/usersActions";
import Input from "../../../../components/Input";
import TeachersCard from "../../../cards/TeachersCard";
import { IAdminState, IFetchedUser } from "../../../../types/global";

interface Props {
  deleteUserAction: (id: any) => void;
  admin: IAdminState;
}
function StudentsList({ admin, deleteUserAction }: Props): ReactElement {
  useEffect(() => {
    setStudents(admin.students);
  }, []);

  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([] as any);
  const [activeCard, setActiveCard] = useState(0);
  const handleSearch = (text: string) => {
    if (text === "") {
      setStudents(admin.students);
    } else {
      setStudents(
        students.filter((student: IFetchedUser) => {
          const { firstName, lastName, email, username } = student;
          const isFirstName = firstName ? firstName.indexOf(text) > -1 : false;
          const isLastName = lastName ? lastName.indexOf(text) > -1 : false;
          const isEmail = email ? email.indexOf(text) > -1 : false;
          const isUsername = username ? username.indexOf(text) > -1 : false;
          return isFirstName || isLastName || isEmail || isUsername;
        })
      );
    }
  };
  return (
    <div className="mt-5">
      <form>
        <Input
          name="students"
          placeholder="Search for the student"
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
            ? students.map((student: IFetchedUser, i: number) => (
                <TeachersCard
                  user={student}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteTeacher={deleteUserAction}
                />
              ))
            : admin.students.map((student: IFetchedUser, i: number) => (
                <TeachersCard
                  user={student}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteTeacher={deleteUserAction}
                />
              ))}
        </ul>
      </div>
    </div>
  );
}
const mapStateToProps = ({ admin }: { admin: IAdminState }) => ({
  admin,
});
export default connect(mapStateToProps, { deleteUserAction })(StudentsList);
