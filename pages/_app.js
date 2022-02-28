import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "../store";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />;
      </>
    </Provider>
  );
}

export default MyApp;
