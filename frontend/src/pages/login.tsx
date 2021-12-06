import React, { useState } from "react";

import { connect } from "react-redux";

import Input from "../components/Input";
import Submit from "../components/buttons/SubmitButton";
import { Meta } from "../layout/Meta";
import { loginAction } from "../redux/actions/sessionActions";
import Main from "../templates/Main";
import { IGlobalState, ILoginForm } from "../types/global";
import Routes from "../utils/Routes";

const LoginPage = ({
  loginAction,
  global,
}: {
  loginAction: (navState: ILoginForm) => void;
  global: IGlobalState;
}) => {
  const [loginState, setLoginState] = useState({ username: "", password: "" });

  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className=" flex-column items-center content-center justify-center">
        <form
          method="POST"
          className="mt-12"
          onSubmit={(e) => {
            e.preventDefault();
            loginAction(loginState);
          }}
        >
          <h1 className="text-3xl font-bold text-gray-700 my-5 text-center">
            Login here!
          </h1>
          <fieldset className="flex flex-col justify-center items-center ">
            <Input
              name="login"
              placeholder="Username"
              onChange={(e) =>
                setLoginState({ ...loginState, username: e.target.value })
              }
              value={loginState.username}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginState({ ...loginState, password: e.target.value })
              }
              value={loginState.password}
            />
            <Submit text="Login" />
          </fieldset>
        </form>
      </div>
    </Main>
  );
};
const mapStateToProps = ({ global }: { global: IGlobalState }) => ({
  global,
});

const ConnectedComponent = connect(mapStateToProps, { loginAction })(LoginPage);
export default Routes.withoutAuth(ConnectedComponent);
