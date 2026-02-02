import { personalInfo } from "@/lib/data";
import styles from "./landing.module.css";

export function LandingAbout() {
  return (
    <section className={styles.section}>
      <h2>About Me</h2>
      <p>{personalInfo.bio}</p>
    </section>
  );
}
