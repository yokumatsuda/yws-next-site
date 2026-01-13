useEffect(() => {
  const nextIndex = currentSlide >= sliderData.length - 1 ? 0 : currentSlide + 1;
  const nextVideo = videoRefs.current[nextIndex]?.current;
  const nextSrc = (isMobile && sliderData[nextIndex].mobileSrc) || sliderData[nextIndex].mediaSrc;

  if (nextVideo && !nextVideo.src) {
    nextVideo.src = nextSrc;
    nextVideo.load();
  }
}, [currentSlide, isMobile]);
