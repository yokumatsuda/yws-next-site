import Link from "next/link";
import styles from "styles/footer.module.css";

export default function Footer() {
  return (
    <footer id="footer" className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.column}>
          <h3>Yoku Web サービス</h3>
          <ul>
            <li>
              Mail: <a href="mailto:yoku@yokuweb.com">yoku@yokuweb.com</a>
            </li>
            <li>
              Tel: <a href="tel:+81762057913">076-205-7913</a>
            </li>
            {/* <li>石川県金沢市上新屋5丁目334番地</li> */}
          </ul>
        </div>

        <div className={styles.column}>
          <h3>
            <Link href="/about">事業所情報</Link>
          </h3>
          <ul>
            <li>
              <Link href="/about#greeting">代表挨拶</Link>
            </li>
            <li>
              <Link href="/about#services">事業内容</Link>
            </li>
            <li>
              <Link href="/about#techList">主要ツール・技術スタック</Link>
            </li>
            <li>
              <Link href="/about#info">基本情報</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>ソリューション</h3>
          <ul>
            <li>
              <Link href="/dx">業務効率化 &amp; DX化</Link>
            </li>
            <li>
              <Link href="/system">システム構築 &amp; アプリ開発</Link>
            </li>
            <li>
              <Link href="/officework">事務作業代行</Link>
            </li>
            <li>
              <Link href="/web">Web制作</Link>
            </li>
            <li>
              <Link href="/use">ご利用の流れ</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>ご案内</h3>
          <ul>
            <li>
              <Link href="/news">お知らせ</Link>
            </li>
            <li>
              <Link href="/contact">お問い合わせ</Link>
            </li>
            <li>
              <a href="https://yoku49.jp/" target="_blank" rel="noopener noreferrer">
                Yoku Web Designについて
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerContent2}>
        <div className={styles.column3}>
          <Link href="/privacy">プライバシーポリシー</Link>
          <Link href="/terms">利用規約</Link>
        </div>
        <div className={styles.column2}>
          <p>Copyright © 2025 YWS Yoku Web Service All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
