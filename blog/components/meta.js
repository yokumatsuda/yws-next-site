// meta.js

import Head from "next/head";
import { useRouter } from "next/router";

// サイトに関する情報
import { siteMeta } from "lib/constants";
const { siteTitle, siteDesc, siteUrl, siteLocale, siteType, siteIcon } = siteMeta;

// 汎用OGP画像
import siteImg from "public/images-post/ogp.png";

export default function Meta({
  pageTitle,
  pageDesc,
  pageImg,
  pageImgW,
  pageImgH,
  noindex = false,
}) {
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
  const desc = pageDesc ?? siteDesc;
  const router = useRouter();
  const url = `${siteUrl}${router.asPath}`;
  const img = pageImg || siteImg.src;
  const imgW = pageImgW || siteImg.width;
  const imgH = pageImgH || siteImg.height;
  const imgUrl = img.startsWith("https") ? img : `${siteUrl}${img}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />

      {/* canonical */}
      <link rel="canonical" href={url} />

      {/* robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* OGP */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={siteType} />
      <meta property="og:locale" content={siteLocale} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgW)} />
      <meta property="og:image:height" content={String(imgH)} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imgUrl} />

      {/* icons */}
      <link rel="icon" href={siteIcon} />
      <link rel="apple-touch-icon" href={siteIcon} />
    </Head>
  );
}
