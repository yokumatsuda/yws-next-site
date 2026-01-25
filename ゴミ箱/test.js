// loading.js
import { useEffect, useState } from "react";
import styles from "styles/loading.module.css";

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
      <div
        className={`${styles.loadingWrapper} ${!show ? styles.fadeOut : ""}`}
      >
        <div className={`${styles.panel} ${!show ? styles.fadeOutLeft : ""}`} />
        <div
          className={`${styles.panel} ${!show ? styles.fadeOutRight : ""}`}
        />
      </div>

      <div className={`${styles.text} ${!show ? styles.fadeOutText : ""}`}>
        <div className={styles.videoBox}>
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            {/* WebM優先。未対応環境はmp4へフォールバック */}
            <source
              src="/loading/Loading-animation-textmotion.webm"
              type="video/webm"
            />
            <source
              src="/loading/Loading-animation-textmotion.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </>
  );
}
