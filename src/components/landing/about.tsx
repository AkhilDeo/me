import styles from "./landing.module.css";

export function LandingAbout() {
  return (
    <section className={styles.section}>
      <h2>About Me</h2>
      <p>
        I am currently a student researcher at the Johns Hopkins Center for Language and Speech Processing working on LM reasoning, as well as a computer science student at Johns Hopkins University with a focus on Natural Language Processing, Artificial Intelligence, and Machine Learning.
      </p>
    </section>
  );
}
