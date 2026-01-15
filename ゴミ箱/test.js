import Image from "next/image";

<div className={styles.heroImage}>
  <Image
    src="/services-img/use/HeroSection_img3.jpeg"
    alt="About Us"
    fill
    priority
    sizes="(max-width: 1024px) 100vw, 50vw"
    style={{ objectFit: "cover" }} // containにしたいなら "contain"
  />
</div>;
