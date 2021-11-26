import { Meta } from "../layout/Meta";
import Main from "../templates/Main";
import Routes from "../utils/Routes";

const Student = () => (
  <Main meta={<Meta title="Mars" description="" />}>
    <h1>Student dashboard</h1>
  </Main>
);

export default Routes.withRole(Student, "student");
