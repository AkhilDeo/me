// Portfolio data - migrated from original site

export const personalInfo = {
    name: "Akhil Deo",
    email: "adeo1[at]jhu[dot]edu",
    github: "https://www.github.com/akhildeo",
    linkedin: "https://www.linkedin.com/in/akhildeo",
    twitter: "https://x.com/akhil_deo1",
    avatar: "/profile.png",
    bio: `I am currently a student researcher at the Johns Hopkins Center for Language and Speech Processing working on LM reasoning, as well as a computer science student at Johns Hopkins University with a focus on Natural Language Processing, Artificial Intelligence, and Machine Learning.`,
};

export const projects = [
    {
        id: "transparent-reasoning",
        title: "Transparent Reasoning with Large Language Models",
        organization: "Johns Hopkins Center for Language and Speech Processing",
        advisor: "Benjamin Van Durme",
        date: "October 2024 – Present",
        details: [
            "Researched social natural language inference (NLI) to improve how LLMs interpret elements like sarcasm, humor and irony.",
            "Created SocialNLI, the first dialogue-centric social-inference dataset, comprising 243 Friends TV transcripts, 5.3K generated inferences, and a 1.4K human-annotated eval split.",
            "Developed efficient counterfactual-reasoning pipeline to assign calibrated plausibility scores to social inferences using PyTorch, vLLM, Huggingface, and Langchain.",
            "Constructed taxonomy of language model failure modes on dialogue-centric data.",
            "Leveraging process and rubric-based rewards to enhance reasoning processes in LLMs using reinforcement learning.",
        ],
        tags: ["NLP", "LLMs", "PyTorch", "vLLM", "Langchain"],
    },
    {
        id: "nuss-bar",
        title: "Nuss Bar",
        organization: "Johns Hopkins Laboratory for Computational Sensing and Robotics",
        advisor: "Peter Kazanzides",
        date: "February 2024 - July 2024",
        details: [
            "Creating desktop planning and visualization app to aid clinicians in shaping bar for Nuss Procedure, used to correct Pectus Excavatum",
            "Conceiving user study comparing efficacy of Nuss bar prototypes shown in augmented reality vs. 3D printed bars",
        ],
        tags: ["Medical Robotics", "AR", "3D Visualization"],
    },
    {
        id: "surgisimulate",
        title: "SurgiSimulate",
        organization: "Johns Hopkins Laboratory for Computational Sensing and Robotics",
        advisor: "Peter Kazanzides",
        date: "February 2022 - July 2023",
        details: [
            "Constructed a mobile application using Swift and Objective C to control a da Vinci Research Kit (dVRK)",
            "Leveraged ARKit to capture transformation of mobile devices and ROS and Python for robot control",
            "Designed and ran a user study with 16 participants to compare performance of mobile app with existing input devices",
            "Presented research at the Hamlyn Symposium on Medical Robotics",
        ],
        tags: ["Swift", "ARKit", "ROS", "Python", "Medical Robotics"],
    },
];

export const experiences = [
    {
        id: "aws-2025",
        title: "Software Development Engineering Intern",
        organization: "Amazon Web Services",
        date: "May 2025 - August 2025",
        details: [
            "Designed and built a recording system capturing user interactions in browser and automatically generates reproducible workflow, improving automation accuracy by 20% and eliminating manual workflow design, using TypeScript and Python.",
        ],
        tags: ["TypeScript", "Python", "Automation"],
    },
    {
        id: "scale-ai",
        title: "Technical Advisor Intern - GenAI",
        organization: "Scale AI",
        date: "November 2024 - February 2025",
        details: [
            "Solving Olympiad-level competitive programming (CP) problems to support training a code-reasoning LLM.",
            "Crafting specialized prompts enabling LLMs to solve CP problems only ~10% of competitive programmers can solve.",
        ],
        tags: ["GenAI", "Competitive Programming", "LLMs"],
    },
    {
        id: "amazon-agi",
        title: "Software Development Engineering Intern",
        organization: "Amazon AGI",
        date: "May 2024 - August 2024",
        details: [
            "Devised and developed multi-agent Small Language Model (SLM) frameworks using Amazon Nova and Anthropic Claude, achieving a ~220% increase over baseline on the TravelPlanner dataset.",
            "Implemented an evaluation pipeline for multi-agent experiments with RxJava and Python, speeding up evaluations by 400%",
        ],
        tags: ["Multi-Agent", "SLMs", "RxJava", "Python"],
    },
    {
        id: "quantable",
        title: "Founding Engineer",
        organization: "Quantable.io",
        date: "December 2023 - July 2024",
        details: [
            "Constructed the site's PostgreSQL database schemas and created efficient APIs in Node.js, a custom LaTeX rendering library, admin tools, and production-ready RBAC system, to serve 1,200+ quant finance problems for 2,500+ users.",
        ],
        tags: ["PostgreSQL", "Node.js", "Full-Stack"],
    },
    {
        id: "paypal",
        title: "Software Engineering Intern",
        organization: "PayPal",
        date: "May 2023 - August 2023",
        details: [
            "Redesigned monetary transactions API with an eventually consistent data strategy, caching transactions in a local database to eliminate multiple mid-tier API calls for estimate tens of thousands daily Buy Now Pay Later transactions.",
            "Improved API performance, reducing latency by ~100ms per API call, leveraging Java, Spring Boot, and SQL.",
        ],
        tags: ["Java", "Spring Boot", "SQL", "APIs"],
    },
];

