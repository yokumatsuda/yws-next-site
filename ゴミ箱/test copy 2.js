// components/Loading.jsx
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "styles/loading.module.css";
import logoWhite from "public/logo.png";

/**
 * ✅ show=trueで表示
 * ✅ show=falseでフェードアウト → フェード完了後にDOMから外す
 * ✅ 完全に消えたタイミングで onHidden を呼ぶ（Heroマウントの合図）
 *
 * 重要：setTimeout(1000) は CSS のフェード時間と一致させてください
 */
export default function Loading({ show, onHidden }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      return;
    }

    const FADE_MS = 1000; // ← CSSのフェード時間に合わせる
    const timer = setTimeout(() => {
      setVisible(false);
      onHidden?.();
    }, FADE_MS);

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
        <Image src={logoWhite} alt="YWS Logo" priority />
      </div>
    </>
  );
}
