import React, { useState } from "react";

function Publication({ authors, title, details, tags, bibtex, url, type }) {
  const [showBibtex, setShowBibtex] = useState(false);

  return (
    <div className="publication">
      <p className="publication-title">
        {url ? (
          <a href={url} target="_">
            {title}
          </a>
        ) : (
          <span>{title}</span>
        )}
        <span className="publication-tag">{type || "Proceedings Article"}</span>
      </p>
      <p className="publication-authors">{authors}</p>
      <p className="publication-details">{details}</p>
      <a
        href="#"
        className="bibtex-toggle"
        onClick={(e) => {
          e.preventDefault();
          setShowBibtex(!showBibtex);
        }}
      >
        BibTeX
      </a>
      {showBibtex && (
        <div className="bibtex-content">
          <pre>{bibtex}</pre>
        </div>
      )}
    </div>
  );
}

function Publications() {
  const publications = [
    {
      authors: "Deo, Akhil; Sanders, Kate; Van Durme, Benjamin",
      title: "SocialNLI: A Dialogue-Centric Social Inference Dataset",
      details: "In: arXiv, 2025.",
      type: "Preprint",
      bibtex: `@misc{deo2025socialnlidialoguecentricsocialinference,
      title={SocialNLI: A Dialogue-Centric Social Inference Dataset}, 
      author={Akhil Deo and Kate Sanders and Benjamin Van Durme},
      year={2025},
      eprint={2510.05458},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2510.05458}, 
}`,
      url: "https://arxiv.org/abs/2510.05458",
    },
    {
      authors: "Deo, Akhil",
      title:
        "QAagent: A Multiagent System for Unit Test Generation via Natural Language Pseudocode (Student Abstract)",
      details:
        "In: Proceedings of the AAAI Conference on Artificial Intelligence, 2025.",
      type: "Proceedings Article",
      bibtex: `@article{Deo_2025, 
        title={QAagent: A Multiagent System for Unit Test Generation via Natural Language Pseudocode (Student Abstract)}, 
        volume={39}, 
        url={https://ojs.aaai.org/index.php/AAAI/article/view/35246},
        DOI={10.1609/aaai.v39i28.35246},
        number={28}, 
        journal={Proceedings of the AAAI Conference on Artificial Intelligence},
        author={Deo, Akhil},
        year={2025}, month={Apr.}, 
        pages={29345-29347} 
      }`,
      url: "https://doi.org/10.1609/aaai.v39i28.35246"
    },
    {
      authors: "Deo, Akhil; Kazanzides, Peter",
      title: "Feasibility of Mobile Application for Surgical Robot Teleoperation",
      details: "In: Hamlyn Symposium on Medical Robotics, pp. 121-122, 2023.",
      type: "Proceedings Article",
      bibtex: `@inproceedings{Deo2023,
        series = {HSMR2023},
        title = {Feasibility of Mobile Application for Surgical Robot Teleoperation},
        url = {http://dx.doi.org/10.31256/HSMR2023.63},
        DOI = {10.31256/hsmr2023.63},
        booktitle = {Proceedings of The 15th Hamlyn Symposium on Medical Robotics 2023},
        publisher = {The Hamlyn Centre,  Imperial College London London,  UK},
        author = {Deo,  Akhil and Kazanzides,  Peter},
        year = {2023},
        month = jun,
        collection = {HSMR2023}
      }`,
      url: "http://doi.org/10.31256/HSMR2023.63",
    },
  ];

  return (
    <section id="publications">
      <h2>Publications</h2>
      {publications.map((pub, index) => (
        <Publication key={index} {...pub} />
      ))}
    </section>
  );
}

export default Publications;