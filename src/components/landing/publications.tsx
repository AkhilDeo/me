'use client';

import Link from "next/link";
import { useState } from "react";
import { publications, type Publication } from "@/lib/data";
import styles from "./landing.module.css";

function PublicationItem({ authors, title, details, bibtex, url, type }: Publication) {
  const [showBibtex, setShowBibtex] = useState(false);

  return (
    <div className={styles.publication}>
      <p className={styles.publicationTitle}>
        {url ? (
          <Link href={url} target="_blank">
            {title}
          </Link>
        ) : (
          <span>{title}</span>
        )}
        <span className={styles.publicationTag}>{type || "Proceedings Article"}</span>
      </p>
      <p className={styles.publicationAuthors}>{authors}</p>
      <p className={styles.publicationDetails}>{details}</p>
      <a
        href="#"
        className={styles.bibtexToggle}
        onClick={(e) => {
          e.preventDefault();
          setShowBibtex(!showBibtex);
        }}
      >
        BibTeX
      </a>
      {showBibtex && (
        <div className={styles.bibtexContent}>
          <pre>{bibtex}</pre>
        </div>
      )}
    </div>
  );
}

export function Publications() {
  return (
    <section className={styles.section}>
      <h2>Publications</h2>
      {publications.map((pub) => (
        <PublicationItem key={pub.id} {...pub} />
      ))}
    </section>
  );
}
