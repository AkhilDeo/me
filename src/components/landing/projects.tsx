import { projects } from "@/lib/data";
import styles from "./landing.module.css";

export function Projects() {
  return (
    <section className={styles.section}>
      <h2>Projects</h2>
      {projects.map((project) => (
        <div className={styles.project} key={project.id}>
          <h3>
            {project.title}{" "}
            {project.advisor && (
              <span style={{ fontSize: "0.85em", fontStyle: "italic", fontWeight: "normal", color: "black" }}>
                (Advisor: {project.advisor})
              </span>
            )}
          </h3>
          <div className={styles.infoRow}>
            <p>
              <i>{project.organization}</i>
            </p>
            <p>{project.date}</p>
          </div>
          <ul className={styles.list}>
            {project.details.map((detail, index) => (
              <li key={`${project.id}-${index}`}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
