// loading.js

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "styles/loading.module.css";
import logoWhite from "public/logo.png";

export default function LoadingBest({ show, onHidden }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      onHidden?.(); // 完全に消えた合図
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
        <Image src={logoWhite} alt="YWS Logo" priority />
      </div>
    </>
  );
}
