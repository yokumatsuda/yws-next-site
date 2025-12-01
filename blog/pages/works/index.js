// pages/works/index.js
import { getAllWorks } from "lib/api";
import Meta from "components/meta";
import Container from "components/container";
import Hero from "components/hero";
import WorksPosts from "components/works-posts";
import { eyecatchLocal } from "lib/constants";

export default function WorksIndex({ works }) {
  return (
    <Container>
      <Meta pageTitle="Works" pageDesc="実績一覧" />
      <Hero title="Works" subtitle="実績一覧" />
      <WorksPosts works={works} />
    </Container>
  );
}

export async function getStaticProps() {
  const works = await getAllWorks();
  

  // eyecatchがない場合のフォールバックを追加
  for (const work of works) {
    if (!work.hasOwnProperty("eyecatch") || !work.eyecatch?.url) {
      work.eyecatch = eyecatchLocal;
    }
  }

  return {
    props: { works },
  };
}
