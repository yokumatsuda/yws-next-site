// loading.js
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import styles from "styles/loading.module.css";

import animationData from "../public/lottie/loading.json";

export default function LoadingBest({ show, onHidden }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      onHidden?.();
    }, 1000);
    return () => clearTimeout(timer);
  }, [show, onHidden]);

  if (!visible) return null;

  return (
    <>
      <div className={`${styles.loadingWrapper} ${!show ? styles.fadeOut : ""}`}>
        <div className={`${styles.panel} ${!show ? styles.fadeOutLeft : ""}`} />
        <div className={`${styles.panel} ${!show ? styles.fadeOutRight : ""}`} />
      </div>

      <div className={`${styles.text} ${!show ? styles.fadeOutText : ""}`}>
        <div className={styles.lottieBox}>
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
          />
        </div>
      </div>
    </>
  );
}
