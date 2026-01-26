import ContactPage from "./contactPage";
import styles from "styles/contactLayout.module.css";

export default function ContactLayout() {
  return (
    <div className={styles.twoColumnLayout}>
      {/* 左にしたいカラム: 画像 + テキスト */}
      <div className={styles.imageColumn}>
        <img src="services-img/HeroSection_img5.jpeg" alt="contact" className={styles.infoImage} />
        <h2 className={styles.infoTitle}>YWDにご興味をお持ちですか？</h2>
        <p className={styles.infoParagraph}>
          YWDでは、Web開発・クラウド導入・システム自動化に関するご相談を受け付けています。最適なソリューションを提案し、業務改善をサポートいたします。
          ご不明点やご相談があれば、お気軽にお問い合わせください。
        </p>
      </div>

      {/* 右にしたいカラム: お問い合わせフォーム */}
      <div className={styles.formColumn}>
        <ContactPage />
      </div>
    </div>
  );
}
