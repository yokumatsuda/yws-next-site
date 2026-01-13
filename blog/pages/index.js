// index.js
import { useEffect, useRef, useState } from "react";
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
  // ✅ ローディングは「Heroの準備完了」で消す
  const [loading, setLoading] = useState(true);

  // チラつき防止：最低表示時間
  const startedAt = useRef(Date.now());
  const MIN_MS = 600;

  // 保険：最大表示時間（何があっても消す）
  const MAX_MS = 4000;
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), MAX_MS);
    return () => clearTimeout(t);
  }, []);

  // Heroから呼ばれる関数（最初の動画がcanplayになったら呼ばれる）
  const handleHeroReady = () => {
    const elapsed = Date.now() - startedAt.current;
    const wait = Math.max(0, MIN_MS - elapsed);
    setTimeout(() => setLoading(false), wait);
  };

  return (
    <>
      <Loading show={loading} />

      {/* ✅ Heroに onHeroReady を渡す */}
      <Hero
        title="YWS"
        subtitle="アウトプットしていくサイト"
        imageOn
        onHeroReady={handleHeroReady}
      />

      {!loading && (
        <Container>
          <Meta
            pageTitle="金沢市ホームページ制作"
            pageDesc="金沢市でのWebサイト制作ならY = YWS。モダンなWebサイト・システム構築・DX支援を提供します"
          />

          <Services />
          <WorksPosts works={works} />
          <Pagination nextUrl="/works" nextText="More Works" />
          <Posts posts={posts} />
          <Pagination nextUrl="/blog" nextText="More Posts" />
        </Container>
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
