import React, { useState } from "react";

import { connect } from "react-redux";

import Alert from "../components/Alert";
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
  const labelStyles = "block text-gray-700 text-sm font-bold mb-2";
  const inputStyles =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex-column items-center content-center justify-center">
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
            <label htmlFor="username" className={labelStyles}>
              username
              <input
                type="text"
                name="username"
                id="username"
                className={inputStyles}
                onChange={(e) =>
                  setLoginState({ ...loginState, username: e.target.value })
                }
              />
            </label>
            <label htmlFor="password" className={labelStyles}>
              password
              <input
                type="password"
                name="password"
                id="password"
                className={inputStyles}
                onChange={(e) =>
                  setLoginState({ ...loginState, password: e.target.value })
                }
              />
            </label>
            <input
              type="submit"
              value="Login"
              className="rounded-lg px-4 md:px-5 xl:px-4 py-2 md:py-3 xl:py-2 cursor-pointer bg-indigo-500 hover:bg-indigo-700 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md"
            />
          </fieldset>
        </form>
        {global.errors && <Alert text={global.errors} color="danger" />}
      </div>
    </Main>
  );
};
const mapStateToProps = ({ global }: { global: IGlobalState }) => ({
  global,
});

const ConnectedComponent = connect(mapStateToProps, { loginAction })(LoginPage);
export default Routes.withoutAuth(ConnectedComponent);
