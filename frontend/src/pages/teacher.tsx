import { Meta } from "../layout/Meta";
import Main from "../templates/Main";
import Routes from "../utils/Routes";
const Teacher = () => {
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <h1 className="text-2xl mt-4 font-medium">
        Teacher dashboard, build in progress
      </h1>
    </Main>
  );
};

export default Routes.withRole(Teacher, "teacher");
