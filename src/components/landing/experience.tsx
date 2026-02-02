import { experiences } from "@/lib/data";
import styles from "./landing.module.css";

export function Experience() {
  return (
    <section className={styles.section}>
      <h2>Work Experience</h2>
      <div className={styles.timeline}>
        {experiences.map((experience) => (
          <div
            className={styles.timelineItem}
            key={experience.id}
          >
            <div className={styles.timelineMarker} aria-hidden="true" />
            <div className={styles.experienceCard}>
              <h3>{experience.title}</h3>
              <div className={styles.infoRow}>
                <p>
                  <i>{experience.organization}</i>
                </p>
                <p>{experience.date}</p>
              </div>
              <ul className={styles.list}>
                {experience.details.map((detail, index) => (
                  <li key={`${experience.id}-${index}`}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
