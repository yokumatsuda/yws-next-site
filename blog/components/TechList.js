import styles from "../styles/TechList.module.css";

function TechList() {
  return (
    <section className={styles.ServicesSection} id="techList">
      <div className={styles.sectionTitleWrapper}>
        <h2 className={styles.sectionTitle}>技術・ツール & 強み</h2>
      </div>

      <div className={styles.techStrengthWrapper}>
        {/* 技術・ツール */}
        <div className={styles.techToolsBlock}>
          <h2 className={styles.sectionsubTitle}>技術・ツール</h2>
          <p className={styles.subHeadline}>主要ツール・技術スタック</p>
          <ul className={styles.techList}>
            <li>
              <strong>Webフロント：</strong>React, TypeScript, Next.js, JavaScript, Node.js
            </li>
            <li>
              <strong>バックエンド：</strong>Python, PHP, AWS
            </li>
            <li>
              <strong>スクリプト / 自動化：</strong>GAS, ChatGPT Pro, Microsoft Office 365,
              Googleスプレッドシート
            </li>
            <li>
              <strong>デザイン：</strong>Adobe（Firefly, Photoshop, AdobeExpress）, Canva, Figma,
              miro
            </li>
            <li>
              <strong>保有PC台数：</strong>3台
            </li>
          </ul>
        </div>

        {/* 強み・特徴 */}
        <div className={styles.strengthsBlock}>
          <h2 className={styles.sectionsubTitle}>強み・特徴</h2>
          <ul className={styles.strengthsList}>
            <li>
              <strong>最新技術やAIの積極活用：</strong>
              自社開発ツールやAIを組み合わせた迅速でローコストな開発を実現。複雑な問題も手軽に解決できる柔軟性があります。
            </li>
            <li>
              <strong>幅広い規模の案件に対応：</strong>
              小規模案件（個人サイト、ECサイト）から、大規模開発（システム統合・DX推進）まで柔軟にサポート可能です。
            </li>
            <li>
              <strong>独自の発想力 × クライアント目線：</strong>
              他社にはないオリジナルソリューションを提案し、コストや納期など実務レベルの目線で親身にサポートします。
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TechList;
