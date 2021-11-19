import React from "react";

import { Meta } from "../layout/Meta";
import Main from "../templates/Main";

const LoginPage = () => {
  const labelStyles = "block text-gray-700 text-sm font-bold mb-2";
  const inputStyles =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <form method="POST">
        <legend className="text-3xl font-bold text-gray-700 my-5">
          Login here!
        </legend>
        <fieldset className="flex flex-col justify-center items-center ">
          <label htmlFor="username" className={labelStyles}>
            username
            <input
              type="text"
              name="username"
              id="username"
              className={inputStyles}
            />
          </label>
          <label htmlFor="password" className={labelStyles}>
            password
            <input
              type="password"
              name="password"
              id="password"
              className={inputStyles}
            />
          </label>
          <input
            type="submit"
            value="Login"
            className="rounded-lg px-4 md:px-5 xl:px-4 py-2 md:py-3 xl:py-2 cursor-pointer bg-indigo-500 hover:bg-indigo-700 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md"
          />
        </fieldset>
      </form>
    </Main>
  );
};

export default LoginPage;
