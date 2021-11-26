import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Router from "next/router";
import { IGlobalState } from "../types/global";
//Just provide this compoenent with protected component and type of role eg: withRole(Dashboard, "admin")
const withRoleRoute =
  <T extends object>(Component: React.FunctionComponent<T>, type: string) =>
  (props: any) => {
    const { role, ...rest } = props;
    if (role !== type && typeof window !== "undefined") {
      Router.push("/");
    }
    return <Component {...rest} />;
  };

const Logged =
  <T extends object>(Component: React.FunctionComponent<T>) =>
  (props: any) => {
    const { role, ...rest } = props;
    if (role && typeof window !== "undefined") {
      Router.push(`/${role}/`);
    }
    return <Component {...rest} />;
  };

const mapStateToProps = ({ global }: { global: IGlobalState }) => ({
  role: Boolean(global.user.id) ? global.user.role : null,
});

const withRole = compose(connect(mapStateToProps, null), withRoleRoute);
const withoutAuth = compose(connect(mapStateToProps, null), Logged);
export default {
  withRole,
  withoutAuth,
};
