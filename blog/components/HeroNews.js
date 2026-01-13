import styles from "../styles/HeroWorks.module.css";

function HeroNews() {
  return (
    <section className={styles.heroSection} id="top">
      {/* 画像（右側 / モバイル時はトップ） */}
      <div className={styles.heroImage}>
        <video
          className={`${styles.video} ${styles.videoDesktop}`}
          src="/services-img/HeroNews.mp4"
          autoPlay
          muted
          playsInline
          preload="metadata"
        />

        {/* モバイル用 */}
        <video
          className={`${styles.video} ${styles.videoMobile}`}
          src="/services-img/HeroNews-mobile.mp4"
          autoPlay
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}

export default HeroNews;
