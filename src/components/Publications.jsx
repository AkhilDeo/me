import React, { useState } from "react";

function Publication({ authors, title, details, tags, bibtex }) {
  const [showBibtex, setShowBibtex] = useState(false);

  return (
    <div className="publication">
      <p className="publication-title">
        <a href="http://doi.org/10.31256/HSMR2023.63" target="_">
          {title}
        </a>
        <span className="publication-tag">Proceedings Article</span>
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
      authors: "Deo, Akhil; Kazanzides, Peter",
      title:
        "Feasibility of Mobile Application for Surgical Robot Teleoperation",
      details: "In: Hamlyn Symposium on Medical Robotics, pp. 121-122, 2023.",
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
