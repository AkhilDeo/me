import { achievements, experiences, personalInfo, projects, publications } from '@/lib/data'
import styles from './basic.module.css'

export default function Home() {
  return (
    <div className={styles.app}>
      <header className={styles.header} id="header">
        <h1>{personalInfo.name}</h1>
        <img
          className={styles.photo}
          src={personalInfo.avatar}
          alt={personalInfo.name}
          width={140}
          height={140}
        />
        <p>Email: {personalInfo.email}</p>
        <p>
          <a href={personalInfo.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
        <p>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </p>
        {personalInfo.twitter ? (
          <p>
            <a href={personalInfo.twitter} target="_blank" rel="noreferrer">
              X
            </a>
          </p>
        ) : null}
      </header>

      <main className={styles.main}>
        <section className={styles.section} id="about">
          <h2>About Me</h2>
          <p>{personalInfo.bio}</p>
        </section>

        <section className={styles.section} id="publications">
          <h2>Publications</h2>
          {publications.map((publication) => (
            <div className={styles.publication} key={publication.id}>
              <p className={styles.publicationTitle}>
                {publication.url ? (
                  <a href={publication.url} target="_blank" rel="noreferrer">
                    {publication.title}
                  </a>
                ) : (
                  publication.title
                )}
                <span className={styles.publicationTag}>{publication.type}</span>
              </p>
              <p className={styles.publicationAuthors}>{publication.authors}</p>
              <p className={styles.publicationDetails}>{publication.details}</p>
              <details className={styles.bibtexDetails}>
                <summary className={styles.bibtexToggle}>BibTeX</summary>
                <div className={styles.bibtexContent}>
                  <pre>{publication.bibtex}</pre>
                </div>
              </details>
            </div>
          ))}
        </section>

        <section className={styles.section} id="projects">
          <h2>Projects</h2>
          {projects.map((project) => (
            <div className={styles.project} key={project.id}>
              <h3>
                {project.title}
                {project.advisor ? (
                  <span className={styles.advisor}> (Advisor: {project.advisor})</span>
                ) : null}
              </h3>
              <div className={styles.projectInfo}>
                <p>
                  <i>{project.organization}</i>
                </p>
                <p>{project.date}</p>
              </div>
              <ul>
                {project.details.map((detail, index) => (
                  <li key={`${project.id}-${index}`}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className={styles.section} id="experience">
          <h2>Work Experience</h2>
          {experiences.map((experience) => (
            <div className={styles.experience} key={experience.id}>
              <h3>{experience.title}</h3>
              <div className={styles.experienceInfo}>
                <p>
                  <i>{experience.organization}</i>
                </p>
                <p>{experience.date}</p>
              </div>
              <ul>
                {experience.details.map((detail, index) => (
                  <li key={`${experience.id}-${index}`}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className={styles.section} id="achievements">
          <h2>Achievements</h2>
          <ul>
            {achievements.map((achievement, index) => (
              <li key={`${achievement}-${index}`}>{achievement}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
