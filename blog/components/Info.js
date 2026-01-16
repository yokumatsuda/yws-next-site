import styles from "../styles/Info.module.css";
import Link from "next/link";

function ContactSection() {
  return (
    <section className={styles.ContactSection} id="info">
      <h2 className={styles.sectionTitle}>基本情報 / お問い合わせ</h2>

      {/* 基本情報 */}
      <div className={styles.infoBlock}>
        <h3 className={styles.subTitle}>事業所基本情報</h3>
        <ul className={styles.infoList}>
          <li>
            <strong>事業所名：</strong>Yoku ウェブ サービス
          </li>
          <li>
            <strong>代表名：</strong>松田 翼 <span className={styles.smallText}>(マツダ ヨク)</span>
          </li>
          <li>
            <strong>所在地：</strong>石川県金沢市上新屋5丁目334番地
          </li>
          <li>
            <strong>電話番号：</strong>076-205-7913
          </li>
          <li>
            <strong>メール：</strong>
            <a href="mailto:info@example.com">yoku@yokuweb.com</a>
          </li>
        </ul>
      </div>

      {/* 連絡先 & お問い合わせ */}
      <div className={styles.contactBlock}>
        <h3 className={styles.subTitle}>お問い合わせ方法</h3>
        <p>
          ご相談やお見積もり、その他お問い合わせはメールまたはお電話にて受け付けております。
          <br />
          お急ぎの場合はお電話いただけるとスムーズです。
        </p>
        <p className={styles.contactDetails}>
          <strong>メール：</strong>
          <a href="mailto:yoku@yokuweb.com">yoku@yokuweb.com</a>
          <br />
          <strong>電話：</strong>076-205-7913
        </p>
        <p>（平日9:00〜18:00 / 土日祝は休業）</p>

        {/* お問い合わせボタン */}
        <div className={styles.buttonContainer}>
          <Link href="/contact" className={styles.contactButton}>
            お問い合わせフォーム
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
