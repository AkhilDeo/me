import Image from "next/image";
import Link from "next/link";
import { personalInfo } from "@/lib/data";
import styles from "./landing.module.css";

export function LandingHeader() {
  const links = [
    { label: "GitHub", href: personalInfo.github },
    { label: "LinkedIn", href: personalInfo.linkedin },
    { label: "X", href: personalInfo.twitter },
  ];

  return (
    <header className={styles.header}>
      <h1>{personalInfo.name}</h1>
      <Image
        src={personalInfo.avatar}
        alt={personalInfo.name}
        width={140}
        height={140}
        className={styles.headerImage}
      />
      <p>Email: {personalInfo.email}</p>
      <div className={styles.headerLinks}>
        {links.map((link) => (
          <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
