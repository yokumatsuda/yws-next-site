import styles from "./UsePageHeroSection.module.css";

function UsePageHeroSection() {
  return (
    <section className={styles.heroSection}>
      {/* 画像（右側 / モバイル時はトップ） */}
      <div className={styles.heroImage}>
        <img src="/services-img/use/HeroSection_img3.jpeg" alt="About Us" />
      </div>

      {/* テキスト（左側） */}
      <div className={styles.heroContent}>
        <h1 className={styles.pageTitle}>ご利用の流れ</h1>
        <p className={styles.subtitle}>簡単ステップで、すぐにサービスをご利用いただけます。</p>

        <div className={styles.buttonGroup}>
          <a href="/contact" className={styles.heroButton}>
            お問い合わせ
          </a>
          <a href="/News" className={styles.heroButton}>
            お知らせ
          </a>
          <a href="/#sectionTitle1" className={styles.heroButton}>
            Home
          </a>
        </div>
      </div>
    </section>
  );
}

export default UsePageHeroSection;
