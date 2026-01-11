// pages/works/[slug].js
import { getAllWorks, getWorkBySlug } from "lib/api";
import { extractText } from "lib/extract-text";
import { prevNextPost } from "lib/prev-next-post";
import Meta from "components/meta";
import Container from "components/container";
import PostHeader from "components/post-header";
import PostBody from "components/post-body";
import ConvertBody from "components/convert-body";
import WorkCategories from "components/work-categories";
import Pagination from "components/pagination";
import Image from "next/image";
import { eyecatchLocal } from "lib/constants";
import styles from "styles/cmsWrapper.module.css";
import HeroPosts from "@/components/HeroWorksPost";

export default function WorkDetail({
  title,
  publish,
  content,
  contentHtml,
  eyecatch,
  categories,
  description,
  prevWork,
  nextWork,
}) {
  return (
    <>
      <HeroPosts />
      <Container>
        <Meta
          pageTitle={title}
          pageDesc={description}
          pageImg={eyecatch.url}
          pageImgW={eyecatch.width}
          pageImgH={eyecatch.height}
        />
        <article className={styles.cmsArticle}>
          {/* ✅ 中央900pxの“本文枠” */}
          <div className={styles.cmsInner}>
            <PostHeader title={title} subtitle="" publish={publish} />

            {/* <figure className={styles.eyecatchFigure}>
              <Image
                src={eyecatch.url}
                alt=""
                width={eyecatch.width}
                height={eyecatch.height}
                priority
                className={styles.eyecatchImage}
              />
            </figure> */}

            <PostBody>
              <ConvertBody content={content} contentHtml={contentHtml} />
            </PostBody>

            <Pagination
              prevText={prevWork?.title}
              prevUrl={prevWork ? `/works/${prevWork.slug}` : ""}
              nextText={nextWork?.title}
              nextUrl={nextWork ? `/works/${nextWork.slug}` : ""}
            />
          </div>

          {/* ✅ 右外側に出すサイドバー */}
          <div className={styles.cmsSidebarOuter}>
            <div className={styles.cmsSidebarSticky}>
              <WorkCategories categories={categories} />
            </div>
          </div>
        </article>
      </Container>
    </>
  );
}

// 静的生成するパス
export async function getStaticPaths() {
  const works = await getAllWorks();
  const paths = works.map(({ slug }) => ({
    params: { slug: encodeURIComponent(slug) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

// 個別ページのデータ取得
export async function getStaticProps({ params }) {
  const slug = decodeURIComponent(params.slug);
  const work = await getWorkBySlug(slug);

  if (!work) {
    return { notFound: true };
  }

  const description = extractText(work.content);
  const eyecatch = work.eyecatch ?? eyecatchLocal;

  const allWorks = await getAllWorks();
  const [prevWork, nextWork] = prevNextPost(allWorks, slug); // prevNextPost を works 用でも流用可

  return {
    props: {
      // title: work.title,
      // publish: work.publishDate,
      // content: work.content,
      // contentHtml: work.contentHtml,
      // eyecatch,
      // categories: work.categories,
      // description,
      // prevWork,
      // nextWork,

      title: work.title ?? "",
      publish: work.publishDate ?? "",
      content: work.content ?? null,
      contentHtml: work.contentHtml ?? null,
      eyecatch,
      categories: work.categories ?? [],
      description,
      prevWork,
      nextWork,
    },
  };
}
