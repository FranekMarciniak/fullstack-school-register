import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Router from "next/router";
import { Loading } from "../utils/Loading";
import { IAdminState, IGlobalState } from "../types/global";
import { connect } from "react-redux";
import Alert from "../components/Alert";
type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  admin: IAdminState;
  global: IGlobalState;
};

const Main = (props: IMainProps) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
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
      <Navbar />
      <div className="w-full md:w-9/12 h-full flex justify-center flex-wrap flex-col items-center relative">
        {props.admin.message && <Alert text={props.admin.message} />}
        {props.admin.errors && (
          <Alert text={props.admin.errors} color="danger" />
        )}
        {loading ? <Loading /> : props.children}
      </div>
    </div>
  );
};
const mapStateToProps = ({
  admin,
  global,
}: {
  admin: IAdminState;
  global: IGlobalState;
}) => ({ admin, global });

export default connect(mapStateToProps)(Main);
