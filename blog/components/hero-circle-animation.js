// components/hero-circle-animation.js
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "styles/hero-circle-animation.module.css";

const MOBILE_MAX = 1023; // ここ以下をモバイル扱い（必要なら調整）

export default function HeroSection({
  mode = "show", // "preload" | "show"
  onHeroReady,
}) {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ 初回＆リサイズでモバイル判定
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();

    // addEventListenerが使えない古い環境も一応ケア
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  // ✅ 端末別の動画パス
  const sources = useMemo(() => {
    if (isMobile) {
      return {
        webm: "/services-img/top-hero/hero-circle-animation-mobile.webm",
        mp4: "/services-img/top-hero/hero-circle-animation-mobile.mp4",
      };
    }
    return {
      webm: "/services-img/top-hero/hero-circle-animation.webm",
      mp4: "/services-img/top-hero/hero-circle-animation.mp4",
    };
  }, [isMobile]);

  // ✅ 再読み込みが必要なので key を変える
  const videoKey = `${mode}-${isMobile ? "m" : "d"}`;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // ✅ 多重発火防止
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      onHeroReady?.();
    };

    v.addEventListener("loadedmetadata", fire);
    v.addEventListener("loadeddata", fire);
    v.addEventListener("canplay", fire);

    if (mode === "preload") {
      // ✅ ローディング中は進めない（止める＆0秒固定）
      v.pause();
      try {
        v.currentTime = 0;
      } catch {}
      v.preload = "auto";
      v.load(); // ✅ 読み込みを促す
    }

    return () => {
      v.removeEventListener("loadedmetadata", fire);
      v.removeEventListener("loadeddata", fire);
      v.removeEventListener("canplay", fire);
    };
  }, [mode, onHeroReady, videoKey]);

  // ✅ preload は画面に出さない
  const hiddenStyle =
    mode === "preload"
      ? { position: "fixed", inset: 0, opacity: 0, pointerEvents: "none" }
      : undefined;

  return (
    <section className={styles.heroSection} style={hiddenStyle}>
      <div className={styles.heroMedia}>
        <video
          key={videoKey}
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay={mode === "show"}
          muted
          playsInline
          preload="auto"
        >
          {/* webmが無い場合はこの行を消してOK */}
          <source src={sources.webm} type="video/webm" />
          <source src={sources.mp4} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
