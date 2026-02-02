import { achievements } from "@/lib/data";
import styles from "./landing.module.css";

export function Achievements() {
  return (
    <section className={styles.section}>
      <h2>Achievements</h2>
      <ul className={styles.list}>
        {achievements.map((achievement, index) => (
          <li key={`${achievement}-${index}`}>{achievement}</li>
        ))}
      </ul>
    </section>
  );
}
