import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Meta } from "../../layout/Meta";
import {
  getTeachersAction,
  createUserAction,
  addErrorAction,
} from "../../redux/actions/adminActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import Input from "../../components/Input";
import SubmitButton from "../../components/buttons/SubmitButton";
import Button from "../../components/buttons/Button";
import TeachersCard from "../../components/TeachersCard";
import { IAdminState, IFetchedUser } from "../../types/global";

interface Props {
  getTeachersAction: () => void;
  createUserAction: (user: Omit<IFetchedUser, "role">, role: string) => void;
  addErrorAction: (message: string) => void;
  admin: IAdminState;
}

const Add_teachers = ({
  getTeachersAction,
  createUserAction,
  admin,
  addErrorAction,
}: Props) => {
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([] as any);
  useEffect(() => {
    getTeachersAction();
    setTeachers(admin.teachers);
  }, []);
  const [activeCard, setActiveCard] = useState(0);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const clearState = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFormState({
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formState.username &&
      formState.password &&
      formState.email &&
      formState.firstName &&
      formState.lastName
    ) {
      createUserAction(formState, "teacher");
    } else {
      //rest of the validation is done by the api
      addErrorAction("Please fill the form");
    }
  };
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
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col items-center justify-content  py-6 px-4 lg:h-screen">
        <main className="w-full h-full flex flex-col lg:flex-row flex-wrap items-center lg:items-baseline ">
          <section className="w-full max-h-full lg:w-1/2  px-2 flex flex-col ">
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
                      />
                    ))}
              </ul>
            </div>
          </section>
          <section className="w-full lg:w-1/2 py-5 px-2 ">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl text-center font-semibold text-font-200 ">
                Create a teacher account
              </h2>
              <Input
                name="Username"
                placeholder="Teachers username"
                onChange={(e) =>
                  setFormState({ ...formState, username: e.target.value })
                }
                value={formState.username}
              />
              <Input
                name="firstName"
                label="First name"
                placeholder="Teachers first name"
                onChange={(e) =>
                  setFormState({ ...formState, firstName: e.target.value })
                }
                value={formState.firstName}
              />
              <Input
                name="lastName"
                label="Last name"
                placeholder="Teachers last name"
                onChange={(e) =>
                  setFormState({ ...formState, lastName: e.target.value })
                }
                value={formState.lastName}
              />
              <Input
                name="Email"
                placeholder="Teachers email"
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                value={formState.email}
              />
              <Input
                name="Password"
                placeholder="Teachers password"
                onChange={(e) =>
                  setFormState({ ...formState, password: e.target.value })
                }
                type="password"
                value={formState.password}
              />
              <SubmitButton text="Create teacher" />
              <Button
                onClick={clearState}
                text="Clear form"
                className="ml-3 opacity-70"
              />
            </form>
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
  getTeachersAction,
  createUserAction,
  addErrorAction,
})(Add_teachers as React.FC);
export default Routes.withRole(ConnectedComponent, "admin");
