import Image from "next/image";
import styles from "./UsePageHeroSection.module.css";

function UsePageHeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroImage}>
        <Image
          src="/services-img/use/HeroSection_img3.jpg"
          alt="LET US WORK FOR YOU"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ objectFit: "cover" }} // containにしたいなら "contain"
        />
      </div>

      {/* テキスト（左側） */}
      <div className={styles.heroContent}>
        <h1 className={styles.pageTitle}>ご利用の流れ</h1>
        <p className={styles.subtitle}>簡単ステップで、すぐにサービスをご利用いただけます。</p>

        <div className={styles.buttonGroup}>
          <a href="/use#usage" className={styles.heroButton}>
            ご利用の流れ
          </a>
          <a href="/use#contact" className={styles.heroButton}>
            お問い合わせ
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
