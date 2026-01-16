import { useRouter } from "next/router";

const router = useRouter();

<button
  className={styles.linkButton}
  onClick={() => router.push("/contact")}
>
  お問い合わせ
</button>


  <button className={styles.linkButton} onClick={() => router.push("/use")}>
                            ご利用の流れ
                          </button>