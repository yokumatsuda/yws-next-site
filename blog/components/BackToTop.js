import { useState, useEffect } from "react";
import styles from "styles/BackToTop.module.css"; // CSSは後述

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false);
  const [stopAtFooter, setStopAtFooter] = useState(false);
  const [absoluteBottom, setAbsoluteBottom] = useState(80);

  useEffect(() => {
    const handleScroll = () => {
      // 100px以上スクロールしたらボタンを表示
      setShowButton(window.scrollY > 100);

      // フッターの検知
      const footerEl = document.getElementById("footer");
      const containerEl = document.getElementById("page-container");
      if (!footerEl || !containerEl) return;

      const footerRect = footerEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top > windowHeight) {
        // フッターまだ見えていない
        setStopAtFooter(false);
      } else {
        // フッター見え始め => ボタンを absolute 配置へ
        setStopAtFooter(true);
        const footHeight = footerEl.offsetHeight;
        setAbsoluteBottom(footHeight + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // トップへスクロール
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeClass = showButton ? styles.show : styles.hide;

  const positionStyle = stopAtFooter
    ? { position: "absolute", bottom: `${absoluteBottom}px`, right: "20px" }
    : {};

  return (
    <div className={`${styles.fixedBackToTop} ${fadeClass}`} style={positionStyle}>
      <button className={styles.backToTopButton} onClick={handleScrollToTop}>
        ↑ トップへ戻る
      </button>
    </div>
  );
}
