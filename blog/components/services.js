import styles from "styles/services.module.css";
import Image from "next/image";

export default function Services() {
  return (
    <>
      {/* ▼ 1. 4枚のカードを表示するセクション */}
      <section className={styles.servicesSection} id="sectionTitle1">
        <h2 className={styles.sectionTitle}> AI × 自動化</h2>

        <div className={styles.cardContainer}>
          {/* カード1 */}
          <a href="/dx" className={styles.card}>
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

            {/* ✅ PC用（長文） */}
            <p className={`${styles.cardDesc} ${styles.cardDescDesktop}`}>
              話題のChatGPTやAIツールを活用し、DX支援からペーパーレス化まで一挙に推進。
              生産性向上を加速させます。
            </p>

            {/* ✅ モバイル用（短文） */}
            <p className={`${styles.cardDesc} ${styles.cardDescMobile}`}>
              AI活用でDX・業務自動化を推進。
            </p>
            <span className={styles.cardButton}>詳しく見る</span>
          </a>

          {/* カード2 */}
          <a href="/system" className={styles.card}>
            <figure>
              <div className={styles.imageWrapper}>
                <Image
                  src="/services-img/top_pageimg7.jpeg"
                  alt="システム構築 & アプリ開発"
                  width={400}
                  height={225}
                  priority
                />
              </div>
            </figure>

            <h3 className={styles.cardTitle}>
              システム構築 &amp;
              <br className={styles.onlyMobileBr} /> アプリ開発
            </h3>

            <p className={`${styles.cardDesc} ${styles.cardDescDesktop}`}>
              オンプレからクラウドまで、幅広い業務システムを迅速に構築。
              拡張性も柔軟に対応可能です。
            </p>
            <p className={`${styles.cardDesc} ${styles.cardDescMobile}`}>
              オンプレからクラウドまで迅速に構築。
            </p>

            <span className={styles.cardButton}>詳しく見る</span>
          </a>

          {/* カード3 */}
          <a href="/officework" className={styles.card}>
            <figure>
              <div className={styles.imageWrapper}>
                <Image
                  src="/services-img/top_pageimg3.jpeg"
                  alt="事務作業代行"
                  width={400}
                  height={225}
                  priority
                />
              </div>
            </figure>

            <h3 className={styles.cardTitle}>事務作業代行</h3>
            <p className={`${styles.cardDesc} ${styles.cardDescDesktop}`}>
              勤怠データの集計や給与計算に必要なデータ整理・入力を代行。当事業所の自動化システムで結果をスピーディーに返却します。
            </p>
            <p className={`${styles.cardDesc} ${styles.cardDescMobile}`}>
              勤怠集計・給与関連データの整理／入力を代行。
            </p>
            <span className={styles.cardButton}>詳しく見る</span>
          </a>

          {/* カード4 */}
          <a href="/web" className={styles.card}>
            <figure>
              <div className={styles.imageWrapper}>
                <Image
                  src="/services-img/top_pageimg14.jpeg"
                  alt="Web制作"
                  width={400}
                  height={225}
                  priority
                />
              </div>
            </figure>
            <h3 className={styles.cardTitle}>Web制作</h3>

            <p className={`${styles.cardDesc} ${styles.cardDescDesktop}`}>
              企業サイトからECサイトまで、目的に合わせたWebを最適化。ブランド力向上にも役立ちます。
            </p>
            <p className={`${styles.cardDesc} ${styles.cardDescMobile}`}>
              企業サイトからECまで目的に合わせて制作。
            </p>

            <span className={styles.cardButton}>詳しく見る</span>
          </a>
        </div>
      </section>

      {/* ▼ 2. キャッチフレーズ＋背景イラストのセクション */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h2 className={styles.catchPhrase}>AI × DXで、時代に合わせた成長を。</h2>
          <p className={styles.subCatch}>
            デジタル変革を通じて、より効率的で革新的な働き方を実現。
          </p>
          <a href="/dx" className={styles.heroButton}>
            AI・DXについて
          </a>
        </div>
      </section>

      {/*second section */}
      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}> DX、Web制作</h2>

        <div className={styles.cardContainer}>
          {/* カード1: 業務効率化 & 自動化（DX支援） */}
          <a href="/dx" className={styles.card}>
            <figure>
              <div className={styles.imageWrapper}>
                <Image
                  src="/services-img/dx-image65.jpeg"
                  alt="DXをもっと身近に"
                  width={400} // 適切な幅
                  height={225} // 16:9 のアスペクト比
                  priority
                />
              </div>
            </figure>

            <h3 className={styles.cardTitle}>DXをもっと身近に</h3>
            <p className={`${styles.cardDesc} ${styles.cardDescDesktop}`}>
              単発での部分導入も、サブスク型の継続支援もOK。必要な範囲から始めて段階的に拡張できます。
            </p>
            <p className={`${styles.cardDesc} ${styles.cardDescMobile}`}>
              単発導入も継続支援もOK。段階的に拡張可能。
            </p>
            <span className={styles.cardButton}>詳しく見る</span>
          </a>

          {/* カード2: システム構築 & アプリ開発 */}
          <a href="/system" className={styles.card}>
            <figure>
              <div className={styles.imageWrapper}>
                <Image
                  src="/services-img/dx-image57.jpeg"
                  alt="本格的なシステム導入"
                  width={400} // 適切な幅
                  height={225} // 16:9 のアスペクト比
                  priority
                />
              </div>
            </figure>

            <h3 className={styles.cardTitle}>本格的なシステム導入</h3>

            <p className={`${styles.cardDesc} ${styles.cardDescDesktop}`}>
              小規模ツールから本格的システム開発まで対応。開発時のイニシャル費用＋サポートプランを選べるので、
              予算と機能要件をバランスよく満たします。
            </p>
            <p className={`${styles.cardDesc} ${styles.cardDescMobile}`}>
              小規模から本格開発まで対応。予算に合わせて選べます。
            </p>

            <span className={styles.cardButton}>詳しく見る</span>
          </a>

          {/* カード3: 事務作業代行 */}
          <a href="/officework" className={styles.card}>
            <figure>
              <div className={styles.imageWrapper}>
                <Image
                  src="/services-img/dx-image71.jpeg"
                  alt="あなたのIT部門代行"
                  width={400} // 適切な幅
                  height={225} // 16:9 のアスペクト比
                  priority
                />
              </div>
            </figure>

            <h3 className={styles.cardTitle}>あなたのIT部門代行</h3>

            <p className={`${styles.cardDesc} ${styles.cardDescDesktop}`}>
              日々の運用や管理業務を代行し、本来の業務に集中できる環境を提供。必要なサポートメニューを自由に選択できます。
            </p>
            <p className={`${styles.cardDesc} ${styles.cardDescMobile}`}>
              運用・管理を代行。必要なサポートを選べます。
            </p>

            <span className={styles.cardButton}>詳しく見る</span>
          </a>

          {/* カード4: Web制作（ECサイト含む） */}
          <a href="/web" className={styles.card}>
            <figure>
              <div className={styles.imageWrapper}>
                <Image
                  src="/services-img/Web-img17.jpeg"
                  alt="サイト作成から管理まで"
                  width={400} // 適切な幅
                  height={225} // 16:9 のアスペクト比
                  priority
                />
              </div>
            </figure>

            <h3 className={styles.cardTitle}>サイト作成から管理まで</h3>

            <p className={`${styles.cardDesc} ${styles.cardDescDesktop}`}>
              制作費だけでなく、一定期間のサポートも付帯可能。運用代行に切り替えれば、更新作業も負担なく続けられます。
            </p>
            <p className={`${styles.cardDesc} ${styles.cardDescMobile}`}>
              制作＋サポートもOK。運用代行で更新も楽に。
            </p>

            <span className={styles.cardButton}>詳しく見る</span>
          </a>
        </div>
      </section>

      {/* ▼ 2. キャッチフレーズ＋背景イラストのセクション */}
      <section className={styles.heroSection2}>
        <div className={styles.heroContent}>
          <h2 className={styles.catchPhrase}>DXからWeb制作までトータルサポート。</h2>
          <p className={styles.subCatch}>効率化、デザイン、自動化で次のレベルへ。</p>
          <div className={styles.heroButton2Wrapper}>
            <a href="/system" className={styles.heroButton2}>
              システム開発
            </a>
            <a href="/web" className={styles.heroButton2}>
              Webデザイン
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
