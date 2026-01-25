<video className={styles.video} autoPlay loop muted playsInline preload="auto">
  {/* ✅ モバイル優先（例：768px以下） */}
  <source
    src="/loading/Loading-animation-textmotion-mobile.webm"
    type="video/webm"
    media="(max-width: 768px)"
  />
  <source
    src="/loading/Loading-animation-textmotion-mobile.mp4"
    type="video/mp4"
    media="(max-width: 768px)"
  />

  {/* ✅ PC（フォールバック） */}
  <source src="/loading/Loading-animation-textmotion.webm" type="video/webm" />
  <source src="/loading/Loading-animation-textmotion.mp4" type="video/mp4" />
</video>;
