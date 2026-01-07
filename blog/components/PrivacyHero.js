import styles from "styles/privacyHero.module.css";

export default function PrivacyHero() {
  return (
    <section className={styles.privacyHero}>
      <div className={styles.heroContainer}>
        <h1>プライバシーポリシー</h1>
        <p>
          ユーザーの皆様に安心してサービスをご利用いただくために、
          個人情報の取り扱いについての方針を明確にしています。
        </p>
      </div>
    </section>
  );
}
