import React from "react";

function Experience() {
  const experiences = [
    {
      title: "Software Development Engineering Intern",
      organization: "Amazon",
      date: "May 2024 - August 2024",
      details: [
        "Researched & built multi-agent AI frameworks to enhance large language models’ performance on advanced reasoning and planning tasks",
        "Developed Java-based testing framework for low-latency, asynchronous problem execution utilizing distributed systems"
      ],
    },
    {
      title: "Software Engineering Intern",
      organization: "PayPal",
      date: "May 2023 - August 2023",
      details: [
        "Built enhanced monetary transactions API for PayPal's Buy Now Pay Later products using Java, Spring Boot, and SQL",
        "Wrote functional tests and unit tests with TestNG and Mockito",
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
