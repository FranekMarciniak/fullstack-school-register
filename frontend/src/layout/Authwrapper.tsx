import { ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { checkUserAction } from "../redux/actions/sessionActions";

interface Props {
  children: ReactElement;
  checkUserAction: () => void;
}

function Authwrapper({ children, checkUserAction }: Props): ReactElement {
  useEffect(() => {
    checkUserAction();
  }, []);
  return children;
}

const mapStateToProps = () => ({});

const ConnectedComponent = connect(mapStateToProps, { checkUserAction })(
  Authwrapper
);
export default ConnectedComponent;
