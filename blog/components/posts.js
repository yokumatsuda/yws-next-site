// posts.js

import styles from "styles/posts.module.css";
import Link from "next/link";
import Image from "next/image";
import ConvertDate from "components/convert-date";
import ConvertExcerpt from "components/convert-excerpt";

export default function Posts({ posts }) {
  return (
    <section> <h2 className={styles.postsTitle}>News</h2>
    <div className={styles.gridContainer}>
      {posts.map(({ title, slug, eyecatch, publishDate, content, contentHtml }, index) => (
        
        <article className={styles.post} key={slug}>
          <Link href={`/blog/${slug}`}>
            <figure>
              <Image
                src={eyecatch.url}
                alt=""
                style={{ width: "100%", height: "100%" }}
                width={eyecatch.width}
                height={eyecatch.height}
                sizes="(min-width: 1152px) 576px, 50vw"
                priority={index === 0} // 先頭記事だけ
                // placeholder="blur"
                // blurDataURL={eyecatch.blurDataURL}
              />
            </figure>
           <p className={styles.publishDate}>{publishDate && <ConvertDate dateISO={publishDate} />}</p>
            <h2>{title}</h2>
           <ConvertExcerpt content={content} contentHtml={contentHtml} maxLength={40} />
          </Link>
        </article>
      ))}
    </div>
    </section>
  );
}
