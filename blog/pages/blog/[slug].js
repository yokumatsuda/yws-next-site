// /blog/[slug].js
import { getPostBySlug, getAllSlugs } from "lib/api";
import { extractText } from "lib/extract-text";
import { prevNextPost } from "lib/prev-next-post";
import Meta from "components/meta";
import Container from "components/container";
import PostHeader from "components/post-header";
import PostBody from "components/post-body";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "components/two-column";
import ConvertBody from "components/convert-body";
import PostCategories from "components/post-categories";
import Pagination from "components/pagination";
import Image from "next/image";

// blur生成ようのimport3つ
// import path from "path";
// import fs from "fs";
// import { getPlaiceholder } from "plaiceholder";

import { eyecatchLocal } from "lib/constants";

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
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish} />

        <figure>
          <Image
            // key={eyecatch.url}
            src={eyecatch.url}
            alt=""
            style={{ width: "100%", height: "auto" }}
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority={true}
            // placeholder="blur"
            // blurDataURL={eyecatch.blurDataURL}
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody 
                content={content}
                contentHtml={contentHtml}
             />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>

        <Pagination
          prevText={prevPost.title}
          prevUrl={`/blog/${prevPost.slug}`}
          nextText={nextPost.title}
          nextUrl={`/blog/${nextPost.slug}`}
        />
      </article>
    </Container>
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
