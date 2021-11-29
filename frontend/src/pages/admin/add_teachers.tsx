import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Meta } from "../../layout/Meta";
import { getTeachersAction } from "../../redux/actions/adminActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import Input from "../../components/Input";
import SubmitButton from "../../components/buttons/SubmitButton";
import TeachersCard from "../../components/TeachersCard";

const Add_teachers = ({ getTeachersAction, admin }: any) => {
  useEffect(() => getTeachersAction(), []);
  console.log(admin);
  const [search, setSearch] = useState("");
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

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
                onChange={(e) => setSearch(e.target.value)}
              ></Input>
            </form>
            <div className=" lg:flex-grow flex overflow-y-scroll overflow-x-hidden w-full">
              <ul className="list-none w-full">
                <TeachersCard open={false}></TeachersCard>
              </ul>
            </div>
          </section>
          <section className="w-full lg:w-1/2 py-5 px-2 ">
            <form>
              <h2 className="text-2xl text-center font-semibold text-font-200 ">
                Create a teacher account
              </h2>
              <Input
                name="Username"
                placeholder="Teachers username"
                onChange={(e) =>
                  setFormState({ ...formState, username: e.target.value })
                }
              />
              <Input
                name="firstName"
                label="First name"
                placeholder="Teachers first name"
                onChange={(e) =>
                  setFormState({ ...formState, firstName: e.target.value })
                }
              />
              <Input
                name="lastName"
                label="Last name"
                placeholder="Teachers last name"
                onChange={(e) =>
                  setFormState({ ...formState, lastName: e.target.value })
                }
              />
              <Input
                name="Email"
                placeholder="Teachers email"
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
              />
              <Input
                name="Password"
                placeholder="Teachers password"
                onChange={(e) =>
                  setFormState({ ...formState, password: e.target.value })
                }
                type="password"
              />
              <SubmitButton text="Create teacher" />
            </form>
          </section>
        </main>
      </div>
    </Main>
  );
};
const mapStateToProps = ({ admin }: any) => ({
  admin: admin,
});

const ConnectedComponent = connect(mapStateToProps, { getTeachersAction })(
  Add_teachers
);
export default ConnectedComponent;
