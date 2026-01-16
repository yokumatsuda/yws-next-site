import React, { useEffect, useRef, useState, createRef } from "react";
import styles from "styles/details.module.css";
import setBgVideoSources from "components/setBgVideoSources";

export default function Dx() {
  const slides = [
    {
      title: "DX推進",
      text: "DXを推進することで、紙の業務から脱却し、デジタル化と業務最適化を加速。",
      textMobile: "デジタル化と業務最適化を加速",
      buttonText: "詳しく見る",
      bgVideoMp4: "/services-img/slider-video/dx-blob3.mp4",
      bgVideoWebm: "/services-img/slider-video/dx-blob3.webm",
      poster: "/services-img/slider-video/dx-blob3.webp",
      scrollTargetId: "dxSection",
    },
    {
      title: "業務効率化・自動化",
      titleMobile: ["業務効率化・", "自動化"],
      text: "DXを活用し、電子契約やデジタル書類管理を導入すれば、業務フローが簡素化されます。",
      textMobile: "デジタル書類管理で業務効率化",
      buttonText: "詳しく見る",
      bgVideoMp4: "/services-img/slider-video/dx-blob1.mp4",
      bgVideoWebm: "/services-img/slider-video/dx-blob1.webm",
      poster: "/services-img/slider-video/dx-blob1.webp",
      scrollTargetId: "efficiencySection",
    },
    {
      title: "ペーパーレス化",
      text: "AIやOCRで紙の書類を自動データ化し、分類・検索も瞬時に完了。業務効率と生産性を同時に向上させます。",
      textMobile: "AI/OCRで書類を自動データ化",
      buttonText: "詳しく見る",
      bgVideoMp4: "/services-img/slider-video/dx-blob2.mp4",
      bgVideoWebm: "/services-img/slider-video/dx-blob2.webm",
      poster: "/services-img/slider-video/dx-blob2.webp",
      scrollTargetId: "paperlessSection",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ 初回だけ transition を無効化するフラグ
  const [isReady, setIsReady] = useState(false);

  // DOM参照
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);

  // ✅ 背景 video の参照（スライド数ぶん）
  const videoRefs = useRef(slides.map(() => createRef()));

  // オートスクロール
  const autoScrollRef = useRef(null);
  const autoScrollDelay = 4000;

  // スワイプ開始位置
  const xDownRef = useRef(null);

  const bgColors = ["#FDE2E2", "#FAF7B6", "#B8F2E6"];

  // ✅ 初回「下から出てくる」現象の根治
  // 1) 最初のDOM配置を transitionなしで確定
  // 2) 2フレーム待ってから transition有効化
  useEffect(() => {
    if (isReady) return;

    loadShowSlideDOM(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsReady(true); // ここから通常アニメON
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    // ✅ 初回は isReady が true になるまで触らない（初期演出を壊さない）
    if (!isReady) return;

    loadShowSlideDOM(currentIndex);

    const newIndex = (currentIndex + slides.length) % slides.length;
    const center = newIndex;
    const left = (newIndex - 1 + slides.length) % slides.length;
    const right = (newIndex + 1) % slides.length;

    // 中央/左右を先に source セット（黒画面を減らす）
    [center, left, right].forEach((idx) => {
      const v = videoRefs.current[idx]?.current;
      const s = slides[idx];
      if (!v) return;
      setBgVideoSources(
        v,
        { mp4: s.bgVideoMp4, webm: s.bgVideoWebm, poster: s.poster },
        idx === center ? "auto" : "metadata"
      );
    });

    // 再生制御：中央だけ play、他は pause
    slides.forEach((_, idx) => {
      const v = videoRefs.current[idx]?.current;
      if (!v) return;
      if (idx === center) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isReady]);

  useEffect(() => {
    if (!isReady) return;
    startAutoScroll();
    return () => stopAutoScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  /** スライドカードの配置 */
  function loadShowSlideDOM(index) {
    const newIndex = (index + slides.length) % slides.length;
    const center = newIndex;
    const left = (newIndex - 1 + slides.length) % slides.length;
    const right = (newIndex + 1) % slides.length;

    // 全カード初期化
    cardRefs.current.forEach((card) => {
      if (!card) return;
      card.style.opacity = "0";
      card.style.transform = "translate(-50%,-50%) scale(0.8)";
      card.style.zIndex = "0";
    });

    // 中央カード
    const centerCard = cardRefs.current[center];
    if (centerCard) {
      centerCard.style.opacity = "1";
      centerCard.style.transform = "translate(-50%,-50%) scale(1)";
      centerCard.style.zIndex = "2";
    }

    // 左右カード
    const translateValue = "120%";
    const leftCard = cardRefs.current[left];
    if (leftCard) {
      leftCard.style.opacity = "0.8";
      leftCard.style.transform = `translate(-50%,-50%) scale(0.8) translateX(-${translateValue})`;
      leftCard.style.zIndex = "1";
    }
    const rightCard = cardRefs.current[right];
    if (rightCard) {
      rightCard.style.opacity = "0.8";
      rightCard.style.transform = `translate(-50%,-50%) scale(0.8) translateX(${translateValue})`;
      rightCard.style.zIndex = "1";
    }

    // ドット更新
    updateDots(newIndex);

    // 背景色更新
    const wrapper = document.getElementById("my-slider1-wrapper");
    if (wrapper) {
      wrapper.style.backgroundColor = bgColors[newIndex % bgColors.length];
    }
  }

  /** ドット更新 */
  function updateDots(activeIndex) {
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.classList.remove(styles.activeDot);
      if (i === activeIndex) dot.classList.add(styles.activeDot);
    });
  }

  /** オートスクロール */
  function startAutoScroll() {
    stopAutoScroll();
    setCurrentIndex((prev) => prev + 1);
    autoScrollRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, autoScrollDelay);
  }

  function stopAutoScroll() {
    if (autoScrollRef.current !== null) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }

  /** スワイプ操作 */
  function handleTouchStart(e) {
    stopAutoScroll();
    if (e.touches?.length) xDownRef.current = e.touches[0].clientX;
  }
  function handleTouchMove(e) {
    if (xDownRef.current === null) return;
    if (!e.touches?.length) return;

    const xUp = e.touches[0].clientX;
    const xDiff = xDownRef.current - xUp;
    const threshold = 30;

    if (Math.abs(xDiff) > threshold) {
      setCurrentIndex((prev) => (xDiff > 0 ? prev + 1 : prev - 1));
      xDownRef.current = null;
    }
  }

  function handlePrev() {
    stopAutoScroll();
    setCurrentIndex((prev) => prev - 1);
  }
  function handleNext() {
    stopAutoScroll();
    setCurrentIndex((prev) => prev + 1);
  }
  function handleDotClick(i) {
    stopAutoScroll();
    setCurrentIndex(i);
  }

  function scrollWithOffset(id, offset = 10) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y - offset, behavior: "smooth" });
  }

  return (
    <>
      <div id="my-slider1-wrapper" className={styles.Container}>
        <div
          className={styles.mySlider1Container}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`${styles.mySlider1Card} ${
                isReady ? styles.ready : styles.notReady
              }`}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
            >
              <video
                ref={videoRefs.current[i]}
                className={styles.bgVideo}
                autoPlay
                muted
                loop
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
                poster={slide.poster}
              >
                <source src={slide.bgVideoWebm} type="video/webm" />
                <source src={slide.bgVideoMp4} type="video/mp4" />
              </video>

              <div className={styles.mySlider1CardContent}>
                <h2 className={styles.slideTitleDesktop}>{slide.title}</h2>

                <h2 className={styles.slideTitleMobile}>
                  {Array.isArray(slide.titleMobile)
                    ? slide.titleMobile.map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          {idx !== slide.titleMobile.length - 1 && <br />}
                        </React.Fragment>
                      ))
                    : slide.titleMobile ?? slide.title}
                </h2>

                <p className={styles.slideTextDesktop}>{slide.text}</p>
                <p className={styles.slideTextMobile}>
                  {slide.textMobile ?? slide.text}
                </p>

                {slide.buttonText && slide.scrollTargetId && (
                  <button
                    className={styles.cardButton}
                    onClick={() => scrollWithOffset(slide.scrollTargetId, 80)}
                  >
                    {slide.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}

          <button className={styles.mySlider1Prev} onClick={handlePrev}>
            &lt;
          </button>
          <button className={styles.mySlider1Next} onClick={handleNext}>
            &gt;
          </button>
        </div>

        <div className={styles.mySlider1Dots}>
          {slides.map((_, i) => (
            <span
              key={i}
              className={styles.mySlider1Dot}
              ref={(el) => {
                if (el) dotRefs.current[i] = el;
              }}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </div>

        <div className={styles.mySlider1Controls}>
          <button onClick={startAutoScroll}>Play</button>
          <button onClick={stopAutoScroll}>Stop</button>
        </div>
      </div>

      {/* 以降アコーディオンなどはそのまま */}
    </>
  );
}