export const publications = [
    {
        id: "socialnli",
        authors: "Deo, Akhil; Sanders, Kate; Van Durme, Benjamin",
        title: "SocialNLI: A Dialogue-Centric Social Inference Dataset",
        details: "In: arXiv, 2025.",
        type: "Preprint",
        url: "https://arxiv.org/abs/2510.05458",
        bibtex: `@misc{deo2025socialnlidialoguecentricsocialinference,
      title={SocialNLI: A Dialogue-Centric Social Inference Dataset}, 
      author={Akhil Deo and Kate Sanders and Benjamin Van Durme},
      year={2025},
      eprint={2510.05458},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2510.05458}, 
}`,
    },
    {
        id: "qaagent",
        authors: "Deo, Akhil",
        title: "QAagent: A Multiagent System for Unit Test Generation via Natural Language Pseudocode (Student Abstract)",
        details: "In: Proceedings of the AAAI Conference on Artificial Intelligence, 2025.",
        type: "Proceedings Article",
        url: "https://doi.org/10.1609/aaai.v39i28.35246",
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
    },
    {
        id: "surgisimulate-paper",
        authors: "Deo, Akhil; Kazanzides, Peter",
        title: "Feasibility of Mobile Application for Surgical Robot Teleoperation",
        details: "In: Hamlyn Symposium on Medical Robotics, pp. 121-122, 2023.",
        type: "Proceedings Article",
        url: "http://doi.org/10.31256/HSMR2023.63",
        bibtex: `@inproceedings{Deo2023,
      series = {HSMR2023},
      title = {Feasibility of Mobile Application for Surgical Robot Teleoperation},
      url = {http://dx.doi.org/10.31256/HSMR2023.63},
      DOI = {10.31256/hsmr2023.63},
      booktitle = {Proceedings of The 15th Hamlyn Symposium on Medical Robotics 2023},
      publisher = {The Hamlyn Centre, Imperial College London London, UK},
      author = {Deo, Akhil and Kazanzides, Peter},
      year = {2023},
      month = jun,
      collection = {HSMR2023}
    }`,
    },
];

export const achievements = [
    "Pistritto Fellowship",
    "Pava Center for Entrepreneurship Ignite Grant",
    "JHU Whiting School of Engineering Undergraduate Conference Travel Grant",
    "JHU Student Sponsorship Initiative Award",
    "Ongoing Venture Prize and Most Creative Use of Twilio at HopHacks Fall 2021",
];

// File tree structure for IDE sidebar
export const fileTree = [
    {
        name: "about.md",
        type: "file" as const,
        icon: "file-text",
        path: "/about",
    },
    {
        name: "projects",
        type: "folder" as const,
        icon: "folder",
        path: "/projects",
        children: projects.map((p) => ({
            name: `${p.id}.md`,
            type: "file" as const,
            icon: "file-code",
            path: `/projects/${p.id}`,
        })),
    },
    {
        name: "experience",
        type: "folder" as const,
        icon: "folder",
        path: "/experience",
        children: experiences.map((e) => ({
            name: `${e.id}.md`,
            type: "file" as const,
            icon: "file-text",
            path: `/experience/${e.id}`,
        })),
    },
    {
        name: "publications.md",
        type: "file" as const,
        icon: "file-text",
        path: "/publications",
    },
    {
        name: "achievements.md",
        type: "file" as const,
        icon: "trophy",
        path: "/achievements",
    },
];
