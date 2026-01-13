import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "styles/loading.module.css";
import logoWhite from "public/logo.png";

/**
 * ベスト版 Loading
 * - show=trueで表示
 * - show=falseでフェードアウトして消える
 * - フェードアウト後にDOMから外す（visible=false）
 */
export default function LoadingBest({ show }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      return;
    }

    // show=falseになったら、CSSアニメ(1s)のあとDOMから外す
    const timer = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(timer);
  }, [show]);

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
