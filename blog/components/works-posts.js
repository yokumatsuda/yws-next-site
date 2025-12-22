// components/works-posts.js
import styles from "styles/works.module.css";
import Link from "next/link";
import Image from "next/image";
import ConvertDate from "components/convert-date";
import ConvertExcerpt from "components/convert-excerpt";

export default function WorksPosts({ works }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.worksTitle}>Works</h2>
      <div className={styles.gridContainer}>
        {works.map(({ title, slug, eyecatch, publishDate, content, contentHtml }, index) => (
          <article className={styles.work} key={slug}>
            <Link href={`/works/${slug}`}>
              <figure>
                <Image
                  src={eyecatch.url}
                  alt={title}
                  style={{ width: "100%", height: "100%" }}
                  width={eyecatch.width}
                  height={eyecatch.height}
                  sizes="(min-width: 1152px) 576px, 50vw"
                  priority={index === 0}
                />
              </figure>
              <p className={styles.publishDate}>
                {publishDate && <ConvertDate dateISO={publishDate} />}
              </p>
              <h2>{title}</h2>
              <ConvertExcerpt content={content} contentHtml={contentHtml} maxLength={40} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
