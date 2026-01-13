// pages/works/index.js
import { getAllWorks } from "lib/api";
import Meta from "components/meta";
import Container from "components/container";
// import Hero from "components/hero";
import WorksPosts from "components/works-posts";
import { eyecatchLocal } from "lib/constants";
import styles from "styles/cmsWrapper.module.css";
import HeroWorks from "@/components/HeroWorks";

export default function WorksIndex({ works }) {
  return (
    <>
      <HeroWorks title="Works" subtitle="実績一覧" />
      <Container>
        <Meta pageTitle="Works" pageDesc="実績一覧" />
        <div className={styles.cmsWrapper}>
          <WorksPosts works={works} />
        </div>
      </Container>
    </>
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
