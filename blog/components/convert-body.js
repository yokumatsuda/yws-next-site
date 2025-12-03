// components/convert-body.js
import parse from "html-react-parser";
import Image from "next/image";

export default function ConvertBody({ content, contentHtml }) {
  let html = "";

  // --- ① contentHtml（繰り返しフィールド or HTMLフィールド）がある場合 ---
  if (Array.isArray(contentHtml) && contentHtml.length > 0) {
    contentHtml.forEach((block) => {
      if (block?.fieldId === "html" && block.html) {
        html += block.html;
      }
    });
  }
  // --- ② contentHtml が無く content が文字列なら ---
  else if (typeof content === "string" && content.trim() !== "") {
    html = content;
  }

  // --- ③ どちらも無い場合 ---
  if (!html || html.trim() === "") {
    return <p>内容がありません</p>;
  }

  // --- HTML → React 変換 ---
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
