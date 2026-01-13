import { getAllWorkCategories, getAllWorksByCategory } from "lib/api";
import Meta from "components/meta";
import Container from "components/container";
import PostHeader from "components/post-header";
import WorksPosts from "components/works-posts";
// import { getPlaiceholder } from "plaiceholder";
import HeroWorksPost from "@/components/HeroWorksPost";

// ローカルの代替アイキャッチ画像
import { eyecatchLocal } from "lib/constants";

export default function Category({ name, works }) {
  return (
    <>
      <HeroWorksPost />
      <Container>
        <Meta pageTitle={name} pageDesc={`${name}に関する記事`} />
        <PostHeader title={name} subtitle="" />
        <WorksPosts works={works} />
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const allCats = await getAllWorkCategories();

  return {
    paths: allCats.map(({ slug }) => `/works/category/${slug}`),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const catSlug = context.params.slug;

  const allCats = await getAllWorkCategories();
  const cat = allCats.find(({ slug }) => slug === catSlug);

  const works = await getAllWorksByCategory(cat.id);

  for (const work of works) {
    if (!work.hasOwnProperty("eyecatch")) {
      work.eyecatch = eyecatchLocal;
    }
    // const { base64 } = await getPlaiceholder(post.eyecatch.url);
    // post.eyecatch.blurDataURL = base64;
  }

  return {
    props: {
      name: cat.name,
      works: works,
    },
  };
}
