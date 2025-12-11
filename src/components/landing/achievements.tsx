import styles from "./landing.module.css";

export function Achievements() {
  return (
    <section className={styles.section}>
      <h2>Achievements</h2>
      <ul className={styles.list}>
        <li>Pistritto Fellowship</li>
        <li>Pava Center for Entrepreneurship Ignite Grant</li>
        <li>JHU Whiting School of Engineering Undergraduate Conference Travel Grant</li>
        <li>JHU Student Sponsorship Initiative Award</li>
        <li>Ongoing Venture Prize and Most Creative Use of Twilio at HopHacks Fall 2021</li>
      </ul>
    </section>
  );
}
