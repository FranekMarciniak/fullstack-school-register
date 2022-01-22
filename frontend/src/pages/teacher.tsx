import { Meta } from "../layout/Meta";
import Main from "../templates/Main";
import Routes from "../utils/Routes";
const Teacher = () => {
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <h1>Teacher dashboard</h1>
    </Main>
  );
};

export default Routes.withRole(Teacher, "teacher");
