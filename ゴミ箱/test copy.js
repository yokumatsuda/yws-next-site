// components/hero-circle-animation.js
import { useEffect, useRef } from "react";
import styles from "styles/hero-circle-animation.module.css";

export default function HeroSection({
  mode = "show", // "preload" | "show"
  onHeroReady, // 動画の準備完了通知
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // ✅ 多重発火防止（loadeddata/canplay等で複数回呼ばれがち）
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      onHeroReady?.();
    };

    // ✅ 環境差を吸収：どれか来ればOK
    v.addEventListener("loadedmetadata", fire);
    v.addEventListener("loadeddata", fire);
    v.addEventListener("canplay", fire);

    if (mode === "preload") {
      // ✅ ローディング中は進めない（止める＆0秒固定）
      v.pause();
      try {
        v.currentTime = 0;
      } catch {}
      // ✅ 読み込みを促す
      v.preload = "auto";
      v.load();
    }

    return () => {
      v.removeEventListener("loadedmetadata", fire);
      v.removeEventListener("loadeddata", fire);
      v.removeEventListener("canplay", fire);
    };
  }, [mode, onHeroReady]);

  // ✅ preload は画面に出さないが、DOMに置いて読み込ませる
  const hiddenStyle =
    mode === "preload"
      ? { position: "fixed", inset: 0, opacity: 0, pointerEvents: "none" }
      : undefined;

  return (
    <section className={styles.heroSection} style={hiddenStyle}>
      <div className={styles.heroMedia}>
        <video
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay={mode === "show"} // ✅ 表示後にだけ再生
          muted
          playsInline
          preload="auto"
        >
          <source
            src="/services-img/top-hero/hero-circle-animation.webm"
            type="video/webm"
          />
          <source
            src="/services-img/top-hero/hero-circle-animation.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
}
