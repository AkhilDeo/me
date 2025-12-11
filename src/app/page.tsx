import Link from "next/link";
import { Achievements } from "@/components/landing/achievements";
import { LandingAbout } from "@/components/landing/about";
import { Experience } from "@/components/landing/experience";
import { LandingHeader } from "@/components/landing/header";
import { Projects } from "@/components/landing/projects";
import { Publications } from "@/components/landing/publications";
import styles from "@/components/landing/landing.module.css";

export default function Home() {
  return (
    <div className={styles.landing}>
      <Link href="/v2" className={styles.banner}>
        ✨ Check out v2 of my personal website — a VS Code-inspired experience!
      </Link>
      <div className={styles.main}>
        <LandingHeader />
        <main>
          <LandingAbout />
          <Projects />
          <Experience />
          <Publications />
          <Achievements />
          <div className={styles.ctaRow}>
            <Link href="/v2" className={styles.ctaButton}>
              Open v2 / IDE view
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
