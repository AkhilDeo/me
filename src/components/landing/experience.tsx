import styles from "./landing.module.css";

type ExperienceItem = {
  title: string;
  organization: string;
  date: string;
  details: string[];
};

export function Experience() {
  const experiences: ExperienceItem[] = [
    {
      title: "Software Development Engineering Intern",
      organization: "Amazon Web Services",
      date: "May 2025 - August 2025",
      details: [
        "Designed and built a recording system capturing user interactions in browser and automatically generates reproducible workflow, improving automation accuracy by 20% and eliminating manual workflow design, using TypeScript and Python.",
      ],
    },
    {
      title: "Technical Advisor Intern - GenAI",
      organization: "Scale AI",
      date: "November 2024 - February 2025",
      details: [
        "Solving Olympiad-level competitive programming (CP) problems to support training a code-reasoning LLM.",
        "Crafting specialized prompts enabling LLMs to solve CP problems only ∼10% of competitive programmers can solve.",
      ],
    },
    {
      title: "Software Development Engineering Intern",
      organization: "Amazon AGI",
      date: "May 2024 - August 2024",
      details: [
        "Devised and developed multi-agent Small Language Model (SLM) frameworks using Amazon Nova and Anthropic Claude, achieving a ∼220% increase over baseline on the TravelPlanner dataset, which evaluates language agents’ planning abilities.",
        "Implemented an evaluation pipeline for multi-agent experiments with RxJava and Python, speeding up evaluations by 400%",
      ],
    },
    {
      title: "Founding Engineer",
      organization: "Quantable.io",
      date: "December 2023 - July 2024",
      details: [
        "Constructed the site’s PostgreSQL database schemas and created efficient APIs in Node.js, a custom LaTeX rendering library, admin tools, and production-ready RBAC system, to serve 1,200+ quant finance problems for 2,500+ users.",
      ],
    },
    {
      title: "Software Engineering Intern",
      organization: "PayPal",
      date: "May 2023 - August 2023",
      details: [
        "Redesigned monetary transactions API with an eventually consistent data strategy, caching transactions in a local database to eliminate multiple mid-tier API calls for estimate tens of thousands daily Buy Now Pay Later transactions.",
        "Improved API performance, reducing latency by ∼100ms per API call, leveraging Java, Spring Boot, and SQL.",
      ],
    },
  ];

  return (
    <section className={styles.section}>
      <h2>Work Experience</h2>
      <div className={styles.timeline}>
        {experiences.map((experience) => (
          <div
            className={styles.timelineItem}
            key={`${experience.title}-${experience.organization}`}
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
                {experience.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
