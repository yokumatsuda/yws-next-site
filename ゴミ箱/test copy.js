// pages/_app.js
import { useEffect } from "react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return <Component {...pageProps} />;
}
