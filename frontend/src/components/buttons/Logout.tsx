import React, { ReactElement } from "react";

import { connect } from "react-redux";

import { logoutAction } from "../../redux/actions/sessionActions";
import { IGlobalState } from "../../types/global";

function Logout({
  logoutAction,
  text = "Logout",
}: {
  logoutAction: () => void;
  text?: string;
}): ReactElement {
  return (
    <button
      className={`w-full py-3 mt-32 rounded-lg flex items-center hover:bg-indigo-600 md:hover:bg-indigo-600 transition-all duration-500 my-2  bg-indigo-400
   `}
      onClick={() => logoutAction()}
    >
      <p className="mx-auto  text-white font-medium">{text}</p>
    </button>
  );
}

const mapStateToProps = ({ global }: { global: IGlobalState }) => ({
  role: Boolean(global.user.id) ? global.user.role : null,
});

export default connect(mapStateToProps, { logoutAction })(Logout);
