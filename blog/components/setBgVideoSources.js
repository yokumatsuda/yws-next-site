/** mp4/webm を video に差し込んで load する（重複ロード防止） */
function setBgVideoSources(videoEl, { mp4, webm, poster }, preload = "metadata") {
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
