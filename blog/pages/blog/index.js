// blog/index.js
import { getAllPosts } from "lib/api";
import Meta from "components/meta";
import Container from "components/container";
// import Hero from "components/hero";
import Posts from "components/posts";
import styles from "styles/cmsWrapper.module.css";

import { eyecatchLocal } from "lib/constants";
import HeroNews from "@/components/HeroNews";

export default function Blog({ posts }) {
  return (
    <>
      <HeroNews title="Blog" subtitle="Recent Posts" />
      <Container>
        <Meta pageTitle="ブログ" pageDesc="ブログの記事一覧" />
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
