import styles from "styles/LinkUsSection.module.css";

export default function LinkUsSection() {
  return (
    <section className={styles.LinkUsSectionContainer}>
      <h2 className={styles.LinkUsSectionTitle}></h2>
      <p className={styles.LinkUsSectionText}></p>

      {/* ▼ SNSリンク（左寄せ） */}
      <div className={styles.socialLinks}>
        <span>Follow us:</span>

        <a
          href="https://www.facebook.com/home.php"
          className={styles.socialIcon}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
            alt="Facebook icon"
            width="20"
            height="20"
          />
        </a>

        <a
          href="https://x.com/home"
          className={styles.socialIcon}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
            alt="Twitter icon"
            width="20"
            height="20"
          />
        </a>

        <a
          href="https://www.instagram.com/yoku4.9/"
          className={styles.socialIcon}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <img src="/icon/Instagram_Glyph_Gradient.png" alt="Instagram" width="20" height="20" />
        </a>
      </div>
    </section>
  );
}
