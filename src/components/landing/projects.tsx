import styles from "./landing.module.css";

type ProjectItem = {
  title: string;
  organization: string;
  advisor?: string;
  date: string;
  details: string[];
};

export function Projects() {
  const projects: ProjectItem[] = [
    {
      title: "Transparent Reasoning with Large Language Models",
      organization: "Johns Hopkins Center for Language and Speech Processing",
      advisor: "Benjamin Van Durme",
      date: "October 2024 – Present",
      details: [
        "Researched social natural language inference (NLI) to improve how LLMs interpret elements like sarcasm, humor and irony.",
        "Created SocialNLI, the first dialogue-centric social-inference dataset, comprising 243 Friends TV transcripts, 5.3K generated inferences, and a 1.4K human-annotated eval split - grounding theory-of-mind reasoning in sarcasm and irony.",
        "Developed efficient counterfactual-reasoning pipeline to assign calibrated plausibility scores to social inferences, surfacing latent LLM failure modes in social reasoning, using PyTorch, vLLM, Huggingface, and Langchain.",
        "Constructed taxonomy of language model failure modes on dialogue-centric data, with Python and LangChain.",
        "Leveraging process and rubric-based rewards to enhance reasoning processes in LLMs using supervised finetuning and reinforcement learning.",
      ],
    },
    {
      title: "Nuss Bar",
      organization: "Johns Hopkins Laboratory for Computational Sensing and Robotics",
      date: "February 2024 - July 2024",
      details: [
        "Creating desktop planning and visualization app to aid clinicians in shaping bar for Nuss Procedure, used to correct Pectus Excavatum",
        "Conceiving user study comparing efficacy of Nuss bar prototypes shown in augmented reality vs. 3D printed bars",
      ],
      advisor: "Peter Kazanzides",
    },
    {
      title: "SurgiSimulate",
      organization: "Johns Hopkins Laboratory for Computational Sensing and Robotics",
      date: "February 2022 - July 2023",
      details: [
        "Constructed a mobile application using Swift and Objective C to control a da Vinci Research Kit (dVRK)",
        "Leveraged ARKit to capture transformation of mobile devices and ROS and Python for robot control",
        "Designed and ran a user study with 16 participants to compare performance of mobile app with existing input devices",
        "Presented research at the Hamlyn Symposium on Medical Robotics",
      ],
      advisor: "Dr. Peter Kazanzides",
    },
  ];

  return (
    <section className={styles.section}>
      <h2>Projects</h2>
      {projects.map((project) => (
        <div className={styles.project} key={project.title}>
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
            {project.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
