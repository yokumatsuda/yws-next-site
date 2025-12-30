import React, { useEffect, useRef } from "react";
import styles from "./UsePageIntroSection.module.css";

const steps = [
  {
    stepNumber: 1,
    title: "お問い合わせ",
    description:
      "まずは、お問い合わせフォームまたはメール、お電話でご連絡ください。ご要望やご質問についてヒアリングいたします。",
    imageSrc:
      "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/use-img2.png",
  },
  {
    stepNumber: 2,
    title: "初回ヒアリング・ご相談",
    description:
      "お客様の課題やご希望を詳しくお伺いし、最適なソリューションをご提案するためのヒアリングを実施します。",
    imageSrc:
      "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/use-img1.png",
  },
  {
    stepNumber: 3,
    title: "ご提案・お見積もり",
    description:
      "ヒアリング内容をもとに、最適なシステム・Webサイト・業務自動化のご提案とお見積もりを提示いたします。",
    imageSrc:
      "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/use-img4.png",
  },
  {
    stepNumber: 4,
    title: "開発・ご契約",
    description: "ご提案内容にご納得いただきましたら正式に契約を締結し、開発を開始いたします。",
    imageSrc:
      "https://ywd-digital-contents.s3.ap-northeast-1.amazonaws.com/yws-wp/services/use-img3.png",
  },
];

function UsePageIntroSection() {
  // TSの useRef<HTMLDivElement>(null) を JS化：useRef(null)
  const timelineRef = useRef(null);

  // モバイル時（幅768px以下）にスクロール位置に応じて.activeクラスを付与する処理
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        const range = 100;
        const windowMiddle = window.innerHeight / 2;
        const circles = document.querySelectorAll("[data-circle]");

        circles.forEach((circle) => {
          const rect = circle.getBoundingClientRect();
          if (rect.top < windowMiddle + range && rect.bottom > windowMiddle - range) {
            circle.classList.add(styles.active);
          } else {
            circle.classList.remove(styles.active);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.flowContainer}>
      <h2 className={styles.flowTitle}>ご利用の流れ</h2>

      {/* タイムライン本体（縦の線） */}
      <div className={styles.timelineLine} ref={timelineRef}>
        <div className={styles.lineFill}></div>
      </div>

      <div className={styles.flowSteps}>
        {steps.map((step, index) => (
          <div
            key={step.stepNumber}
            className={`${styles.stepContainer} ${index % 2 === 0 ? styles.left : styles.right}`}
          >
            <div className={styles.outerCircle}>
              <div data-circle className={`${styles.innerCircle} ${styles.circle1}`}>
                {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
              </div>
            </div>

            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>

            <img src={step.imageSrc} alt={step.title} className={styles.stepIcon} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default UsePageIntroSection;
