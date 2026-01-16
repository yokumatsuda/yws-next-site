import Link from "next/link";
import Image from "next/image";
import styles from "styles/services.module.css";

export default function Services() {
  return (
    <section className={styles.servicesSection} id="sectionTitle1">
      <h2 className={styles.sectionTitle}>AI × 自動化</h2>

      <div className={styles.cardContainer}>
        <Link href="/dx" className={styles.card}>
          <figure>
            <div className={styles.imageWrapper}>
              <Image
                src="/services-img/top_pageimg9.jpeg"
                alt="業務効率化 & DX化"
                width={400}
                height={225}
                priority
              />
            </div>
          </figure>

          <h3 className={styles.cardTitle}>
            業務効率化 <br className={styles.onlyMobileBr} /> &amp; DX化
          </h3>

          <p className={`${styles.cardDesc} ${styles.cardDescDesktop}`}>
            話題のChatGPTやAIツールを活用し、DX支援からペーパーレス化まで一挙に推進。生産性向上を加速させます。
          </p>
          <p className={`${styles.cardDesc} ${styles.cardDescMobile}`}>
            AI活用でDX・業務自動化を推進。
          </p>

          <span className={styles.cardButton}>詳しく見る</span>
        </Link>

        {/* 他も同様に Link 化 */}
      </div>
    </section>
  );
}
