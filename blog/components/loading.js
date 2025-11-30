// components/loading.js
import { useEffect, useState } from "react";
import styles from "styles/loading.module.css";
import Image from "next/image";
import logoWhite from "public/images-post/logo-white.png"; 


export default function Loading({ show }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (!show) {
      const timer = setTimeout(() => setVisible(false), 1000); // CSSのdurationと同期
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <>
      <div className={`${styles.loadingWrapper} ${!show ? styles.fadeOut : ""}`}>
        <div className={`${styles.panel} ${!show ? styles.fadeOutLeft : ""}`}></div>
        <div className={`${styles.panel} ${!show ? styles.fadeOutRight : ""}`}></div>
      </div>
        <div className={`${styles.text} ${!show ? styles.fadeOutText : ""}`}>
        <Image
          src={logoWhite}
          alt="YWS Logo"
          priority          
        />
      </div>
    </>
  );
}
