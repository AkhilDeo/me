# Lessons

## 2026-07-03
- Date: 2026-07-03
- Correction received: Static conversion must preserve the previous visual style exactly, and production must not be deployed unless explicitly requested.
- Root cause: The first static rewrite treated "simpler" as permission to redesign and deployed directly to the real domain during validation.
- New preventive rule: For this site, take before screenshots from the current production site, preserve visual styling exactly, compare local after-screenshots before PR updates, and never deploy production unless the user explicitly asks for deployment.
- Where applied: Static HTML/CSS rewrite now mirrors the prior layout/style and README documents the no-production-deploy rule.

## 2026-07-03
- Date: 2026-07-03
- Correction received: The website was too complicated for a small personal portfolio and should be HTML/CSS only.
- Root cause: The repo carried framework, build, styling, and deployment complexity from an older interactive concept that no longer matched the site's actual needs.
- New preventive rule: For this personal site, default to static HTML/CSS and avoid adding JavaScript, frameworks, build steps, env vars, or app-like interactions unless the user explicitly asks for them.
- Where applied: Replaced the Next/React source with `index.html`, `styles.css`, root static assets, and static Vercel configuration.

## 2026-04-10
- Correction received: Publication author order alone was not enough to communicate contribution clearly; the site should highlight Akhil's name rather than implying first authorship across all papers.
- Root cause: Publication display treated authors as an opaque string, which made the UI unable to express author identity cleanly without changing citation text manually.
- New preventive rule: When rendering multi-author publications on this site, store authors as structured data so author-specific emphasis can be applied without string parsing or misleading contribution signals.
- Where applied: Publications data and rendering in the homepage publications section.
