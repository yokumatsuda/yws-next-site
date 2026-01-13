{
  sliderData.map((slide, index) => {
    const srcToUse = (isMobile && slide.mobileSrc) || slide.mediaSrc;
    const isActive = currentSlide === index;

    const shouldEagerLoad = index === 0; // 最初だけ先読み

    return (
      <li
        key={slide.id}
        className={
          isActive
            ? `${styles.appHeroSliderItem} ${styles.appActiveSlide}`
            : styles.appHeroSliderItem
        }
      >
        <div className={styles.appHeroSliderBg}>
          <video
            ref={videoRefs.current[index]}
            src={shouldEagerLoad ? srcToUse : undefined}
            data-src={!shouldEagerLoad ? srcToUse : undefined}
            className={styles.appHeroSliderVideoCover}
            autoPlay={isActive} // 常にautoPlayより確実
            loop
            muted
            playsInline
            preload={shouldEagerLoad ? "auto" : "metadata"}
          />
          <div className={styles.appHeroOverlay}></div>
        </div>
        {slide.subtitle}
        {slide.title}
        {slide.text}
        ...
      </li>
    );
  });
}
