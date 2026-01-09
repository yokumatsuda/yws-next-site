"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "styles/details.module.css";

export default function SystemPage() {
  /* =============================
   * 1) スライダー用ロジック
   * ============================= */
  const slides = [
    {
      title: "システム開発",
      text: "業務システム・管理システムの開発を通じて、業務の効率化とデジタル化を推進します。",
      textMobile: "業務の効率化とデジタル化",
      buttonText: "詳しく見る",
      bgImage: "/services-img/slider/system-blob3.gif",
      scrollTargetId: "dxSection", // ← システム開発 へスクロール
    },
    {
      title: "アプリ開発",
      text: "Webアプリ・スマホアプリの開発を行い、直感的な操作性と高いパフォーマンスを提供します。",
      textMobile: "Webアプリ・スマホアプリの開発",
      buttonText: "詳しく見る",
      bgImage: "/services-img/slider/system-blob1.gif",
      scrollTargetId: "efficiencySection", // ← アプリ開発 へスクロール
    },
    {
      title: "クラウド導入・AWS活用",
      titleMobile: ["クラウド導入・", "AWS活用"],
      text: "AWSやクラウドを活用したインフラ構築、サーバーレスアーキテクチャの設計・開発を支援します。",
      textMobile: "AWSやクラウドを活用したインフラ構築",
      buttonText: "詳しく見る",
      bgImage: "/services-img/slider/system-blob2.gif",
      scrollTargetId: "paperlessSection", // ← クラウド導入・AWS活用 へスクロール
    },
  ];

  // スライダーの状態管理
  const [currentIndex, setCurrentIndex] = useState(0);

  // TSの <HTMLDivElement[]> を消した版
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);
  const autoScrollRef = useRef(null);

  const autoScrollDelay = 6000;

  // 背景色を変化させる用
  const bgColors = ["#FDE2E2", "#FAF7B6", "#B8F2E6"];

  useEffect(() => {
    loadShowSlideDOM(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** スライドカードの配置 */
  function loadShowSlideDOM(index) {
    const newIndex = (index + slides.length) % slides.length;
    const center = newIndex;
    const left = (newIndex - 1 + slides.length) % slides.length;
    const right = (newIndex + 1) % slides.length;

    // 全カードを初期化
    cardRefs.current.forEach((card) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translate(-50%,-50%) scale(0.8)";
        card.style.zIndex = "0";
      }
    });

    // 中央カード
    const centerCard = cardRefs.current[center];
    if (centerCard) {
      centerCard.style.opacity = "1";
      centerCard.style.transform = "translate(-50%,-50%) scale(1)";
      centerCard.style.zIndex = "2";
    }

    // 左右のカード
    const translateValue = "120%";
    const leftCard = cardRefs.current[left];
    if (leftCard) {
      leftCard.style.opacity = "0.8";
      leftCard.style.transform = `translate(-50%,-50%) scale(0.8) translateX(-${translateValue})`;
      leftCard.style.zIndex = "1";
    }
    const rightCard = cardRefs.current[right];
    if (rightCard) {
      rightCard.style.opacity = "0.8";
      rightCard.style.transform = `translate(-50%,-50%) scale(0.8) translateX(${translateValue})`;
      rightCard.style.zIndex = "1";
    }

    // ドットを更新
    updateDots(newIndex);

    // 背景色を更新
    const wrapper = document.getElementById("my-slider1-wrapper");
    if (wrapper) {
      wrapper.style.backgroundColor = bgColors[newIndex % bgColors.length];
    }
  }

  /** ドットの外見更新 */
  function updateDots(activeIndex) {
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.classList.remove(styles.activeDot);
      if (i === activeIndex) {
        dot.classList.add(styles.activeDot);
      }
    });
  }

  /** オートスクロール */
  function startAutoScroll() {
    stopAutoScroll();
    setCurrentIndex((prev) => prev + 1);
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, autoScrollDelay);
    autoScrollRef.current = id;
  }

  function stopAutoScroll() {
    if (autoScrollRef.current !== null) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }

  /** スワイプ操作（レンダーで値が消えないように useRef へ） */
  const xDownRef = useRef(null);

  function handleTouchStart(e) {
    stopAutoScroll();
    if (e.touches && e.touches.length > 0) {
      xDownRef.current = e.touches[0].clientX;
    }
  }

  function handleTouchMove(e) {
    if (xDownRef.current === null) return;
    if (!e.touches || e.touches.length === 0) return;

    const xUp = e.touches[0].clientX;
    const xDiff = xDownRef.current - xUp;
    const threshold = 30;

    if (Math.abs(xDiff) > threshold) {
      if (xDiff > 0) {
        // 左スワイプ
        setCurrentIndex((prev) => prev + 1);
      } else {
        // 右スワイプ
        setCurrentIndex((prev) => prev - 1);
      }
      xDownRef.current = null;
    }
  }

  /** 前/次ボタン */
  function handlePrev() {
    stopAutoScroll();
    setCurrentIndex((prev) => prev - 1);
  }
  function handleNext() {
    stopAutoScroll();
    setCurrentIndex((prev) => prev + 1);
  }

  /** ドットクリック */
  function handleDotClick(i) {
    stopAutoScroll();
    setCurrentIndex(i);
  }

  /** ページ内スクロール用 (詳しく見る押下時) */
  function scrollWithOffset(id, offset = 10) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = y - offset;
    window.scrollTo({ top: yOffset, behavior: "smooth" });
  }

  /* =============================
   * 2) アコーディオン（カテゴリ別）
   * ============================= */

  /* --- カテゴリA: DX推進 --- */
  const accordionItemsDX = [
    {
      title: "業務自動化システム開発",
      subtitle:
        "業務の効率化・自動化を実現するシステム開発で、生産性向上とコスト削減を支援します。",
      desc: `
  ■ サービス概要
- データ入力・メール対応・帳票作成・承認フローなどの業務効率化
- API連携やクラウドシステムとの統合により、既存の業務環境を最適化
- カスタマイズ可能な業務自動化ツールの開発・導入

■ 導入メリット
- **作業時間の削減**：人手を介した業務を自動化し、作業時間を短縮
- **コスト削減**：人件費の削減と、業務プロセスの最適化によるコストダウン
- **業務の正確性向上**：AI・スクリプトによる処理で、ヒューマンエラーを削減
- **データの一元管理**：クラウドを活用し、リアルタイムでのデータ更新・共有が可能

■ システム概要（技術情報）
- **フロントエンド**：React / Next.js（直感的なUI設計）
- **バックエンド**：Node.js / Python（スクリプト・業務ロジック構築）
- **データベース**：MySQL（データ管理）
- **クラウド基盤**：AWS / GCP（クラウドインフラ・セキュリティ対策）
- **AI & 自動化**：AI-OCR / Google Apps Script（業務最適化・自動化ツール）

■ 導入事例
1️⃣ 「AI-OCRを活用し、請求書のデータ入力を自動化」
2️⃣ 「ECサイトの受注処理を自動化し、オペレーションコストを削減」
3️⃣ 「Pythonスクリプトを導入し、定型業務の自動処理を実現」

**📢 まずは無料相談から！**
業務の自動化・効率化を実現する最適なシステムをご提案します。`,
      image:
        "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/dx-image30.jpeg",
    },
    {
      title: "社内システム開発",
      subtitle:
        "企業の業務管理を効率化し、データ活用と業務の最適化を実現する社内システムを構築します。",
      desc: `■ サービス概要
- 企業の業務フローを管理する社内システムの開発（勤怠管理 / 在庫管理 /生産管理など）
- 既存システムとの連携・データ移行のサポート
- クラウド対応により、社内外からの安全なアクセスを確保
- 各種API連携（勤怠管理など）

■ 導入メリット
- **業務の可視化**：データを一元管理し、リアルタイムの分析・レポート作成が可能
- **業務効率化**：情報共有・承認フローの最適化により、作業のスピードを向上
- **コスト削減**：紙の書類や手作業での処理を減らし、運用コストを低減
- **セキュリティ強化**：権限管理・アクセス制御を導入し、安全な運用環境を確保

■ システム概要（技術情報）
- **フロントエンド**：React / Next.js（モダンなUI設計）
- **バックエンド**：Node.js / PHP / Python（柔軟な業務ロジック構築）
- **データベース**：MySQL（業務データの最適管理）
- **クラウド基盤**：AWS（スケーラブルなシステム構築）
- **API & 連携**：Slack / Google Workspace / ChatGPT API（業務ツールとの統合）

■ 導入事例
1️⃣ 「営業管理システムを構築し、顧客情報の一元管理を実現」
2️⃣ 「社内の勤怠管理をデジタル化し、給与計算との連携をスムーズに」
3️⃣ 「社内ポータルサイトを開発し、情報共有と社内コミュニケーションを活性化」

**📢 まずは無料相談から！**
社内の業務最適化を実現するシステム開発をサポートします。

      `,
      image:
        "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/dx-image46.jpeg",
    },
    {
      title: "小規模ビジネス向けシステム開発",
      subtitle: "スタートアップ・中小企業向けに、低コストで導入できるシステム開発を提供します。",
      desc: `
      ■ サービス概要
      - 紙の契約書・申請書・報告書などを電子化し、ペーパーレス環境を実現
      - 電子署名やワークフローシステムを活用し、契約・承認手続きをオンライン化
      - クラウドストレージと連携し、どこからでも安全にアクセス可能
    
      ■ 導入メリット
      - **コスト削減**：印刷・郵送・保管費用を削減し、業務のペーパーレス化を促進
      - **業務効率化**：書類の検索・共有を簡単にし、承認フローをスピードアップ
      - **セキュリティ強化**：アクセス管理・暗号化により、機密情報の安全性を確保
    
      ■ システム概要（技術情報）
      - **フロントエンド**：React / Next.js（直感的なUIで文書管理をサポート）
      - **バックエンド**：Node.js + TypeScript（APIによる安全なデータ処理）
      - **クラウドストレージ**：AWS S3 / Google Drive（セキュアな文書管理）
      - **電子署名・承認ワークフロー**：DocuSign / Adobe Sign（法的に有効な電子契約）
    
      ■ 導入事例
     1️⃣ 「電子契約を導入し、紙の契約書を削減し、承認業務を効率化」  
2️⃣ 「クラウド文書管理システムを導入し、書類検索や管理の手間を削減」  
3️⃣ 「モバイル対応の電子承認システムを導入し、外出先でも決裁が可能に」 

      **📢 まずは無料相談から！**  
      ペーパーレス化の導入事例や適用シナリオをご提案し、業務効率化をサポートします。
      `,
      image:
        "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/dx-image41.jpeg",
    },
  ];

  // ステート: どのパネルを開いているか (DX)
  const [openIndexDX, setOpenIndexDX] = useState(null);

  function handleToggleDX(index) {
    // 同じパネル => 閉じる
    if (openIndexDX === index) {
      setOpenIndexDX(null);
      return;
    }

    // 別パネルを開こうとした場合
    if (openIndexDX !== null) {
      // 既に開いているパネルを閉じる
      const nextIndex = index;
      setOpenIndexDX(null);

      // 閉じアニメ時間: 0.4s => 500ms余裕
      setTimeout(() => {
        // スクロール先 = "dx-header-<nextIndex>"
        const targetHeaderId = `dx-header-${nextIndex}`;
        const targetEl = document.getElementById(targetHeaderId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // スクロール完了待ち: 300ms後に新パネルを開く
        setTimeout(() => {
          setOpenIndexDX(nextIndex);
        }, 300);
      }, 500);
    } else {
      // 何も開いていない => すぐ開く
      setOpenIndexDX(index);
    }
  }

  /* --- カテゴリB: 業務効率化・自動化 --- */
  const accordionItemsEfficiency = [
    {
      title: "Webアプリ開発",
      subtitle:
        "ブラウザ上で動作するWebアプリを開発し、業務のDX化・サービスのオンライン化を支援します。",
      desc: `
     ■ サービス概要
- 業務システム、SaaS、予約管理、ECサイトなどのWebアプリを開発
- クロスプラットフォーム対応で、PC・タブレット・スマホで利用可能
- クラウド対応により、スケーラブルなシステムを実現
- API連携で、既存システムとの統合もスムーズに対応可能

■ 導入メリット
- **導入の容易さ**：インストール不要で、URLにアクセスするだけで利用可能
- **高い拡張性**：機能追加やカスタマイズが容易で、スモールスタートが可能
- **マルチデバイス対応**：デスクトップ・モバイルどちらからでもアクセス可能

■ システム概要（技術情報）
- **フロントエンド**：React / Next.js / Vue.js（モダンで直感的なUI設計）
- **バックエンド**：Node.js / Python / PHP（API開発 & データ処理）
- **データベース**：MySQL（クラウドデータ管理）
- **クラウド基盤**：AWS / Google Cloud（スケーラブルなインフラ構築）

■ 導入事例
1️⃣ 「SaaS型の業務管理Webアプリを開発し、社内のDX化を推進」  
2️⃣ 「ECサイトを開発し、オンライン販売の売上を向上」  
3️⃣ 「予約管理システムを構築し、業務の自動化と顧客対応の最適化を実現」  

**📢 まずは無料相談から！**
Webアプリの設計・開発・運用をワンストップでサポートします。
      `,
      image:
        "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/dx-image73.jpeg",
    },
    {
      title: "モバイルアプリ開発",
      subtitle: "業務の効率化・自動化を実現するモバイルアプリで、DXを加速。",
      desc: `■ サービス概要
- 契約書・請求書・報告書などの書類をデジタル管理できるモバイルアプリを開発
- 勤怠管理・在庫管理・プロジェクト管理・営業支援ツールに対応
- 直感的なUI/UX設計で、誰でも簡単に操作できるアプリを提供

■ 導入メリット
- **業務効率化**：手作業を削減し、社内の業務フローをデジタル化
- **業務効率化**：紙の書類を電子化し、検索・分類を簡単に
- **ペーパーレス化**：スマホやタブレットから文書を管理
- **自動化**：AI・スクリプトを活用し、データ入力や集計を自動化

■ システム概要（技術情報）
- **フロントエンド**：React（クロスプラットフォーム対応）
- **バックエンド**：Node.js（リアルタイムデータ管理）
- **データベース**：MySQL
- **クラウド基盤**：AWS Lambda

■ 導入事例
1️⃣ 「AI-OCRを活用し、紙の請求書を自動データ化」    
2️⃣ 「社内の勤怠管理アプリを開発し、打刻・休暇申請をモバイル化」  
3️⃣ 「在庫管理アプリを導入し、入出庫データをリアルタイム共有」  

**📢 まずは無料相談から！**
業務のDXを支援する最適なモバイルアプリを提供します。
`,
      image:
        "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/dx-image11.jpeg",
    },
  ];

  const [openIndexEfficiency, setOpenIndexEfficiency] = useState(null);

  function handleToggleEfficiency(index) {
    if (openIndexEfficiency === index) {
      setOpenIndexEfficiency(null);
      return;
    }

    if (openIndexEfficiency !== null) {
      const nextIndex = index;
      setOpenIndexEfficiency(null);

      // 閉じてからスクロール → 開く (同じパターン)
      setTimeout(() => {
        const targetId = `efficiency-header-${nextIndex}`;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setTimeout(() => {
          setOpenIndexEfficiency(nextIndex);
        }, 300);
      }, 500);
    } else {
      setOpenIndexEfficiency(index);
    }
  }

  /* --- カテゴリC: ペーパーレス --- */
  const accordionItemsPaperless = [
    {
      title: "クラウド環境構築・インフラ最適化",
      subtitle:
        "AWSを活用し、安定したクラウド環境を構築。最適なインフラ設計でコストを削減し、パフォーマンスを最大化。",
      desc: `■ サービス概要
- AWS / GCPを活用したクラウドインフラ設計・構築
- サーバーレスアーキテクチャ（AWS Lambda）を導入し、運用コストを最適化
- データベース（Amazon RDS）を最適化し、高速かつ安全なデータ管理を実現

■ 導入メリット
- **高可用性の確保**：マルチリージョン対応により、障害発生時でもシステムの安定稼働が可能
- **運用コストの最適化**：AWSのリソースを最適化し、無駄なコストを削減
- **スケーラブルな環境構築**：アクセス数の変動に応じて柔軟にスケール調整

■ システム概要（技術情報）
- **クラウド基盤**：AWS（EC2, Lambda, S3, RDS）
- **ネットワーク管理**：VPC / Cloudflare / CloudFront（CDN）
- **データベース管理**：Amazon RDS（MySQL）
- **セキュリティ対策**：AWS / IAM（アクセス管理）

■ 導入事例
1️⃣ 「ECサイトのAWS環境を構築し、スケーラブルなサーバー運用を実現」  
2️⃣ 「業務システムのサーバーレス化を推進し、管理コストと運用負担を軽減」  
3️⃣ 「データベースをAWS RDSに移行し、バックアップ自動化とパフォーマンス向上を実現」  

**📢 まずは無料相談から！**
クラウド環境の最適化・インフラ構築をトータルでサポートします。
 `,
      image:
        "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/cloud1.jpeg",
    },
    {
      title: "業務システムのクラウド移行",
      subtitle:
        "既存のオンプレミス環境からクラウドへ移行し、業務システムの運用負荷を軽減・DXを推進。",
      desc: `
      ■ サービス概要
      - **契約書の作成・送信・署名・管理** をすべてオンラインで完結
      - **電子署名・タイムスタンプ** を活用し、法的に有効な契約締結を実現
      - **契約テンプレート管理** で、契約手続きのスピードと正確性を向上
      - **マルチデバイス対応** により、PC・スマホ・タブレットで契約を確認・締結可能
    
      ■ 導入メリット
      - **契約締結スピードの向上**：従来の紙契約に比べ、承認フローの時間を50%以上削減
      - **コスト削減**：印刷・郵送・保管コストをゼロにし、契約業務の効率化を実現
      - **セキュリティ強化**：電子署名・アクセス管理機能により、契約データを安全に保護
      - **リモートワーク対応**：場所を問わず契約手続きが可能になり、ビジネスの柔軟性が向上
    
      ■ システム概要（技術情報）
      - **フロントエンド**：React / Next.js（直感的なUIでスムーズな契約フローを実現）
      - **バックエンド**：Node.js + TypeScript（契約プロセスの自動化と高度なセキュリティを実装）
      - **電子署名連携**：DocuSign / Adobe Sign / CloudSign API（各国の電子契約法に準拠）
      - **クラウドストレージ**：AWS S3 / Google Drive（契約データの安全な保管と共有）
      - **ワークフロー管理**：Slack / Teams 連携で、契約進捗をリアルタイム通知
    
      ■ 導入事例
      1️⃣ 「契約締結をオンライン化し、業務負担を軽減」  
2️⃣ 「紙の契約書をデジタル化し、署名手続きをスムーズに」  
3️⃣ 「承認フローをデジタル化し、契約手続きを効率化」  
    
      **📢 まずは無料相談から！**  
      電子契約サービスの導入で、契約業務のDXをサポートします。
      `,
      image:
        "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/dx-image44.jpeg",
    },
  ];

  const [openIndexPaperless, setOpenIndexPaperless] = useState(null);

  function handleTogglePaperless(index) {
    if (openIndexPaperless === index) {
      setOpenIndexPaperless(null);
      return;
    }
    if (openIndexPaperless !== null) {
      const nextIndex = index;
      setOpenIndexPaperless(null);

      setTimeout(() => {
        const targetId = `paperless-header-${nextIndex}`;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setTimeout(() => {
          setOpenIndexPaperless(nextIndex);
        }, 300);
      }, 500);
    } else {
      setOpenIndexPaperless(index);
    }
  }

  /* =============================
   * 3) JSX レンダリング
   * ============================= */
  return (
    <>
      {/* ========== スライダーエリア ========== */}
      <div id="my-slider1-wrapper" className={styles.Container}>
        <div
          className={styles.mySlider1Container}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={styles.mySlider1Card}
              style={{
                backgroundImage: slide.bgImage ? `url(${slide.bgImage})` : undefined,
              }}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
            >
              <div className={styles.mySlider1CardContent}>
                {/* PC用タイトル */}
                <h2 className={styles.slideTitleDesktop}>{slide.title}</h2>

                {/* モバイル用タイトル（配列なら改行して表示） */}
                <h2 className={styles.slideTitleMobile}>
                  {Array.isArray(slide.titleMobile)
                    ? slide.titleMobile.map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          {idx !== slide.titleMobile.length - 1 && <br />}
                        </React.Fragment>
                      ))
                    : slide.titleMobile ?? slide.title}
                </h2>

                {/* ✅ PC用（長い文） */}
                <p className={styles.slideTextDesktop}>
                  {slide.text.split("\n").map((part, idx) => (
                    <React.Fragment key={idx}>
                      {part}
                      <br />
                    </React.Fragment>
                  ))}
                </p>

                <p className={styles.slideTextMobile}>
                  {(slide.textMobile ?? slide.text).split("\n").map((part, idx) => (
                    <React.Fragment key={idx}>
                      {part}
                      <br />
                    </React.Fragment>
                  ))}
                </p>

                {slide.buttonText && slide.scrollTargetId && (
                  <button
                    className={styles.cardButton}
                    onClick={() => scrollWithOffset(slide.scrollTargetId, 80)}
                  >
                    {slide.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* 前・次ボタン */}
          <button className={styles.mySlider1Prev} onClick={handlePrev}>
            &lt;
          </button>
          <button className={styles.mySlider1Next} onClick={handleNext}>
            &gt;
          </button>
        </div>

        {/* ドットナビ */}
        <div className={styles.mySlider1Dots}>
          {slides.map((_, i) => (
            <span
              key={i}
              className={styles.mySlider1Dot}
              ref={(el) => {
                if (el) dotRefs.current[i] = el;
              }}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </div>

        {/* Play/Stop ボタン */}
        <div className={styles.mySlider1Controls}>
          <button onClick={startAutoScroll}>Play</button>
          <button onClick={stopAutoScroll}>Stop</button>
        </div>
      </div>

      {/* ========== アコーディオンエリア ========== */}
      <section className={styles.extraSection}>
        <div className={styles.categoriesWrapper}>
          {/* === カテゴリA: DX推進 === */}
          <div className={styles.categoryBlock}>
            <h2 id="dxSection" className={styles.categoryTitle}>
              システム開発
            </h2>
            {accordionItemsDX.map((item, idx) => {
              const isOpen = openIndexDX === idx;
              return (
                <div key={idx} className={styles.accordionItem}>
                  <div
                    id={`dx-header-${idx}`}
                    className={styles.accordionHeader}
                    onClick={() => handleToggleDX(idx)}
                  >
                    <div>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <span className={styles.cardLabel}>{item.subtitle}</span>
                    </div>
                    <span className={`${styles.accordionArrow} ${isOpen ? styles.open : ""}`}>
                      ▼
                    </span>
                  </div>

                  <div className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}>
                    <div className={styles.accordionContentInner}>
                      <div className={styles.cardTextArea}>
                        <p className={styles.cardDesc}>{item.desc}</p>
                        <div className={styles.buttonRow}>
                          <button
                            className={styles.linkButton}
                            onClick={() => (window.location.href = "/contact")}
                          >
                            お問い合わせ
                          </button>
                          <button
                            className={styles.linkButton}
                            onClick={() => (window.location.href = "/use")}
                          >
                            ご利用の流れ
                          </button>
                        </div>
                      </div>
                      <div className={styles.cardImageWrapper}>
                        <img src={item.image} alt={item.title} className={styles.cardImage} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* === カテゴリB: 業務効率化・自動化 === */}
          <div className={styles.categoryBlock}>
            <h2 id="efficiencySection" className={styles.categoryTitle}>
              アプリ開発
            </h2>
            {accordionItemsEfficiency.map((item, idx) => {
              const isOpen = openIndexEfficiency === idx;
              return (
                <div key={idx} className={styles.accordionItem}>
                  <div
                    id={`efficiency-header-${idx}`}
                    className={styles.accordionHeader}
                    onClick={() => handleToggleEfficiency(idx)}
                  >
                    <div>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <span className={styles.cardLabel}>{item.subtitle}</span>
                    </div>
                    <span className={`${styles.accordionArrow} ${isOpen ? styles.open : ""}`}>
                      ▼
                    </span>
                  </div>

                  <div className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}>
                    <div className={styles.accordionContentInner}>
                      <div className={styles.cardTextArea}>
                        <p className={styles.cardDesc}>{item.desc}</p>
                        <div className={styles.buttonRow}>
                          <button
                            className={styles.linkButton}
                            onClick={() => (window.location.href = "/contact")}
                          >
                            お問い合わせ
                          </button>
                          <button
                            className={styles.linkButton}
                            onClick={() => (window.location.href = "/use")}
                          >
                            ご利用の流れ
                          </button>
                        </div>
                      </div>
                      <div className={styles.cardImageWrapper}>
                        <img src={item.image} alt={item.title} className={styles.cardImage} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* === カテゴリC: ペーパーレス === */}
          <div className={styles.categoryBlock}>
            <h2 id="paperlessSection" className={styles.categoryTitle}>
              クラウド導入・AWS活用
            </h2>
            {accordionItemsPaperless.map((item, idx) => {
              const isOpen = openIndexPaperless === idx;
              return (
                <div key={idx} className={styles.accordionItem}>
                  <div
                    id={`paperless-header-${idx}`}
                    className={styles.accordionHeader}
                    onClick={() => handleTogglePaperless(idx)}
                  >
                    <div>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <span className={styles.cardLabel}>{item.subtitle}</span>
                    </div>
                    <span className={`${styles.accordionArrow} ${isOpen ? styles.open : ""}`}>
                      ▼
                    </span>
                  </div>

                  <div className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}>
                    <div className={styles.accordionContentInner}>
                      <div className={styles.cardTextArea}>
                        <p className={styles.cardDesc}>{item.desc}</p>
                        <div className={styles.buttonRow}>
                          <button
                            className={styles.linkButton}
                            onClick={() => (window.location.href = "/contact")}
                          >
                            お問い合わせ
                          </button>
                          <button
                            className={styles.linkButton}
                            onClick={() => (window.location.href = "/use")}
                          >
                            ご利用の流れ
                          </button>
                        </div>
                      </div>
                      <div className={styles.cardImageWrapper}>
                        <img src={item.image} alt={item.title} className={styles.cardImage} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
