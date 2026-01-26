// pages/index.js
import { useEffect, useRef, useState, useCallback } from "react";
import Loading from "components/loading";
import Meta from "components/meta";
import Container from "components/container";
import HeroSection from "components/hero-circle-animation";
import Posts from "components/posts";
import WorksPosts from "components/works-posts";
import Pagination from "components/pagination";
import Services from "components/services";
import { eyecatchLocal } from "lib/constants";
import { getAllPosts, getAllWorks } from "lib/api";
import styles from "styles/Home.module.css";

export default function Home({ works, posts }) {
  const MIN_MS = 3000; // ✅ ロード完了しても最低これだけ表示
  const MAX_MS = 4000; // ✅ これ以上は待たず強制的に終了（永遠ローディング防止）

  const [loading, setLoading] = useState(true);
  const [showHero, setShowHero] = useState(false); // ローディング後に表示用Heroを出す

  const startedAt = useRef(0);
  const finishTimer = useRef(null);
  const finished = useRef(false);

  // ✅ ローディング終了（1回だけ）
  const finishLoading = useCallback(() => {
    if (finished.current) return;
    finished.current = true;

    setLoading(false);
    setShowHero(true); // ✅ ローディングが終わった瞬間にHeroを表示（この時点で0秒再生）
  }, []);

  // ✅ 初回：開始時刻 + MAXタイマー（永遠ローディング防止）
  useEffect(() => {
    startedAt.current = Date.now();

    finishTimer.current = setTimeout(() => {
      finishLoading(); // MAX_MSで強制終了
    }, MAX_MS);

    return () => {
      if (finishTimer.current) clearTimeout(finishTimer.current);
    };
  }, [finishLoading]);

  // ✅ 「準備完了」イベントを受けたら、MIN_MSを満たす時点で終了させる
  const handleReady = useCallback(() => {
    if (finished.current) return;

    const elapsed = Date.now() - startedAt.current;
    const wait = Math.max(0, MIN_MS - elapsed);

    // MAXタイマーを止めて、MINの残りだけ待つ
    if (finishTimer.current) clearTimeout(finishTimer.current);

    finishTimer.current = setTimeout(() => {
      finishLoading();
    }, wait);
  }, [finishLoading]);

  return (
    <>
      <Meta
        pageTitle="金沢市のホームページ制作・ショッピングサイト"
        pageDesc="石川県・金沢市でホームページ制作、ショッピングサイト制作、DX支援まで対応。成果につながるモダンなサイトをご提案します。"
      />

      {/* ✅ ローディング */}
      <Loading show={loading} />

      {/* ✅ ローディング中：Heroを「プリロード」だけする（非表示＆再生しない＆進めない） */}
      {loading && <HeroSection key="hero-preload" mode="preload" onHeroReady={handleReady} />}

      {/* ✅ ローディング終了後：Heroを表示用として別keyでマウント → 必ず0秒から再生 */}
      {showHero && <HeroSection key="hero-show" mode="show" title="YWS" subtitle="" imageOn />}

      {!loading && (
        <Container>
          <Services />
          <WorksPosts works={works} />
          <Pagination nextUrl="/works" nextText="More Works" />
          <div className={styles.postsSpacing}>
            <Posts posts={posts} />
          </div>
          <Pagination nextUrl="/blog" nextText="More Posts" />
        </Container>
      )}
    </>
  );
}

export async function getStaticProps() {
  const works = await getAllWorks(8);
  const posts = await getAllPosts(8);

  for (const work of works) {
    if (!work.hasOwnProperty("eyecatch")) work.eyecatch = eyecatchLocal;
  }
  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) post.eyecatch = eyecatchLocal;
  }

  return { props: { works, posts } };
}
