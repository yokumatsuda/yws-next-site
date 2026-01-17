// _app.js
import "styles/globals.css";
import Layout from "components/layout";
import { useEffect } from "react";

// Font Awesomeの設定
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
