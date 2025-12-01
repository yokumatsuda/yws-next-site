// index.js
import useLoading from "hooks/useLoading";
import Loading from "components/loading";
import Meta from "components/meta";
import Container from "components/container";
import Hero from "components/hero";
import Posts from "components/posts";
import WorksPosts from "components/works-posts";
import Pagination from "components/pagination";
import Services from "components/services";
import { eyecatchLocal } from "lib/constants";
import { getAllPosts, getAllWorks } from "lib/api";


export default function Home({ works, posts }) {
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
            <WorksPosts works={works} />
            <Posts posts={posts} />
            <Pagination nextUrl="/blog" nextText="More Posts" />
          </Container>
        </>
      )}
    </>
  );
}


export async function getStaticProps() {
  const works = await getAllWorks(8);
  const posts = await getAllPosts(8);

  // worksの画像処理
  for (const work of works) {
    if (!work.hasOwnProperty("eyecatch")) {
      work.eyecatch = eyecatchLocal;
    }
  }

  // postsの画像処理
  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
  }

  return {
    props: {
      works,
      posts,
    },
  };
}
