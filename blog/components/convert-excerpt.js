// components/convert-excerpt.js
import { convert } from "html-to-text";
import styles from "styles/posts.module.css";


/**
 * contentHtml または content を優先順に抜粋表示
 * @param {object|string} content - リッチテキストまたは文字列
 * @param {array} contentHtml - 繰り返しフィールド HTML 配列
 * @param {number} maxLength - 抜粋文字数
 */


export default function ConvertExcerpt({ content, contentHtml, maxLength = 100 }) {
  let html = "";

  // --- リッチテキスト優先 ---
  if (content?.raw) {
    html = content.raw;
  }
  // --- 繰り返し HTML フィールド ---
  else if (Array.isArray(contentHtml)) {
    contentHtml.forEach((block) => {
      if (!block) return;
      if (block.fieldId === "html") html += block.html ?? "";
    });
  }
  // --- string の場合 ---
  else if (typeof content === "string" && content.trim() !== "") {
    html = content;
  }

  if (!html) return <p>内容がありません</p>;

  // --- HTML をテキスト化 ---
  const text = convert(html, {
    wordwrap: false,
    selectors: [
      { selector: "img", format: "skip" },
      { selector: "a", options: { ignoreHref: true } },
    ],
  });

  // --- 抜粋 ---
  let excerpt = text.slice(0, maxLength);
  if (text.length > maxLength) excerpt += "…";

  return <p className={styles.excerpt}>{excerpt}</p>;

}
