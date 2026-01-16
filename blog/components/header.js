// components/Header2.jsx
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "styles/Header2.module.css";

export default function Header2() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null); // "solutions" | "about" | null

  const rootRef = useRef(null);
  const panelRef = useRef(null);

  // liのDOMを集める（Linkにrefを付けない）
  const itemRefs = useRef([]);
  itemRefs.current = [];
  const setItemRef = (el) => {
    if (!el) return;
    itemRefs.current.push(el);
  };

  const subSolutionsRef = useRef(null);
  const subAboutRef = useRef(null);

  const tlRef = useRef(null);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  // ====== パネル開閉アニメ：timeline 1本 ======
  useLayoutEffect(() => {
    if (!rootRef.current || !panelRef.current) return;

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const items = itemRefs.current;

      // 初期状態：閉
      gsap.set(panel, { xPercent: 100, force3D: true });
      gsap.set(items, { x: 40, opacity: 0, force3D: true });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out", overwrite: "auto" },
      });

      // パネルを先に出す
      tl.to(panel, { xPercent: 0, duration: reducedMotion ? 0 : 0.25 });

      // メニュー項目を順番に
      tl.to(
        items,
        {
          x: 0,
          opacity: 1,
          duration: reducedMotion ? 0 : 0.35,
          stagger: reducedMotion ? 0 : 0.06,
        },
        "-=0.05"
      );

      tlRef.current = tl;
    }, rootRef);

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      ctx.revert();
    };
  }, [reducedMotion]);

  // ====== open/close は play/reverse だけ ======
  useEffect(() => {
    const tl = tlRef.current;
    const panel = panelRef.current;
    if (!tl || !panel) return;

    if (panelOpen) {
      // 開く：アニメ中はスクロール無効（軽くなる）
      panel.style.overflowY = "hidden";
      tl.eventCallback("onComplete", () => {
        panel.style.overflowY = "auto";
      });
      tl.play();
    } else {
      setOpenSub(null);
      panel.style.overflowY = "hidden";
      tl.eventCallback("onReverseComplete", () => {
        panel.style.overflowY = "hidden";
      });
      tl.reverse();
    }
  }, [panelOpen]);

  // ====== サブメニュー：display切替しない（heightで開閉） ======
  const animateSubmenu = (target, open) => {
    if (!target) return;

    gsap.killTweensOf(target);

    if (reducedMotion) {
      gsap.set(target, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
      return;
    }

    if (open) {
      // autoの実寸を測ってからheightアニメ
      gsap.set(target, { height: "auto", opacity: 1 });
      const h = target.offsetHeight;
      gsap.set(target, { height: 0, opacity: 0 });
      gsap.to(target, { height: h, opacity: 1, duration: 0.2, ease: "power2.out" });
    } else {
      gsap.to(target, { height: 0, opacity: 0, duration: 0.18, ease: "power1.in" });
    }
  };

  useEffect(() => {
    animateSubmenu(subSolutionsRef.current, openSub === "solutions");
    animateSubmenu(subAboutRef.current, openSub === "about");
  }, [openSub]);

  const closePanel = () => setPanelOpen(false);
  const toggleSub = (key) => setOpenSub((prev) => (prev === key ? null : key));

  return (
    <header ref={rootRef} className={styles.customHeader}>
      <div className={styles.logoArea}>
        <Link href="/?menu=1" aria-label="Home" onClick={closePanel}>
          <img src="/logo.png" alt="YWS" className={styles.logoImage} />
        </Link>
      </div>

      <nav className={styles.customNav}>
        <ul className={styles.customNavMenu}>
          <li>
            <Link href="/blog?menu=1" onClick={closePanel}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact?menu=1" onClick={closePanel}>
              Contact
            </Link>
          </li>
          <li className={styles.hideOnMobile}>
            <Link href="/works?menu=1" onClick={closePanel}>
              Works
            </Link>
          </li>
        </ul>
      </nav>

      <button
        className={`${styles.hamburgerMenu} ${panelOpen ? styles.active : ""}`}
        onClick={() => setPanelOpen((v) => !v)}
        aria-label="メニューの切替"
        aria-expanded={panelOpen}
        aria-controls="side-panel"
      >
        <span className={`${styles.line} ${styles.top}`} />
        <span className={`${styles.line} ${styles.middle}`} />
        <span className={`${styles.line} ${styles.bottom}`} />
      </button>

      <div id="side-panel" ref={panelRef} className={styles.sidePanel}>
        <nav>
          <ul className={styles.sideMenuList}>
            <li ref={setItemRef}>
              <Link href="/" className={styles.navText} onClick={closePanel}>
                Home
              </Link>
            </li>

            <li ref={setItemRef} className={styles.menuItemWithSub}>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => toggleSub("solutions")}
                aria-expanded={openSub === "solutions"}
              >
                Solutions
              </button>

              <ul ref={subSolutionsRef} className={styles.subMenu}>
                <li>
                  <Link href="/dx" className={styles.subMenuLink} onClick={closePanel}>
                    業務効率化 & DX化
                  </Link>
                </li>
                <li>
                  <Link href="/system" className={styles.subMenuLink} onClick={closePanel}>
                    システム構築 & アプリ開発
                  </Link>
                </li>
                <li>
                  <Link href="/officework" className={styles.subMenuLink} onClick={closePanel}>
                    事務作業代行
                  </Link>
                </li>
                <li>
                  <Link href="/web" className={styles.subMenuLink} onClick={closePanel}>
                    Web制作
                  </Link>
                </li>
                <li>
                  <Link href="/use" className={styles.subMenuLink} onClick={closePanel}>
                    ご利用の流れ
                  </Link>
                </li>
              </ul>
            </li>

            <li ref={setItemRef} className={styles.menuItemWithSub}>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => toggleSub("about")}
                aria-expanded={openSub === "about"}
              >
                About Us
              </button>

              <ul ref={subAboutRef} className={styles.subMenu}>
                <li>
                  <Link href="/about#top" className={styles.subMenuLink} onClick={closePanel}>
                    私たちについて
                  </Link>
                </li>
                <li>
                  <Link href="/about#greeting" className={styles.subMenuLink} onClick={closePanel}>
                    代表挨拶
                  </Link>
                </li>
                <li>
                  <Link href="/about#services" className={styles.subMenuLink} onClick={closePanel}>
                    事業内容
                  </Link>
                </li>
                <li>
                  <Link href="/about#techList" className={styles.subMenuLink} onClick={closePanel}>
                    主要ツール・技術スタック
                  </Link>
                </li>
                <li>
                  <Link href="/about#info" className={styles.subMenuLink} onClick={closePanel}>
                    基本情報
                  </Link>
                </li>
              </ul>
            </li>

            <li ref={setItemRef}>
              <Link href="/contact" className={styles.navText} onClick={closePanel}>
                Contact
              </Link>
            </li>
            <li ref={setItemRef}>
              <Link href="/blog" className={styles.navText} onClick={closePanel}>
                Blog
              </Link>
            </li>
            <li ref={setItemRef}>
              <Link href="/works" className={styles.navText} onClick={closePanel}>
                Works
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
