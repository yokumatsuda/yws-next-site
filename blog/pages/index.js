// index.js
import useLoading from "hooks/useLoading";
import Loading from "components/loading";
import Meta from "components/meta";
import Container from "components/container";
import Hero from "components/hero";
import Posts from "components/posts";
import Pagination from "components/pagination";
import Services from "components/services";
import { eyecatchLocal } from "lib/constants";
import { getAllPosts } from "lib/api";

export default function Home({ posts }) {
  const loading = useLoading(1000);  // ← 1行だけ

  if (loading) return <Loading show={loading} />

  return (
    <>
      <Loading show={loading} />

      {!loading && (
        <>
          <Hero
            title="YWS"
            subtitle="アウトプットしていくサイト"
            imageOn
          />

          <Container>
            <Meta
              pageTitle="金沢市ホームページ制作"
              pageDesc="金沢市でのWebサイト制作ならYWS。モダンなWebサイト・システム構築・DX支援を提供します"
            />

            <Services />
            <Posts posts={posts} />
            <Pagination nextUrl="/blog" nextText="More Posts" />
          </Container>
        </>
      )}
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts(4);

  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
    // const { base64 } = await getPlaiceholder(post.eyecatch.url);
    // post.eyecatch.blurDataURL = base64;
  }

  return {
    props: {
      posts: posts,
    },
  };
}
