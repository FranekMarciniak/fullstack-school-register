import React from "react";

import { Meta } from "../layout/Meta";
import Main from "../templates/Main";
import Routes from "../utils/Routes";

const Index = () => {
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <h1>Hello World</h1>
    </Main>
  );
};

export default Routes.withoutAuth(Index);
