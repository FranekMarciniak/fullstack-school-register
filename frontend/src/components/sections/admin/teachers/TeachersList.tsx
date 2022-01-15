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
function TeachersList({ admin, deleteUserAction }: Props): ReactElement {
  useEffect(() => {
    setTeachers(admin.teachers);
  }, []);

  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([] as any);
  const [activeCard, setActiveCard] = useState(0);
  const handleSearch = (text: string) => {
    if (text === "") {
      setTeachers(admin.teachers);
    } else {
      setTeachers(
        teachers.filter((teacher: IFetchedUser) => {
          const { firstName, lastName, email, username } = teacher;
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
    <div>
      <h2 className="text-2xl text-center font-semibold text-font-200 ">
        Search teacher
      </h2>
      <form>
        <Input
          name="teachers"
          placeholder="Search for the teacher"
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
            ? teachers.map((teacher: IFetchedUser, i: number) => (
                <TeachersCard
                  user={teacher}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteTeacher={deleteUserAction}
                />
              ))
            : admin.teachers.map((teacher: IFetchedUser, i: number) => (
                <TeachersCard
                  user={teacher}
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
export default connect(mapStateToProps, { deleteUserAction })(TeachersList);
