# Lessons

## 2026-04-10
- Correction received: Publication author order alone was not enough to communicate contribution clearly; the site should highlight Akhil's name rather than implying first authorship across all papers.
- Root cause: Publication display treated authors as an opaque string, which made the UI unable to express author identity cleanly without changing citation text manually.
- New preventive rule: When rendering multi-author publications on this site, store authors as structured data so author-specific emphasis can be applied without string parsing or misleading contribution signals.
- Where applied: Publications data and rendering in the homepage publications section.
