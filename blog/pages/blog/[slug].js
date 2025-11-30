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

    // // ✅ blur生成（ローカルのみ）
    // if (eyecatch.url.startsWith("/")) {
    //   const filePath = path.join(
    //     process.cwd(),
    //     "public",
    //     eyecatch.url.replace(/^\/+/, "")
    //   );
    //   if (fs.existsSync(filePath)) {
    //     const { base64 } = await getPlaiceholder(filePath);
    //     eyecatch.blurDataURL = base64;
    //   }
    // } else {
    //   // ✅ microCMSなど外部画像はblurを生成しない（そのまま表示）
    //   eyecatch.blurDataURL = "";
    // }

    //参考書ではこの2コードだけ※しかしnext.js15ではこれではエラーが出る。
    // const { base64 } = await getPlaiceholder(eyecatch.url);
    // eyecatch.blurDataURL = base64;

    const allSlugs = await getAllSlugs();
    const [prevPost, nextPost] = prevNextPost(allSlugs, slug);

    // console.log("✅ post data:", post);

    return {
      props: {
        title: post.title,
        publish: post.publishDate,
        content: post.content,
        contentHtml: post.contentHtml, 
        eyecatch: eyecatch,
        categories: post.categories,
        description: description,
        prevPost: prevPost,
        nextPost: nextPost,
      },
    };
  }
}
