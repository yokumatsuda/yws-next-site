import Image from "next/image";
import styles from "../styles/Top.module.css";

function Top() {
  return (
    <section className={styles.heroSection} id="top">
      <div className={styles.heroImage}>
        <Image
          src="/services-img/dx-image4.jpeg"
          alt="About Us"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* テキスト（左側） */}
      <div className={styles.heroContent}>
        <h1 className={styles.pageTitle}>ITをもっと簡単に</h1>
        <p className={styles.subtitle}>誰でも簡単に導入できる ITソリューションを提供します。</p>
        <div className={styles.buttonGroup}>
          <a href="/about#greeting" className={styles.heroButton}>
            代表挨拶
          </a>
          <a href="/about#services" className={styles.heroButton}>
            事業内容
          </a>
          <a href="/about#info" className={styles.heroButton}>
            お問い合わせ
          </a>
        </div>
      </div>
    </section>
  );
}

export default Top;
