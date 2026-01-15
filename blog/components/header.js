// import Container from "components/container";
// import Logo from "components/logo";
// import Nav from "components/nav";
// import styles from "styles/header.module.css";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "styles/Header2.module.css";

// export default function Header() {
//   return (
//     <header>
//       <Container large>
//         <div className={styles.flexContainer}>
//           <Logo boxOn />
//           <Nav />
//         </div>
//       </Container>
//     </header>
//   );
// }

const Header2 = () => {
  // =========================
  // サイドパネル開閉
  // =========================
  const [panelOpen, setPanelOpen] = useState(false);

  const handleHamburgerClick = () => {
    setPanelOpen(!panelOpen);
  };

  // GSAP用: サイドパネル内のリンク参照配列
  const navLinksRef = useRef([]);

  // GSAP アニメ設定
  const ANIM_DURATION = 0.5;
  const ANIM_STAGGER = 0.15;
  const START_X = 600;

  const animateNavIn = () => {
    gsap.set(navLinksRef.current, { x: START_X, opacity: 0 });
    gsap.to(navLinksRef.current, {
      x: 0,
      opacity: 1,
      duration: ANIM_DURATION,
      stagger: ANIM_STAGGER,
      ease: "power2.out",
    });
  };

  const animateNavOut = () => {
    gsap.to(navLinksRef.current, {
      x: START_X,
      opacity: 0,
      duration: ANIM_DURATION * 0.3,
      stagger: 0,
      ease: "power1.in",
    });
  };

  // =========================
  // サブメニュー State
  // =========================
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // パネルを開閉したときのアニメーション
  useEffect(() => {
    if (panelOpen) {
      animateNavIn();
    } else {
      setSolutionsOpen(false);
      setAboutOpen(false);
      animateNavOut();
    }
  }, [panelOpen]);

  // =========================
  // サブメニュークリック
  // =========================
  const handleSolutionsClick = (e) => {
    e.preventDefault();
    setSolutionsOpen(!solutionsOpen);
    setAboutOpen(false);
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setAboutOpen(!aboutOpen);
    setSolutionsOpen(false);
  };

  return (
    <header className={styles.customHeader}>
      {/* ロゴ */}
      <div className={styles.logoArea}>
        <Link href="/">
          <img src="/logo.png" alt="YWS" className={styles.logoImage} />
        </Link>
      </div>

      {/* PC用 ナビ */}
      <nav className={styles.customNav}>
        <ul className={styles.customNavMenu}>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li className={styles.hideOnMobile}>
            <Link href="/works">Works</Link>
          </li>
        </ul>
      </nav>

      {/* ハンバーガー */}
      <button
        className={`${styles.hamburgerMenu} ${panelOpen ? styles.active : ""}`}
        onClick={handleHamburgerClick}
        aria-label="メニューの切替"
      >
        <span className={`${styles.line} ${styles.top}`}></span>
        <span className={`${styles.line} ${styles.middle}`}></span>
        <span className={`${styles.line} ${styles.bottom}`}></span>
      </button>

      {/* サイドパネル */}
      <div className={`${styles.sidePanel} ${panelOpen ? styles.active : ""}`}>
        <nav>
          <ul>
            <li>
              <Link
                href="/"
                ref={(el) => el && (navLinksRef.current[0] = el)}
                className={styles.navText}
                onClick={() => setPanelOpen(false)}
              >
                Home
              </Link>
            </li>

            <li className={styles.menuItemWithSub}>
              <Link
                href="/solution"
                ref={(el) => el && (navLinksRef.current[1] = el)}
                className={styles.navText}
                onClick={handleSolutionsClick}
              >
                Solutions
              </Link>
              <ul className={styles.subMenu} style={{ display: solutionsOpen ? "block" : "none" }}>
                <li>
                  <Link
                    href="/dx"
                    className={styles.subMenuLink}
                    onClick={() => setPanelOpen(false)}
                  >
                    業務効率化 & DX化
                  </Link>
                </li>
                <li>
                  <Link
                    href="/system"
                    className={styles.subMenuLink}
                    onClick={() => setPanelOpen(false)}
                  >
                    システム構築 & アプリ開発
                  </Link>
                </li>
                <li>
                  <Link
                    href="/officework"
                    className={styles.subMenuLink}
                    onClick={() => setPanelOpen(false)}
                  >
                    事務作業代行
                  </Link>
                </li>
                <li>
                  <Link
                    href="/web"
                    className={styles.subMenuLink}
                    onClick={() => setPanelOpen(false)}
                  >
                    Web制作
                  </Link>
                </li>
                <li>
                  <Link
                    href="/use"
                    className={styles.subMenuLink}
                    onClick={() => setPanelOpen(false)}
                  >
                    ご利用の流れ
                  </Link>
                </li>
              </ul>
            </li>

            <li className={styles.menuItemWithSub}>
              <Link
                href="/about"
                ref={(el) => el && (navLinksRef.current[2] = el)}
                className={styles.navText}
                onClick={handleAboutClick}
              >
                About Us
              </Link>
              <ul className={styles.subMenu} style={{ display: aboutOpen ? "block" : "none" }}>
                <li>
                  <Link
                    href="/about#top"
                    className={styles.subMenuLink}
                    onClick={() => setPanelOpen(false)}
                  >
                    私たちについて
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#greeting"
                    className={styles.subMenuLink}
                    onClick={() => setPanelOpen(false)}
                  >
                    代表挨拶
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#services"
                    className={styles.subMenuLink}
                    onClick={() => setPanelOpen(false)}
                  >
                    事業内容
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#techList"
                    className={styles.subMenuLink}
                    onClick={() => setPanelOpen(false)}
                  >
                    主要ツール・技術スタック
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#info"
                    className={styles.subMenuLink}
                    onClick={() => setPanelOpen(false)}
                  >
                    基本情報
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                href="/contact"
                ref={(el) => el && (navLinksRef.current[3] = el)}
                className={styles.navText}
                onClick={() => setPanelOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                ref={(el) => el && (navLinksRef.current[4] = el)}
                className={styles.navText}
                onClick={() => setPanelOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/works"
                ref={(el) => el && (navLinksRef.current[5] = el)}
                className={styles.navText}
                onClick={() => setPanelOpen(false)}
              >
                Works
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header2;
