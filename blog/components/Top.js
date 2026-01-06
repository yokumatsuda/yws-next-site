import styles from "../styles/Top.module.css";

function Top() {
  return (
    <section className={styles.heroSection} id="top">
      {/* 画像（右側 / モバイル時はトップ） */}
      <div className={styles.heroImage}>
        <img
          src="https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/dx-image4.jpeg"
          alt="About Us"
        />
      </div>

      {/* テキスト（左側） */}
      <div className={styles.heroContent}>
        <h1 className={styles.pageTitle}>ITをもっと身近に、もっと簡単に。</h1>
        <p className={styles.subtitle}>誰でも簡単に導入できるITソリューションを提供します。</p>
        <div className={styles.buttonGroup}>
          <a href="/contact" className={styles.heroButton}>
            お問い合わせ
          </a>
          <a href="/use" className={styles.heroButton}>
            ご利用の流れ
          </a>
          <a href="/#sectionTitle1" className={styles.heroButton}>
            Home
          </a>
        </div>
      </div>
    </section>
  );
}

export default Top;
