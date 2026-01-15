import { useEffect, useRef } from "react";
import styles from "../styles/HeroWorks.module.css";

export default function HeroNews() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const mq = window.matchMedia("(max-width: 480px)");

    const applyPoster = () => {
      // ✅ モバイル時は必ず mobile poster
      // ✅ PC時は PC poster
      v.poster = mq.matches ? "/services-img/HeroNews-mobile.webp" : "/services-img/HeroNews.webp";
    };

    applyPoster();

    // 画面回転/リサイズに追従
    mq.addEventListener?.("change", applyPoster);
    return () => mq.removeEventListener?.("change", applyPoster);
  }, []);

  return (
    <section className={styles.heroSection} id="top">
      <div className={styles.heroImage}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster="" // ✅ 重要：HTML初期値でPC poster を絶対に入れない
        >
          {/* Mobile: WebM */}
          <source
            src="/services-img/HeroNews-mobile.webm"
            type="video/webm"
            media="(max-width: 480px)"
          />
          {/* Mobile fallback: MP4 */}
          <source
            src="/services-img/HeroNews-mobile.mp4"
            type="video/mp4"
            media="(max-width: 480px)"
          />

          {/* Desktop: WebM */}
          <source src="/services-img/HeroNews.webm" type="video/webm" />
          {/* Desktop fallback: MP4 */}
          <source src="/services-img/HeroNews.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
