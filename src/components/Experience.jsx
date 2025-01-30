import React from "react";

function Experience() {
  const experiences = [
    {
      title: "Technical Advisor Intern - GenAI",
      organization: "Scale AI",
      date: "Novemeber 2024 - Present",
      details: [
        "Solving Olympiad-level competitive programming (CP) problems to support training a code-reasoning LLM.",
        "Crafting specialized prompts enabling LLMs to solve CP problems only ∼10% of competitive programmers can solve.",
      ],
    },
    {
      title: "Software Development Engineering Intern",
      organization: "Amazon",
      date: "May 2024 - August 2024",
      details: [
        "Devised and developed multi-agent Small Language Model (SLM) frameworks using Amazon Nova and Anthropic Claude, achieving a ∼220% increase over baseline on the TravelPlanner dataset, which evaluates language agents’ planning abilities.",
        "Implemented data pipeline for low-latency, asynchronous problem execution, which was used for quickly evaluating agents.",
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
    // Add other work experiences similarly
  ];

  return (
    <div id="experience">
      <h2>Work Experience</h2>
      {experiences.map((experience, index) => (
        <div className="experience" key={index}>
          <h3>{experience.title}</h3>
          <div className="experience-info">
            <p>
              <i>{experience.organization}</i>
            </p>
            <p>{experience.date}</p>
          </div>
          <ul>
            {experience.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Experience;
