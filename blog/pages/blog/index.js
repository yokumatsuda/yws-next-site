// blog/index.js
import { getAllPosts } from "lib/api";
import Meta from "components/meta";
import Container from "components/container";

import Posts from "components/posts";
import styles from "styles/cmsWrapper.module.css";

import { eyecatchLocal } from "lib/constants";
import HeroNews from "@/components/HeroNews";

export default function Blog({ posts }) {
  return (
    <>
      <Meta
        pageTitle="ブログ｜ホームページ制作・EC運営・Web活用"
        pageDesc="ホームページ制作、ECサイト運営、Webデザイン、SEO、業務効率化に関する情報を発信しています。"
      />
      <HeroNews title="Blog" subtitle="Recent Posts" />
      <Container>
        <div className={styles.cmsWrapper}>
          <Posts posts={posts} />
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();

  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
  }

  return {
    props: {
      posts: posts,
    },
  };
}
