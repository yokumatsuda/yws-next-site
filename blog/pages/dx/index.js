import React, { useEffect, useRef, useState, createRef } from "react";
import styles from "styles/details.module.css";
import setBgVideoSources from "components/setBgVideoSources";

function dx() {
  /* =============================
   * 1) スライダー用ロジック
   * ============================= */
  const slides = [
    {
      title: "DX推進",
      text: "DXを推進することで、紙の業務から脱却し、デジタル化と業務最適化を加速。",
      textMobile: "デジタル化と業務最適化を加速",
      buttonText: "詳しく見る",

      bgVideoMp4: "/services-img/slider-video/dx-blob3.mp4",
      bgVideoWebm: "/services-img/slider-video/dx-blob3.webm",
      // ✅ 黒画面対策
      poster: "/services-img/slider-video/dx-blob3.webp",

      scrollTargetId: "dxSection",
    },
    {
      title: "業務効率化・自動化",
      titleMobile: ["業務効率化・", "自動化"],
      text: "DXを活用し、電子契約やデジタル書類管理を導入すれば、業務フローが簡素化されます。",
      textMobile: "デジタル書類管理で業務効率化",
      buttonText: "詳しく見る",

      bgVideoMp4: "/services-img/slider-video/dx-blob1.mp4",
      bgVideoWebm: "/services-img/slider-video/dx-blob1.webm",
      poster: "/services-img/slider-video/dx-blob1.webp",

      scrollTargetId: "efficiencySection",
    },
    {
      title: "ペーパーレス化",
      text: "AIやOCRで紙の書類を自動データ化し、分類・検索も瞬時に完了。業務効率と生産性を同時に向上させます。",
      textMobile: "AI/OCRで書類を自動データ化",
      buttonText: "詳しく見る",

      bgVideoMp4: "/services-img/slider-video/dx-blob2.mp4",
      bgVideoWebm: "/services-img/slider-video/dx-blob2.webm",
      poster: "/services-img/slider-video/dx-blob2.webp",

      scrollTargetId: "paperlessSection",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // DOM参照
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);

  // ✅ 背景 video の参照（スライド数ぶん）
  const videoRefs = useRef(slides.map(() => createRef()));

  // オートスクロール
  const autoScrollRef = useRef(null);
  const autoScrollDelay = 4000;

  // スワイプ開始位置（useRefで保持）
  const xDownRef = useRef(null);

  const bgColors = ["#FDE2E2", "#FAF7B6", "#B8F2E6"];

  useEffect(() => {
    loadShowSlideDOM(currentIndex);
    // ✅ 表示スライド（中央）だけ再生し、左右は先読みして停止
    const newIndex = (currentIndex + slides.length) % slides.length;
    const center = newIndex;
    const left = (newIndex - 1 + slides.length) % slides.length;
    const right = (newIndex + 1) % slides.length;

    // 中央/左右を先に source セット（黒画面を減らす）
    [center, left, right].forEach((idx) => {
      const v = videoRefs.current[idx]?.current;
      const s = slides[idx];
      if (!v) return;
      setBgVideoSources(
        v,
        { mp4: s.bgVideoMp4, webm: s.bgVideoWebm, poster: s.poster },
        idx === center ? "auto" : "metadata"
      );
    });

    // 再生制御：中央だけ play、他は pause
    slides.forEach((_, idx) => {
      const v = videoRefs.current[idx]?.current;
      if (!v) return;
      if (idx === center) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });

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

    // 全カード初期化
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

    // 左右カード
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

    // ドット更新
    updateDots(newIndex);

    // 背景色更新
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

  /** スワイプ操作 */
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
        setCurrentIndex((prev) => prev + 1);
      } else {
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

  /** ページ内スクロール用 */
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

  const accordionItemsDX = [
    {
      title: "DXの推進",
      subtitle:
        "業務のデジタル化と自動化でコスト削減と生産性向上を実現し、企業のDX推進をサポートします。",
      desc: `
      ■ サービス概要
      - 紙の書類や非効率な業務フローをデジタル化し、契約・承認プロセスをオンラインで完結
      - AIやスクリプトによる自動化により、作業時間を短縮し業務負担を軽減
      - 既存の社内システムやクラウドサービスとの柔軟な連携が可能
    
      ■ 導入メリット
      - **コスト削減**：電子契約・デジタル文書管理で印刷・郵送コストを削減
      - **業務効率化**：社内承認・契約業務のリードタイムを短縮し、スピーディーな意思決定を支援
      - **セキュリティ強化**：データの暗号化やアクセス管理により、安全な情報共有を実現
    
      ■ システム概要（技術情報）
      - **フロントエンド**：React / Next.js（モダンで直感的なUI設計）
      - **バックエンド**：Node.js + TypeScript（セキュアなAPIとスケーラブルなサーバー設計）
      - **クラウド基盤**：AWS / GCP（高可用性と拡張性を確保）
      - **AI & 自動化**：AI-OCR / Python（データ処理の自動化 & 業務最適化）
    
      ■ 導入事例
      1️⃣ 「契約締結・請求書発行を電子化し、業務の効率化と負担軽減を実現」
      2️⃣ 「AI-OCRを活用し、紙書類のデータ入力ミスを大幅に削減」
      3️⃣ 「AIチャットボットを導入し、問い合わせ対応の自動化を実現」
    
      **📢 まずは無料相談から！**  
      DX導入の具体的なシナリオを提案し、業務効率化の実現をサポートします。
      `,
      image: "/services-img/dx/dx-image22.jpeg",
    },
    {
      title: "業務自動化",
      subtitle:
        "データ入力、メール対応、書類管理、Excel作業を自動化し、時間とコストを削減。DXで生産性向上と業務負担を軽減します。",
      desc: `
      ■ サービス概要
      - AI-OCR、Pythonなどを活用し、業務の自動化を実現
      - 定型的なデータ入力、メール対応、承認フローなどの手作業を削減
      - クラウド連携やAPI統合により、スムーズなワークフローを構築
    
      ■ 導入メリット
      - **業務効率化**：手作業を大幅に削減し、作業時間を短縮
      - **コスト削減**：人的リソースの最適化により、運用コストを削減
      - **エラー低減**：AIによるデータ処理で、入力ミスやオペレーションミスを防止
      - **柔軟な拡張性**：既存システムとの統合により、幅広い業務に適用可能
    
      ■ システム概要（技術情報）
      - **フロントエンド**：React / Next.js（直感的なUIと操作性を実現）
      - **バックエンド**：Node.js + TypeScript（APIとデータ処理を最適化）
      - **RPA & 自動化**：AI-OCR、Python、Google Apps Script（定型業務を自動化）
      - **クラウド基盤**：AWS / GCP（高可用性・拡張性を確保）
    
      ■ 導入事例
      1️⃣ 「メール問い合わせの自動返信を導入し、対応時間を短縮」
      2️⃣ 「AI-OCRと自動仕分けを活用し、請求書処理の効率を向上」
      3️⃣ 「Excelマクロを活用し、レポート作成の業務負担を軽減」
    
      **📢 まずは無料相談から！**  
      自動化の導入事例や適用シナリオをご提案し、業務効率化をサポートします。
      `,
      image: "/services-img/dx/dx-image26.jpeg",
    },
    {
      title: "ペーパーレス化",
      subtitle:
        "紙書類を電子化し、デジタル文書管理・電子契約の導入で業務効率化。クラウド活用で安全にデータを管理し、スムーズな業務環境を実現します。",
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
      - **クラウドストレージ**：AWS S3 / Google Drive / Firebase（セキュアな文書管理）
      - **電子署名・承認ワークフロー**：DocuSign / Adobe Sign（法的に有効な電子契約）
    
      ■ 導入事例
      1️⃣ 「電子契約を導入し、紙の契約書を削減し、承認業務を効率化」  
      2️⃣ 「クラウド文書管理システムを導入し、書類検索や管理の手間を削減」  
      3️⃣ 「ペーパーレス会議を実施し、印刷コストと紙の使用量を削減」  
    
      **📢 まずは無料相談から！**  
      ペーパーレス化の導入事例や適用シナリオをご提案し、業務効率化をサポートします。
      `,
      image: "/services-img/dx/paperless_10.jpeg",
    },
  ];

  const [openIndexDX, setOpenIndexDX] = useState(null);

  function handleToggleDX(index) {
    if (openIndexDX === index) {
      setOpenIndexDX(null);
      return;
    }

    if (openIndexDX !== null) {
      const nextIndex = index;
      setOpenIndexDX(null);

      setTimeout(() => {
        const targetHeaderId = `dx-header-${nextIndex}`;
        const targetEl = document.getElementById(targetHeaderId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        setTimeout(() => {
          setOpenIndexDX(nextIndex);
        }, 300);
      }, 500);
    } else {
      setOpenIndexDX(index);
    }
  }

  const accordionItemsEfficiency = [
    {
      title: "データ入力の自動化",
      subtitle:
        "AI-OCRとPythonなどを活用し、手作業のデータ入力を自動化。業務効率を向上させ、人的ミスを削減することで、正確かつ迅速なデータ処理を実現します。",
      desc: `
      ■ サービス概要
      - 紙媒体やPDFの書類をOCRでデータ化し、入力業務を自動化
      - AIによる文字認識精度の向上とエラー検知で、誤入力を最小限に
      - 既存の業務システムやクラウドサービスとの柔軟な連携が可能
    
      ■ 導入メリット
      - **コスト削減**：手作業の入力時間を短縮し、業務リソースの最適化
      - **業務効率化**：AI-OCRを活用し、データ処理スピードを大幅に向上
      - **ヒューマンエラーの削減**：データ入力のミスを自動検出し、修正プロセスを簡素化
      - **業務フローの標準化**：ルールベースの自動入力により、作業のばらつきを低減
    
      ■ システム概要（技術情報）
      - **フロントエンド**：React / Next.js（シンプルで直感的なデータ入力UI）
      - **バックエンド**：Node.js + TypeScript（セキュアなデータ処理 & API連携）
      - **クラウド連携**：Google Sheets / Excel Online（データ同期 & 自動反映）
    
      ■ 導入事例
      1️⃣ 「受領した注文書をスキャン・OCR解析し、仕分け作業を自動化」  
      2️⃣ 「紙の申込書をOCRデータ化し、顧客情報の登録を効率化」  
      3️⃣ 「PDF請求書の金額・日付情報を自動抽出し、経理業務の処理をスムーズに」  
    
      **📢 まずは無料相談から！**  
      業務に最適なデータ入力の自動化ソリューションを提案し、DXの推進を支援します。
      `,
      image: "/services-img/dx/dx-image26.jpeg",
    },
    {
      title: "ブラウザ操作を自動化",
      subtitle:
        "PythonやAIを活用し、ブラウザ上の定型業務を自動化。データ入力・情報収集・フォーム送信を効率化し、手作業の負担を軽減します。",
      desc: `
      ■ サービス概要
      - Pythonスクリプトでブラウザ操作を自動化し、業務の効率化とミス削減を実現
      - ログイン、フォーム入力、クリック操作、データ収集などの反復作業を省力化
      - 業務フローを標準化し、人的ミスの削減と作業時間の短縮を実現
    
      ■ 導入メリット
      - **作業時間の短縮**：データ入力や情報収集を自動化し、業務負担を軽減
      - **人的ミスの削減**：スクリプト化による一貫した処理でエラー発生を抑制
      - **業務フローの最適化**：反復作業を自動化し、社員が戦略的業務に集中できる環境を構築
      - **スケーラブルな対応**：大量のデータ処理や大規模な情報収集も効率よく実行可能
    
      ■ システム概要（技術情報）
      - **フロントエンド**：React / Next.js（直感的なUIでスクリプト管理を簡易化）
      - **バックエンド**：Node.js + TypeScript（安全でスケーラブルなデータ処理）
      - **業務自動化**：Pythonスクリプト / API連携（定型作業の省力化とデータ処理の最適化）
    
      ■ 導入事例
      1️⃣ 「ECサイトの商品情報を定期的に自動取得し、在庫管理を効率化」  
      2️⃣ 「複数のWebシステムへの日報転記作業を自動化し、業務負担を軽減」  
      3️⃣ 「顧客登録フォーム入力をスクリプト化し、入力作業をスムーズに」 
    
      **📢 まずは無料相談から！**  
      業務に最適なブラウザ自動化ソリューションを提案し、DXの推進を支援します。
      `,
      image: "/services-img/dx/dx-image29.jpeg",
    },
    {
      title: "メール・コミュニケーションの自動化",
      subtitle:
        "メールやチャットツールの自動化で、問い合わせ対応を効率化。定型メッセージの送信、通知の自動管理を通じて業務負担を軽減し、対応スピードを向上させます。",
      desc: `
      ■ サービス概要
      - カスタマーサポート向けの定型返信を自動化し、初期対応を迅速化
      - チャットツールやメール通知を一元管理し、担当者の対応ミスや遅延を防止
      - AIチャットボットを活用し、24時間対応の顧客サポートを実現
    
      ■ 導入メリット
      - **顧客満足度の向上**：迅速な自動返信と適切な情報提供で、問い合わせ対応品質を向上
      - **業務負担の軽減**：自動化により、サポート担当者の業務負担を大幅削減
      - **対応スピードの向上**：重要な問い合わせにリソースを集中し、業務効率化を実現
      - **履歴管理と分析**：過去の問い合わせデータを可視化し、改善や予測に活用
    
      ■ システム概要（技術情報）
      - **フロントエンド**：React / Next.js（問い合わせ管理システムのUIを構築）
      - **バックエンド**：Node.js + TypeScript（安定したメール送信APIと自動化処理）
      - **コミュニケーション自動化**：Gmail API / Outlook API（メールの送受信をプログラムで制御）
      - **チャットツール連携**：Slack API / Microsoft Teams API（自動通知・メッセージ送信）
      - **AI & 自動応答**：Chatbot（NLP技術を活用した問い合わせ対応の最適化）
    
      ■ 導入事例
      1️⃣ 「メール問い合わせを管理システムに自動取り込みし、担当者への通知を最適化」  
      2️⃣ 「定型文の自動返信を導入し、問い合わせ対応を効率化」  
      3️⃣ 「チャットボットを活用し、よくある質問の対応を自動化」  
    
      **📢 まずは無料相談から！**  
      メール・チャットの業務自動化で、カスタマー対応の効率化とDX推進を支援します。
      `,
      image: "/services-img/dx/dx-image17.jpeg",
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

  const accordionItemsPaperless = [
    {
      title: "書類管理のデジタル化",
      subtitle:
        "書類の電子化とクラウド管理で、検索・分類・共有を効率化。アクセス管理やデータのバックアップ機能を備え、ペーパーレス化を促進します。",
      desc: `
      ■ サービス概要
      - 紙の書類やPDFをスキャン・デジタル化し、クラウドで一元管理
      - **OCR技術** を活用し、書類内容をデータ化・検索可能に
      - **タグ付け・メタデータ管理** で、必要な書類をすぐに見つけられる環境を構築
      - アクセス制御やバージョン管理を実装し、安全な情報共有を実現
    
      ■ 導入メリット
      - **業務効率化**：検索・分類の自動化により、書類管理の手間を削減
      - **コスト削減**：印刷・保管スペースのコストを削減し、ペーパーレス化を推進
      - **情報の安全性向上**：アクセス管理・ログ追跡機能により、情報漏えいを防止
      - **リモート対応**：どこからでもセキュアにアクセスでき、働き方改革を支援
    
      ■ システム概要（技術情報）
      - **フロントエンド**：React / Next.js（直感的なUIで簡単に書類を管理）
      - **バックエンド**：Node.js + TypeScript（安全で拡張性の高いデータ処理）
      - **クラウドストレージ**：AWS S3 / Firebase Storage（大容量の書類データを管理）
      - **OCR & 自動分類**：AI-OCR（書類のテキスト抽出・データ検索を可能に）
    
      ■ 導入事例
      1️⃣ 「社内契約書をデジタル化し、検索作業をスムーズに」  
      2️⃣ 「電子文書のアクセス管理を強化し、部門間の情報共有を最適化」  
      3️⃣ 「書類のバックアップを導入し、データロスのリスクを軽減」  
    
      **📢 まずは無料相談から！**  
      書類管理のデジタル化で、効率的な業務フローを実現し、DX推進をサポートします。
      `,
      image: "/services-img/dx/dx-image3.jpeg",
    },
    {
      title: "電子契約サービス",
      subtitle:
        "契約の電子化で、署名・承認プロセスをオンライン化。コスト削減・業務効率化・法的安全性を確保し、スムーズな契約フローを実現します。",
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
      image: "/services-img/dx/cloud2.jpeg",
    },
    {
      title: "デジタル書類の共有",
      subtitle:
        "チームや部門間の情報共有をスムーズに。クラウドを活用したデジタル書類管理で、安全・迅速なファイル共有を実現します。",
      desc: `
      ■ サービス概要
      - **オンラインで書類を一元管理** し、どこからでもアクセス可能に
      - **フォルダ構成・アクセス権限の設定** により、適切なセキュリティ管理を実現
      - **バージョン管理機能** を搭載し、変更履歴や承認フローを可視化
      - **マルチデバイス対応** で、PC・スマホ・タブレットからの操作が可能
    
      ■ 導入メリット
      - **書類管理の効率化**：ファイルの検索・分類が容易になり、業務の生産性を向上
      - **セキュリティ強化**：アクセス制御・ログ管理により、情報の不正閲覧を防止
      - **リモートワーク対応**：社内外のチームがリアルタイムで文書を確認・編集
      - **情報共有の最適化**：ドキュメントの一元管理で、重複や紛失リスクを削減
    
      ■ システム概要（技術情報）
      - **フロントエンド**：React / Next.js（直感的なUIとスムーズな操作性）
      - **バックエンド**：Node.js + TypeScript（安全かつスケーラブルなAPI構築）
      - **クラウドストレージ**：AWS S3 / Firebase Storage（高い可用性とセキュリティを確保）
      - **ファイル共有・アクセス管理**：ユーザー権限設定・ログ管理で、適切なデータ保護を実現
      - **ワークフロー管理**：Google Drive / OneDrive / Box との連携でファイルの一元管理
    
      ■ 導入事例
      1️⃣ 「全社のドキュメントをデジタル化し、ファイル管理をスムーズに」  
      2️⃣ 「クラウドストレージと連携し、書類の誤送信や紛失リスクを低減」  
      3️⃣ 「バージョン管理機能を活用し、業務ファイルの変更履歴を適切に管理」  
    
      **📢 まずは無料相談から！**  
      デジタル書類管理で、スムーズな情報共有とセキュリティ強化を実現します。
      `,
      image: "/services-img/dx/dx-image46.jpeg",
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
   * 3) JSX レンダリング（スライダー部）
   * ============================= */
  return (
    <>
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
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
            >
              <video
                className={styles.bgVideo}
                autoPlay
                muted
                loop
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
                poster={slide.poster}
              >
                <source src={slide.bgVideoWebm} type="video/webm" />
                <source src={slide.bgVideoMp4} type="video/mp4" />
              </video>

              <div className={styles.mySlider1CardContent}>
                <h2 className={styles.slideTitleDesktop}>{slide.title}</h2>
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

          <button className={styles.mySlider1Prev} onClick={handlePrev}>
            &lt;
          </button>
          <button className={styles.mySlider1Next} onClick={handleNext}>
            &gt;
          </button>
        </div>

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
              DX推進
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
              業務効率化・自動化
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
              ペーパーレス
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

export default dx;
