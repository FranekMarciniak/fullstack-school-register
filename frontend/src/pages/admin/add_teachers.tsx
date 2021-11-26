import React, { useState } from "react";
import { Meta } from "../../layout/Meta";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import Input from "../../components/Input";
const Add_teachers = () => {
  const [search, setSearch] = useState("");
  console.log(search);
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
          <h1 className="text-4xl  w-full font-semibold text-font-200 text-center">
            Manage your teachers
          </h1>
          <section className="w-full h-full lg:w-1/2 py-5 px-2 flex flex-col">
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
            <div className="h-96 lg:flex-grow flex overflow-y-auto">
              <ul className="list-none">
                <li className="list-none">HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
                <li>HELLO WORLD</li>
              </ul>
            </div>
          </section>
          <section className="w-full lg:w-1/2 py-5 px-2 ">
            <form>
              <h2 className="text-2xl text-center font-semibold text-font-200 ">
                Create a teacher account
              </h2>
              <Input
                name="username"
                placeholder="Teachers username"
                onChange={(e) =>
                  setFormState({ ...formState, username: e.target.value })
                }
              />
            </form>
          </section>
        </main>
      </div>
    </Main>
  );
};
export default Routes.withRole(Add_teachers, "admin");
