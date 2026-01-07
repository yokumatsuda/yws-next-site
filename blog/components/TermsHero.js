import styles from "styles/TermsHero.module.css";

function TermsHero() {
  return (
    <section className={styles.termsHero}>
      <div className={styles.heroContainer}>
        <h1>利用規約</h1>
        <p>
          ユーザーの皆様に安心してサービスをご利用いただくために、
          ご利用のルールと条件を明確に定めています。
        </p>
      </div>
    </section>
  );
}

export default TermsHero;
