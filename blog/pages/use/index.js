import UsePageHeroSection from "./UsePageHeroSection/UsePageHeroSection";
import UsePageIntroSection from "./UsePageIntroSection/UsePageIntroSection";
import UsePageContactSection from "./UsePageContactSection/UsePageContactSection";
import Meta from "components/meta";

function UsePage() {
  return (
    <>
      <Meta
        pageTitle="金沢市のホームページ制作・ショッピングサイト"
        pageDesc="石川県・金沢市でホームページ制作、ショッピングサイト制作、DX支援まで対応。成果につながるモダンなサイトをご提案します。"
      />
      <UsePageHeroSection />
      <UsePageIntroSection />
      <UsePageContactSection />
    </>
  );
}

export default UsePage;
