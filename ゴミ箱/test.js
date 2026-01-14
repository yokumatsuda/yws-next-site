import React, { useEffect, useRef, useState, createRef } from "react";
import styles from "styles/details.module.css";

/** mp4/webm を video に差し込んで load する（重複ロード防止） */
function setBgVideoSources(
  videoEl,
  { mp4, webm, poster },
  preload = "metadata"
) {
  if (!videoEl) return;
  if (videoEl.dataset.mp4 === mp4) return; // 同じなら何もしない

  // source を差し込む（WebM→MP4）
  const sources = `
    ${webm ? `<source src="${webm}" type="video/webm" />` : ""}
    ${mp4 ? `<source src="${mp4}" type="video/mp4" />` : ""}
  `.trim();

  videoEl.innerHTML = sources;
  if (poster) videoEl.setAttribute("poster", poster);

  videoEl.preload = preload;
  videoEl.dataset.mp4 = mp4 || "";
  videoEl.load();
}

export default function Dx() {
  /* =============================
   * 1) スライダー用ロジック
   * ============================= */
  const slides = [
    {
      title: "DX推進",
      text: "DXを推進することで、紙の業務から脱却し、デジタル化と業務最適化を加速。",
      textMobile: "デジタル化と業務最適化を加速",
      buttonText: "詳しく見る",

      bgVideoMp4: "/services-img/slider/dx-blob3.mp4",

      bgVideoWebm: "/services-img/slider/dx-blob3.webm",
      // ✅ 黒画面対策
      poster: "/services-img/slider/dx-blob3.webp",

      scrollTargetId: "dxSection",
    },
    {
      title: "業務効率化・自動化",
      titleMobile: ["業務効率化・", "自動化"],
      text: "DXを活用し、電子契約やデジタル書類管理を導入すれば、業務フローが簡素化されます。",
      textMobile: "デジタル書類管理で業務を効率化",
      buttonText: "詳しく見る",
      bgVideoMp4: "/services-img/slider/dx-blob1.mp4",
      bgVideoWebm: "/services-img/slider/dx-blob1.webm",
      poster: "/services-img/slider/dx-blob1.webp",
      scrollTargetId: "efficiencySection",
    },
    {
      title: "ペーパーレス化",
      text: "AIやOCRで紙の書類を自動データ化し、分類・検索も瞬時に完了。業務効率と生産性を同時に向上させます。",
      textMobile: "AI/OCRで書類を自動データ化",
      buttonText: "詳しく見る",
      bgVideoMp4: "/services-img/slider/dx-blob2.mp4",
      bgVideoWebm: "/services-img/slider/dx-blob2.webm",
      poster: "/services-img/slider/dx-blob2.webp",
      scrollTargetId: "paperlessSection",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // DOM参照
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);

  // ✅ 背景 video の参照（スライド数ぶん）
  const videoRefs = useRef(slides.map(() => createRef()));

  // オートスクロール
  const autoScrollRef = useRef(null);
  const autoScrollDelay = 3500;

  // スワイプ開始位置
  const xDownRef = useRef(null);

  const bgColors = ["#FDE2E2", "#FAF7B6", "#B8F2E6"];

  useEffect(() => {
    loadShowSlideDOM(currentIndex);

    // ✅ 表示スライド（中央）だけ再生し、左右は先読みして停止
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
  }, [currentIndex]);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** スライドカードの配置 */
  function loadShowSlideDOM(index) {
    const newIndex = (index + slides.length) % slides.length;
    const center = newIndex;
    const left = (newIndex - 1 + slides.length) % slides.length;
    const right = (newIndex + 1) % slides.length;

    // 全カード初期化
    cardRefs.current.forEach((card) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translate(-50%,-50%) scale(0.8)";
        card.style.zIndex = "0";
      }
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

    updateDots(newIndex);

    // 背景色更新
    const wrapper = document.getElementById("my-slider1-wrapper");
    if (wrapper) {
      wrapper.style.backgroundColor = bgColors[newIndex % bgColors.length];
    }
  }

  /** ドットの外見更新 */
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

    const id = window.setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, autoScrollDelay);

    autoScrollRef.current = id;
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
    if (e.touches && e.touches.length > 0)
      xDownRef.current = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    if (xDownRef.current === null) return;
    if (!e.touches || e.touches.length === 0) return;

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

  /* =============================
   * 3) JSX レンダリング（スライダー部）
   * ============================= */
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
              className={styles.mySlider1Card}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
            >
              {/* ✅ 背景動画レイヤー */}
              <video
                ref={videoRefs.current[i]}
                className={styles.cardBgVideo}
                loop
                muted
                playsInline
                preload="metadata"
              />

              {/* ✅ 文字を前面に */}
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

                <p className={styles.slideTextDesktop}>
                  {slide.text.split("\n").map((part, idx) => (
                    <React.Fragment key={idx}>
                      {part}
                      <br />
                    </React.Fragment>
                  ))}
                </p>

                <p className={styles.slideTextMobile}>
                  {(slide.textMobile ?? slide.text)
                    .split("\n")
                    .map((part, idx) => (
                      <React.Fragment key={idx}>
                        {part}
                        <br />
                      </React.Fragment>
                    ))}
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

      {/* ↓↓↓ あなたのアコーディオン以下はそのまま残してOK */}
    </>
  );
}
