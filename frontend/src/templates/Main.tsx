import React, { ReactNode } from "react";
import Navbar from "../layout/Navbar";
type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const navOptions = [
    { text: "Open", href: "#" },
    { text: "Open", href: "#" },
    { text: "Open", href: "#" },
  ];
  return (
    <div className="antialiased w-full flex flex-wrap flex-row">
      {props.meta}
      <Navbar navOptions={navOptions} />
      {props.children}
    </div>
  );
};

export default Main;
