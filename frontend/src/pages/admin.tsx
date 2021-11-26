import { Meta } from "../layout/Meta";
import Main from "../templates/Main";
import Routes from "../utils/Routes";

const Admin = () => (
  <Main meta={<Meta title="Mars" description="" />}>
    <h1>Admin dashboard</h1>
  </Main>
);

export default Routes.withRole(Admin, "admin");
