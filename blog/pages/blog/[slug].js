// /blog/[slug].js
import { getPostBySlug, getAllSlugs } from "lib/api";
import { extractText } from "lib/extract-text";
import { prevNextPost } from "lib/prev-next-post";
import Meta from "components/meta";
import Container from "components/container";
import PostHeader from "components/post-header";
import PostBody from "components/post-body";

import ConvertBody from "components/convert-body";
import PostCategories from "components/post-categories";
import Pagination from "components/pagination";
import Image from "next/image";
import { eyecatchLocal } from "lib/constants";
import styles from "styles/cmsWrapper.module.css";
import HeroNewsPost from "@/components/HeroNewsPost";

export default function Post({
  title,
  publish,
  content,
  contentHtml,
  eyecatch,
  categories,
  description,
  prevPost,
  nextPost,
}) {
  return (
    <>
      <HeroNewsPost />
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
              prevText={prevPost.title}
              prevUrl={`/blog/${prevPost.slug}`}
              nextText={nextPost.title}
              nextUrl={`/blog/${nextPost.slug}`}
            />
          </div>

          <div className={styles.cmsSidebarOuter}>
            <div className={styles.cmsSidebarSticky}>
              <PostCategories categories={categories} />
            </div>
          </div>
        </article>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const allSlugs = await getAllSlugs(5);

  return {
    paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const post = await getPostBySlug(slug);
  if (!post) {
    return { notFound: true };
  } else {
    const description = extractText(post.content);
    const eyecatch = post.eyecatch ?? eyecatchLocal;

    const allSlugs = await getAllSlugs();
    const [prevPost, nextPost] = prevNextPost(allSlugs, slug);

    // console.log("✅ post data:", post);

    return {
      props: {
        // title: post.title,
        // publish: post.publishDate,
        // content: post.content,
        // contentHtml: post.contentHtml,
        // eyecatch: eyecatch,
        // categories: post.categories,
        // description: description,
        // prevPost: prevPost,
        // nextPost: nextPost,

        title: post.title ?? "",
        publish: post.publishDate ?? "",
        content: post.content ?? null,
        contentHtml: post.contentHtml ?? null,
        eyecatch,
        categories: post.categories ?? [],
        description,
        prevPost,
        nextPost,
      },
    };
  }
}
