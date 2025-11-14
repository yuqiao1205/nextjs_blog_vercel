import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Lauren's Technology Blog</h1>
        <p className={styles.description}>
          Dive into the world of technology with us — from the latest trends in
          AI to in-depth tutorials on web development, we cover it all. Whether
          you&apos;re a seasoned developer or just starting out, our blog is
          your go-to destination for insightful articles, practical tips, and
          step-by-step guides. Join us on this exciting journey as we explore
          the ever-evolving landscape of technology together!
        </p>

        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>

        <div className={styles.brand}>
          <Image src="/brands.png" alt="Tech Blog" unoptimized width={350} height={100} />
        </div>
      </div>

      {/* Right-side hero image */}
      <div className={styles.imageContainer}>
        <Image
          className={styles.heroImage}
          src="/hero.gif"
          alt="Hero image"
          unoptimized
          fill
        />
      </div>
    </main>
  );
}
