// components/convert-excerpt.js
import { convert } from "html-to-text";
import styles from "styles/posts.module.css";

/**
 * contentHtml または content のどちらかから抜粋テキストを生成
 * 優先順位:
 *   1. contentHtml（配列内に html が存在する場合）
 *   2. content（HTML文字列）
 *   3. どちらも無ければ「内容がありません」
 *
 * @param {string} content - microCMS リッチエディタの HTML 文字列
 * @param {Array<{fieldId: string, html: string}>} contentHtml - 繰り返しフィールド HTML 配列
 * @param {number} maxLength - 抜粋するテキストの最大文字数
 */
export default function ConvertExcerpt({ content, contentHtml, maxLength = 100 }) {
  let html = "";

  // --- ① contentHtml が配列かつ HTML がある場合を優先 ---
  if (Array.isArray(contentHtml)) {
    const htmlParts = contentHtml
      .filter((block) => block?.html && block.html.trim() !== "")
      .map((block) => block.html);

    if (htmlParts.length > 0) {
      html = htmlParts.join("");
    }
  }

  // --- ② contentHtml が空または HTML が無ければ content を使用 ---
  if (!html && typeof content === "string" && content.trim() !== "") {
    html = content;
  }

  // --- ③ 両方空なら「内容がありません」を返す ---
  if (!html || html.trim() === "") {
    return <p>内容がありません</p>;
  }

  // --- HTML → テキストに変換 ---
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
