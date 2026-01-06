// AboutPageGreetingSections.tsx

import styles from "../styles/Greeting.module.css";

function Greeting() {
  return (
    <div className={styles.greetingPageWrapper} id="greeting">
      <section className={styles.greetingSection}>
        <div className={styles.greetingInner}>
          <div className={styles.profileWrapper}>
            <div className={styles.photoWrapper}>
              <img
                src="https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/icon/%E6%9D%BE%E7%94%B0%E9%A1%94%E5%86%99%E7%9C%9F2.jpg"
                alt="代表写真"
                className={styles.profilePhoto}
              />
            </div>
            <div className={styles.profileText}>
              <p className={styles.representativeRole}>代表者</p>
              <h3 className={styles.representativeName}>
                松田 翼 <span className={styles.smallText}>(マツダ ヨク)</span>
              </h3>
            </div>
          </div>

          {/* 代表あいさつ */}
          <div className={styles.greetingContent}>
            <h2 className={styles.sectionTitle2}>ご挨拶</h2>
            <br></br>
            <h2 className={styles.sectionTitle}>
              お客様に寄り添うITパートナー - Yoku Web サービス
            </h2>
            <p className={styles.greetingText}>
              <span className={styles.highlight}> 「DX」「業務効率化」「ペーパーレス」 </span>{" "}
              など、 IT技術の活用は、 <span className={styles.highlight}> 人手不足の解消 </span>{" "}
              や業務負担の軽減 に大きく貢献します。
              しかし、システム導入には「コストがかかる」「使いこなせるか不安」
              といった懸念もあるのが現実です。
            </p>
            <p className={styles.greetingText}>
              私たちは、お客様の課題に寄り添い、 IT技術を活用した{" "}
              <span className={styles.highlight}>業務効率化</span>を サポートすることで、
              無駄な作業を減らし、より本質的な業務に集中できる環境 を 提供します。
            </p>
            <p className={styles.greetingText}>
              <span className={styles.highlight}>「ITを、もっと身近に、もっと簡単に。」</span>
              技術の壁を感じることなく、安心して業務を効率化できるよう、
              私たちは最適なソリューションをご提案いたします。
            </p>
          </div>
        </div>
      </section>

      {/* 2) 事業所のミッション・ビジョンセクション */}
      <section className={styles.missionVisionSection}>
        {/* 2) 今後の展望 */}
        <div className={styles.visionWrapper}>
          <h3 className={styles.subTitle}>今後の展望</h3>
          <p className={styles.visionText}>
            私たちは、ITの力でお客様のビジネスを支援するだけでなく、
            DXを誰もがスムーズに導入できる環境 を整えていきます。 特に、
            <span className={styles.highlight}>AI・クラウド・自動化技術</span>
            を活用し、 業務負担の軽減や人手不足の解消 をサポートするソリューションを提供します。
          </p>

          <ul className={styles.visionList}>
            <li>
              <strong>📌 電子契約・書類管理システムの強化</strong>
              <p>
                紙の契約書や業務をデジタル化し、 シームレスなワークフローを実現。
                誰でも簡単に導入できる、
                <span className={styles.highlight}>直感的な操作性</span>
                のシステムを提供します。
              </p>
            </li>
            <li>
              <strong>📌 AI・自動化技術による業務効率化</strong>
              <p>
                データ入力の自動化、クラウド管理、チャットボットの導入など、
                <span className={styles.highlight}>企業の実態に合った最適なDX支援</span>
                を行います。
              </p>
            </li>
            <li>
              <strong>📌 ITの壁をなくし、誰でも使いやすいシステムへ</strong>
              <p>
                最新技術を難しいものではなく、 誰でも直感的に使える環境として提供。
                導入前後のサポートも充実させ、お客様が安心してDXを進められるようにします。
              </p>
            </li>
          </ul>

          <p className={styles.visionText}>
            「ITを、もっと身近に、もっと簡単に。」
            お客様の成長を支援するパートナーとして、これからも進化し続けます。
          </p>
        </div>
      </section>

      {/* 3) 提供サービス・事業内容セクション */}

      <section className={styles.servicesSection} id="services">
        <h2 className={styles.subTitle}>提供サービス・事業内容</h2>

        <ul className={styles.serviceList}>
          <li>
            <strong>✅ ITコンサルティング：</strong>
            お客様のビジネス課題やシステム要件をヒアリングし、最適なテクノロジー導入をサポート。
          </li>
          <li>
            <strong>✅ Web開発 / Webアプリ開発：</strong>
            React / TypeScript / Next.js / Node.js / JavaScript
            などを用いたモダンなWebサービスの構築。
          </li>
          <li>
            <strong>✅ オンプレミス／クラウドのシステム構築・運用：</strong>
            AWSをはじめとするクラウドサービス導入や既存インフラの最適化。
          </li>
          <li>
            <strong>✅ DXソリューション・業務自動化：</strong>
            Googleスプレッドシート、Microsoft Office 365、GAS、Python、PHPなどを活用し、
            <span className={styles.highlight}>ペーパーレス化や事務作業の自動化</span>
            （契約書・見積書・請求書などの電子化や電子契約導入）、事務作業代行などを行います。
          </li>
          <li>
            <strong>✅ 事務作業・データ処理の代行：</strong>
            ExcelやGoogleスプレッドシートを活用したデータ入力・整理、メール対応や帳票作成など、
            <span className={styles.highlight}>幅広い事務作業を請け負い</span>
            、お客様の業務効率を高めます。
          </li>
          <li>
            <strong>✅ Webサイト・ECサイト制作：</strong>
            WordPress, Adobe系ツール, Canva などを使い分け、デザインから実装まで対応。
            <span className={styles.highlight}>小規模ECサイトの構築・運用支援</span> も可能。
          </li>
          <li>
            <strong>✅ 電子契約サービス・書類管理システム：</strong>
            契約書や各種書類をデジタルで作成・管理・署名できる仕組みを構築。
            <span className={styles.highlight}>ペーパーレス化の促進、業務効率アップ</span> を支援。
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Greeting;
