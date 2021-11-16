import { ReactNode } from "react";

import Link from "next/link";

import { AppConfig } from "../utils/AppConfig";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full ">
    {props.meta}
    {props.children}
  </div>
);

export { Main };
