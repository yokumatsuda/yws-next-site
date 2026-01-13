// Hero.js
import { useState, useRef, useEffect, createRef } from "react";
import styles from "styles/hero.module.css";

// モバイル判定
function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= breakpoint);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, [breakpoint]);

  return isMobile;
}

// スライダーのデータ
const sliderData = [
  {
    id: 1,
    mediaType: "video",
    mediaSrc: "/video/2-3.mp4",
    mobileSrc: "/video/mobile2-6.mp4",
    subtitle: (
      <p className={`${styles.appLabelSubtitle} ${styles.appSliderReveal}`}>
        ITをもっと身近に、もっと簡単に
      </p>
    ),
    title: (
      <h1 className={`${styles.appHeroTitle} ${styles.appSliderReveal}`}>
        すべての人に使いやすい<br />ITソリューションを
      </h1>
    ),
    text: (
      <p className={`${styles.appHeroText} ${styles.appSliderReveal}`}>
        ITに詳しくなくても、スムーズに導入・活用できます。
      </p>
    ),
  },
  {
    id: 2,
    mediaType: "video",
    mediaSrc: "/video/2-7.mp4",
    mobileSrc: "/video/mobile2-2.mp4",
    subtitle: (
      <p className={`${styles.appLabelSubtitle} ${styles.appSliderReveal}`}>
        もっと手軽にITを活用
      </p>
    ),
    title: (
      <h1 className={`${styles.appHeroTitle} ${styles.appSliderReveal}`}>
        DXをもっと身近に、<br />もっと簡単に
      </h1>
    ),
    text: (
      <p className={`${styles.appHeroText} ${styles.appSliderReveal}`}>
        コストや運用の不安を解消、気軽に始められるDXを提案します。
      </p>
    ),
  },
  {
    id: 3,
    mediaType: "video",
    mediaSrc: "/video/2-4.mp4",
    mobileSrc: "/video/mobile2-5.mp4",
    subtitle: (
      <p className={`${styles.appLabelSubtitle} ${styles.appSliderReveal}`}>
        シンプルなITで業務を最適化
      </p>
    ),
    title: (
      <h1 className={`${styles.appHeroTitle} ${styles.appSliderReveal}`}>
        直感的なITで、<br />誰でも簡単に
      </h1>
    ),
    text: (
      <p className={`${styles.appHeroText} ${styles.appSliderReveal}`}>
        難しい操作は不要。<br />すぐに使えるIT環境を提供します。
      </p>
    ),
  },
];

export default function HeroSection() {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef(sliderData.map(() => createRef()));
  const slideIntervalRef = useRef(null);

  // スライド切り替え
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev >= sliderData.length - 1 ? 0 : prev + 1));
  };

  const startAutoSlide = () => {
    if (!slideIntervalRef.current) {
      slideIntervalRef.current = setInterval(() => {
        handleNextSlide();
      }, 8000);
    }
  };

  const stopAutoSlide = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  // IntersectionObserver で動画を遅延読み込み
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target;
            if (video.dataset.src) {
              video.src = video.dataset.src;
              video.load();
              video.play().catch(() => {});
            }
            observer.unobserve(video);
          }
        });
      },
      { threshold: 0.25 }
    );

    videoRefs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // スライド切り替え時に動画頭出し
  useEffect(() => {
    const videoRef = videoRefs.current[currentSlide].current;
    if (videoRef && videoRef.src) {
      videoRef.currentTime = 0;
      videoRef.play().catch(() => {});
    }
  }, [currentSlide]);


  return (
    <section className={`${styles.appHeroSection} ${styles.appTextCenter}`}>
      <ul className={styles.appHeroSlider}>
        {sliderData.map((slide, index) => {
          const srcToUse = (isMobile && slide.mobileSrc) || slide.mediaSrc;
          const isActive = currentSlide === index;

          return (
            <li
              key={slide.id}
              className={
                isActive
                  ? `${styles.appHeroSliderItem} ${styles.appActiveSlide}`
                  : styles.appHeroSliderItem
              }
            >
                 {/* 背景 */}
              <div className={styles.appHeroSliderBg}>
                {slide.mediaType === "video" ? (
                  <video
                    ref={videoRefs.current[index]}
                    data-src={srcToUse}
                    className={styles.appHeroSliderVideoCover}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={srcToUse}
                    alt=""
                    className={styles.appHeroSliderImgCover}
                  />
                )}
                {/* オーバーレイ */}
                <div className={styles.appHeroOverlay}></div>
              </div>
              
              {/* JSX をそのまま描画 */}
              {slide.subtitle}
              {slide.title}
              {slide.text}

              <a
                href="#sectionTitle1"
                className={`${styles.appBtnPrimary} ${styles.appSliderReveal}`}
              >
                <span className={styles.text1}>View Services</span>
                <span className={styles.text2} aria-hidden="true">
                  View Services
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
