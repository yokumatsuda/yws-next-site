// pages/works/[slug].js
import { getAllWorks, getWorkBySlug } from "lib/api";
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
import WorkCategories from "components/work-categories";
import Pagination from "components/pagination";
import Image from "next/image";

import { eyecatchLocal } from "lib/constants";

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
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <article>
        <PostHeader title={title} subtitle="Works" publish={publish} />

        <figure>
          <Image
            src={eyecatch.url}
            alt=""
            style={{ width: "100%", height: "auto" }}
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority={true}
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody content={content} contentHtml={contentHtml} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <WorkCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>

        <Pagination
          prevText={prevWork?.title}
          prevUrl={prevWork ? `/works/${prevWork.slug}` : ""}
          nextText={nextWork?.title}
          nextUrl={nextWork ? `/works/${nextWork.slug}` : ""}
        />
      </article>
    </Container>
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
