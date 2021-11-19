import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Router from "next/router";
import { Loading } from "../utils/Loading";
type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};
export const navOptions = [
  { text: "Home", href: "/" },
  { text: "Login", href: "/login/" },
  { text: "Open", href: "/about/" },
];
const Main = (props: IMainProps) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <div className="antialiased w-full flex flex-wrap flex-row">
      {props.meta}
      <Navbar navOptions={navOptions} />
      <main className="w-full md:w-9/12 h-full flex justify-center items-center">
        {loading ? <Loading /> : props.children}
      </main>
    </div>
  );
};

export default Main;
