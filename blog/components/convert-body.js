// components/convert-body.js

import parse from "html-react-parser";
import Image from "next/image";

export default function ConvertBody({ content, contentHtml }) {
  let html = "";

  // --- リッチテキスト優先 ---
  if (content?.raw) {
    html = content.raw;
  }
  // --- 繰り返し HTML フィールド ---
  else if (Array.isArray(contentHtml)) {
    contentHtml.forEach((block) => {
      if (!block) return;
      if (block.fieldId === "html") {
        html += block.html ?? "";
      }
    });
  }
  // --- string の場合（旧 HTML フィールド） ---
  else if (typeof content === "string" && content.trim() !== "") {
    html = content;
  }

  if (!html) return <p>内容がありません</p>;

  // --- HTML → React 要素に変換 ---
  const contentReact = parse(html, {
    replace: (node) => {
      if (node.name === "img") {
        const { src, alt, width, height } = node.attribs;
        return (
          <Image
            style={{ width: "100%", height: "auto" }}
            src={src}
            width={width || 800}
            height={height || 600}
            alt={alt || ""}
            sizes="(min-width: 768px) 768px, 100vw"
          />
        );
      }
    },
  });

  return <>{contentReact}</>;
}
