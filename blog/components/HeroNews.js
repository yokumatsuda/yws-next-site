import { useEffect, useRef } from "react";
import styles from "../styles/HeroWorks.module.css";

export default function HeroNews() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const mq = window.matchMedia("(max-width: 480px)");

    const applyPoster = () => {
      v.poster = mq.matches ? "/services-img/HeroNews-mobile.webp" : "/services-img/HeroNews.webp";
    };

    applyPoster();
    // 画面回転などで変わる可能性があるので追従
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
          // ここは一旦PC側を仮で入れておく（JSで上書きされる）
          poster="/services-img/HeroNews.webp"
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
