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
</video>;

function startAutoScroll() {
  stopAutoScroll();
  const id = window.setInterval(() => {
    setCurrentIndex((prev) => prev + 1);
  }, autoScrollDelay);
  autoScrollRef.current = id;
}
