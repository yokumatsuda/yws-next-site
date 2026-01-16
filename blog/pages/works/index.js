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
      <Meta
        pageTitle="制作実績｜ホームページ制作・ネットショップ制作｜金沢市"
        pageDesc="金沢市・石川県でのホームページ制作・ネットショップ制作の実績紹介。業種・目的別のWeb制作事例をご覧いただけます。"
      />
      <HeroWorks title="Works" subtitle="実績一覧" />
      <Container>
        {/* <Meta pageTitle="Works" pageDesc="実績一覧" /> */}
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
