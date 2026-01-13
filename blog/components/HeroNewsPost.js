import styles from "../styles/HeroNewsPost.module.css";

function HeroNewsPost() {
  return (
    <section className={styles.heroSection} id="top">
      {/* 画像（右側 / モバイル時はトップ） */}
      <div className={styles.heroImage}></div>
    </section>
  );
}

export default HeroNewsPost;
