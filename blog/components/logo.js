import Link from "next/link";
import Image from "next/image";
// import styles from "styles/logo.module.css";

export default function Logo() {
  return (
    <Link href="/">
        <Image 
          src="/logo.png" // 画像のパス
          alt="yws logo"          // 代替テキスト
          width={85}             // 幅(px)
          height={40}             // 高さ(px)
        />
    </Link>
  );
}
