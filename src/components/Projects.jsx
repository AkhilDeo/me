import React from "react";

function Project({ title, organization, date, details }) {
  return (
    <div className="project">
      <h3>{title}</h3>
      <div className="project-info">
        <p>
          <i>{organization}</i>
        </p>
        <p>{date}</p>
      </div>
      <ul>
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}

function Projects() {
  const projects = [
    {
      title: "Nuss Bar",
      organization:
        "Johns Hopkins Laboratory for Computational Sensing and Robotics",
      date: "February 2024 - Present",
      details: [
        "Creating desktop planning and visualization app to aid clinicians in shaping bar for Nuss Procedure, used to correct Pectus Excavatum",
        "Conceiving user study comparing efficacy of Nuss bar prototypes shown in augmented reality vs. 3D printed bars",
      ],
    },
    {
      title: "SurgiSimulate",
      organization:
        "Johns Hopkins Laboratory for Computational Sensing and Robotics",
      date: "February 2022 - July 2023",
      details: [
        "Constructed a mobile application using Swift and Objective C to control a da Vinci Research Kit (dVRK)",
        "Leveraged ARKit to capture transformation of mobile devices and ROS and Python for robot control",
        "Designed and ran a user study with 16 participants to compare performance of mobile app with existing input devices",
        "Presented research at the Hamlyn Symposium on Medical Robotics",
      ],
    },
  ];

  return (
    <section id="projects">
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <Project key={index} {...project} />
      ))}
    </section>
  );
}

export default Projects;
