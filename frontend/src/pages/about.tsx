import { Meta } from "../layout/Meta";
import Main from "../templates/Main";
import Routes from "../utils/Routes";

const About = () => (
  <Main meta={<Meta title="Mars" description="" />}>
    <h1>hello</h1>
  </Main>
);

export default Routes.withRole(About, "admin");
