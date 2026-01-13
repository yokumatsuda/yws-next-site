import { useEffect, useState } from "react";
import styles from "styles/SocialLinksFloating.module.css";

export default function SocialLinksFloating({
  label = "Follow us:",
  baseBottom = 16, // 初期 bottom(px)
  offsetWhenBtt = 60, // BackToTop出現時に上げる量(px)
  bttThreshold = 300, // BackToTopが出るスクロール量（あなたのBackToTopに合わせて調整）
}) {
  const [lift, setLift] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setLift(y > bttThreshold ? offsetWhenBtt : 0);
    };

    onScroll(); // 初期判定
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [bttThreshold, offsetWhenBtt]);

  return (
    <div
      className={styles.floating}
      style={{ bottom: `${baseBottom + lift}px` }}
      aria-label="Social links"
    >
      <span className={styles.label}>{label}</span>

      <a
        href="https://www.facebook.com/home.php"
        className={styles.icon}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
          alt="Facebook"
        />
      </a>

      <a
        href="https://x.com/home"
        className={styles.icon}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
      >
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
          alt="X"
        />
      </a>

      <a
        href="https://www.instagram.com/yoku4.9/"
        className={styles.icon}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <img src="/icon/Instagram_Glyph_Gradient.png" alt="Instagram" />
      </a>
    </div>
  );
}
