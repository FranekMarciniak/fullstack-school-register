import { AppProps } from "next/app";
import { Provider } from "react-redux";

import Authwrapper from "../layout/Authwrapper";
import store from "../redux/store";
import "../styles/main.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Authwrapper>
        <Component {...pageProps} />
      </Authwrapper>
    </Provider>
  );
};

export default MyApp;
