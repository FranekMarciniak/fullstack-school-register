import { Meta } from "../layout/Meta";
import Main from "../templates/Main";
import Routes from "../utils/Routes";
const Admin = () => {
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <h1 className="text-2xl mt-4 font-medium">
        Admin dashboard, build in progress
      </h1>
      <p className="text-lg mt-4">
        Here is a tutorial on how to use the mars as an admin
      </p>
      <section className="flex flex-wrap max-w-5xl">
        <ol className="mt-4 text-lg">
          <li className="my-5">1. Add teachers working in your school.</li>
          <li className="my-5">
            2. Add classrooms and groups for your students (like 1A, 2B etc).
          </li>
          <li className="my-5">
            3. Create accounts for teachers and students.
            <p className="text-base mt-2">
              In the future I plan to add mailer integration
            </p>
          </li>
          <li className="mt-5">
            4. Assign teacher to the course (eg Math) and add group to it.
          </li>
          <li className="mt-5">5. Add days of the week and schedule hours.</li>
          <li className="mt-5">
            6. Just create a lesson instance with course, day of the week, hour
            and classroom
          </li>
        </ol>
      </section>
    </Main>
  );
};

export default Routes.withRole(Admin, "admin");
