// pages/about/index.js
import Top from "components/Top";
import Greeting from "components/Greeting";
import TechList from "components/TechList";
import Info from "components/Info";
import Meta from "components/meta";

export default function AboutPage() {
  return (
    <>
      <Meta
        pageTitle="YWSについて｜金沢市のホームページ・ネットショップ制作会社"
        pageDesc="石川県・金沢市でホームページ制作・ネットショップ制作を行うYWS。私たちの理念や制作スタイルをご紹介します。"
      />
      <Top />
      <Greeting />
      <TechList />
      <Info />
    </>
  );
}
