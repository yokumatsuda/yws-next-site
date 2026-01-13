import styles from "../styles/HeroWorksPost.module.css";

function HeroWorksPost() {
  return (
    <section className={styles.heroSection} id="top">
      {/* 画像（右側 / モバイル時はトップ） */}
      <div className={styles.heroImage}></div>
    </section>
  );
}

export default HeroWorksPost;
