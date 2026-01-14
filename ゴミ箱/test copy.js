<div className={styles.mySlider1Card} ref={(el) => (cardRefs.current[i] = el)}>
  {/* 背景用（cover + blur） */}
  <video
    className={styles.bgVideoCover}
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

  {/* 本体用（contain） */}
  <video
    className={styles.bgVideoContain}
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

  <div className={styles.mySlider1CardContent}>...</div>
</div>;
