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

// mp4パスからwebmパスを作る（同名で拡張子だけ違う前提）
function toWebm(mp4Path) {
  return mp4Path.replace(/\.mp4$/i, ".webm");
}

/**
 * video要素に WebM→MP4 の順で source を入れて load() する
 * - 既に同じ mp4 が入っていれば何もしない（無駄な再ロード防止）
 */
function setVideoSources(videoEl, mp4Src, preload = "metadata") {
  if (!videoEl || !mp4Src) return;

  // 既に同じものが入っているなら何もしない
  if (videoEl.dataset.mp4 === mp4Src) return;

  const webmSrc = toWebm(mp4Src);

  // source を差し込む（WebM→MP4）
  videoEl.innerHTML = `
    <source src="${webmSrc}" type="video/webm" />
    <source src="${mp4Src}" type="video/mp4" />
  `;

  videoEl.preload = preload;
  videoEl.dataset.mp4 = mp4Src;

  // 読み込み開始
  videoEl.load();
}

// スライダーのデータ（ここはmp4のままでOK。webmは自動変換）
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
        すべての人に使いやすい
        <br />
        ITソリューションを
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
      <p className={`${styles.appLabelSubtitle} ${styles.appSliderReveal}`}>もっと手軽にITを活用</p>
    ),
    title: (
      <h1 className={`${styles.appHeroTitle} ${styles.appSliderReveal}`}>
        DXをもっと身近に、
        <br />
        もっと簡単に
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
        直感的なITで、
        <br />
        誰でも簡単に
      </h1>
    ),
    text: (
      <p className={`${styles.appHeroText} ${styles.appSliderReveal}`}>
        難しい操作は不要。
        <br />
        すぐに使えるIT環境を提供します。
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
      slideIntervalRef.current = setInterval(handleNextSlide, 8000);
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

  // ✅ 初回：最初のスライドだけ先に読み込む（eager）
  useEffect(() => {
    const firstVideo = videoRefs.current[0]?.current;
    if (!firstVideo) return;

    const firstSrc = (isMobile && sliderData[0].mobileSrc) || sliderData[0].mediaSrc;

    setVideoSources(firstVideo, firstSrc, "auto");
  }, [isMobile]);

  // IntersectionObserver で動画を遅延読み込み（src/data-src ではなく source方式）
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target;
            const idx = Number(video.dataset.index);
            const mp4Src = (isMobile && sliderData[idx].mobileSrc) || sliderData[idx].mediaSrc;

            setVideoSources(video, mp4Src, "metadata");
            video.play().catch(() => {});
            observer.unobserve(video);
          }
        });
      },
      { threshold: 0.25 }
    );

    videoRefs.current.forEach((ref, idx) => {
      if (ref.current) {
        ref.current.dataset.index = String(idx);
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [isMobile]);

  // ✅ 次のスライドの動画を事前に読み込む（先読み）
  useEffect(() => {
    const nextIndex = currentSlide >= sliderData.length - 1 ? 0 : currentSlide + 1;

    const nextVideo = videoRefs.current[nextIndex]?.current;
    const nextSrc = (isMobile && sliderData[nextIndex].mobileSrc) || sliderData[nextIndex].mediaSrc;

    if (nextVideo) {
      // source方式では nextVideo.src を見ないので、datasetで判定
      setVideoSources(nextVideo, nextSrc, "auto");
    }
  }, [currentSlide, isMobile]);

  // スライド切り替え時に動画頭出し
  useEffect(() => {
    const videoRef = videoRefs.current[currentSlide].current;

    if (videoRef) {
      const srcToUse =
        (isMobile && sliderData[currentSlide].mobileSrc) || sliderData[currentSlide].mediaSrc;

      // 表示スライドは確実にロードして再生
      setVideoSources(videoRef, srcToUse, "auto");
      videoRef.currentTime = 0;
      videoRef.play().catch(() => {});
    }
  }, [currentSlide, isMobile]);

  return (
    <section className={`${styles.appHeroSection} ${styles.appTextCenter}`}>
      <ul className={styles.appHeroSlider}>
        {sliderData.map((slide, index) => {
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
                <video
                  ref={videoRefs.current[index]}
                  className={styles.appHeroSliderVideoCover}
                  autoPlay={isActive}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className={styles.appHeroOverlay}></div>
              </div>

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
