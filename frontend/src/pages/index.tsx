import React from "react";

import { Meta } from "../layout/Meta";
import Main from "../templates/Main";

const Index = () => {
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <h1>Hello World</h1>
    </Main>
  );
};

export default Index;
