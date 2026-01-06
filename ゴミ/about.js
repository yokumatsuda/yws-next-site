import Meta from "components/meta";
import Container from "components/container";
import Hero from "components/hero";
import PostBody from "components/post-body";
import Contact from "components/contact";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "components/two-column";
import Accordion from "components/accordion";
import Image from "next/image";
import eyecatch from "public/images-post/about.jpg";

export default function About() {
  return (
    <Container>
      <Meta
        pageTitle="アバウト"
        pageDesc="About development activities"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />

      <Hero title="About" subtitle="About development activities" />
      <figure>
        <Image
          src={eyecatch}
          alt="ロケット画像"
          style={{ width: "100%", height: "auto" }}
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
          placeholder="blur"
        />
      </figure>
      {/* <img src="/images-post/rocket.jpg" alt="" /> */}
      <TwoColumn>
        <TwoColumnMain>
          <PostBody>
            <p>
              YWSが得意とする分野は、モダンで高機能なWebサービスの開発です。私たちは単なるWebサイト制作に留まらず、クライアントの業務を効率化するシステム構築や、DX（デジタルトランスフォーメーション）支援まで幅広く対応しています。
            </p>
            <h2>目指していること</h2>
            <p>
              私たちYWSは、単にWebサイトやシステムを作るだけではなく、クライアントのビジネス課題を解決し、成長を加速させることを目指しています。最新の技術と独自のノウハウを駆使し、ユーザーにとって使いやすく、運営側にとって効率的なWebサービスの提供を追求しています。また、常に新しい挑戦を恐れず、変化の早いデジタル環境の中でも柔軟に対応できる体制づくりを大切にしています。
            </p>
            <h3>新しいことへのチャレンジ</h3>
            <p>
              YWSは、常に最新の技術やトレンドに目を向け、新しい挑戦を積極的に取り入れています。新しいアイデアやツールを恐れず試すことで、クライアントにとってより価値のあるソリューションを提供し、Web制作の可能性を広げていきます。変化をチャンスと捉え、挑戦し続けることが私たちの原動力です。
            </p>
            <h2>FAQ</h2>
            <Accordion heading="システム開発について">
              <p>
                当社では、お客様のご要望や課題に合わせたオーダーメイドのシステム開発を行っています。
                業務効率化ツール、Webアプリケーション、管理システム、電子契約システムなど、
                幅広い開発に対応可能です。
                <br />
                <br />
                「既存システムを改善したい」「紙の業務をデジタル化したい」
                「社内業務を自動化したい」などのご相談にも柔軟に対応いたします。
                <br />
                <br />
                開発規模の大小にかかわらず、要件定義から設計・実装・テスト・運用までを
                一貫してサポートいたします。費用や期間については、内容をヒアリングのうえ
                無料でお見積もりいたしますので、お気軽にご相談ください。
              </p>
            </Accordion>
            <Accordion heading="Webデザインについて">
              <p>
                当社では、企業やサービスの魅力を最大限に引き出す「戦略的なWebデザイン」を提供しています。
                ただ見た目がきれいなだけでなく、ユーザーの行動導線やブランドイメージを考慮した
                デザイン設計を行います。
                <br />
                <br />
                コーポレートサイト、サービスサイト、ランディングページ、ECサイトなど、
                目的に応じた最適なデザインをご提案いたします。
                <br />
                <br />
                デザインのみのご依頼はもちろん、サイト構築やシステム開発とセットでの
                トータル制作も可能です。
                <br />
                <br />
                「集客を強化したい」「デザインを一新したい」「スマホ対応を改善したい」
                といったご相談も承っております。お気軽にお問い合わせください。
              </p>
            </Accordion>
            <Accordion heading="DXソリューションについて">
              <p>
                当社のDXソリューションは、業務のデジタル化・自動化を通じて
                「生産性の向上」と「コスト削減」を実現することを目的としています。
                <br />
                <br />
                既存の業務フローを丁寧にヒアリングし、無駄な作業やアナログ管理を洗い出した上で、
                AI・クラウド・自社開発ツールなどを組み合わせた最適なシステムを提案いたします。
                <br />
                <br />
                紙ベースの書類処理や、複数サービス間でのデータ連携、Excel・スプレッドシートの自動処理など、
                あらゆる課題に対応可能です。
                <br />
                <br />
                また、DX推進における初期段階のコンサルティングや、導入後の運用サポートまで
                ワンストップで対応いたします。
              </p>
            </Accordion>
          </PostBody>
        </TwoColumnMain>
        <TwoColumnSidebar>
          <Contact />
        </TwoColumnSidebar>
      </TwoColumn>
    </Container>
  );
}
