<div
  key={i}
  className={styles.mySlider1Card}
  ref={(el) => {
    if (el) cardRefs.current[i] = el;
  }}
>
  {/* 背景動画（GIFの置き換え） */}
  <video
    className={styles.bgVideo}
    autoPlay
    muted
    loop
    playsInline
    preload={i === 0 ? "auto" : "metadata"} // 最初だけ少し強め
    poster={slide.poster} // 黒画面対策（任意だけど超おすすめ）
  >
    {/* webmがあるなら先に */}
    <source src={slide.bgVideoWebm} type="video/webm" />
    <source src={slide.bgVideoMp4} type="video/mp4" />
  </video>

  <div className={styles.mySlider1CardContent}>
    {/* ここは今まで通り */}
    ...
  </div>
</div>;
