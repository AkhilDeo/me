import Image from "next/image";
import Link from "next/link";
import styles from "./landing.module.css";

export function LandingHeader() {
  return (
    <header className={styles.header}>
      <h1>Akhil Deo</h1>
      <Image src="/profile.png" alt="Akhil Deo" width={140} height={140} className={styles.headerImage} />
      <p>Email: adeo1[at]jhu[dot]edu</p>
      <div className={styles.headerLinks}>
        <Link href="https://www.github.com/akhildeo" target="_blank" rel="noopener noreferrer">
          GitHub
        </Link>
        <Link href="https://www.linkedin.com/in/akhildeo" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Link>
        <Link href="https://x.com/akhil_deo1" target="_blank" rel="noopener noreferrer">
          X
        </Link>
      </div>
    </header>
  );
}
