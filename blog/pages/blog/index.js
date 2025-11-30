// blog/index.js
import { getAllPosts } from "lib/api";
import Meta from "components/meta";
import Container from "components/container";
import Hero from "components/hero";
import Posts from "components/posts";

// blur生成ようのimport3つ
// import path from "path";
// import fs from "fs";
// import { getPlaiceholder } from "plaiceholder";

import { eyecatchLocal } from "lib/constants";

export default function Blog({ posts }) {
  return (
    <Container>
      <Meta pageTitle="ブログ" pageDesc="ブログの記事一覧" />
      <Hero title="Blog" subtitle="Recent Posts" />
      <Posts posts={posts} />
    </Container>
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
