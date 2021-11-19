import React, { ReactNode } from "react";
import Navbar from "../layout/Navbar";
type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const navOptions = [
    { text: "Home", href: "/" },
    { text: "Login", href: "/login/" },
    { text: "Open", href: "/about/" },
  ];
  return (
    <div className="antialiased w-full flex flex-wrap flex-row">
      {props.meta}
      <Navbar navOptions={navOptions} />
      <main className="w-full md:w-9/12 h-full flex justify-center items-center">
        {props.children}
      </main>
    </div>
  );
};

export default Main;
