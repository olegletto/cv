export const experienceData = {
  personalInfo: {
    name: "Oleg Labunin",
    position: "Frontend Developer",
    location: "Remote",
    email: "olegletto@gmail.com",
    linkedin: "linkedin.com/in/olegletto",
    github: "github.com/olegletto"
  },
  
  summary: `Experienced Frontend Developer with 5 years of expertise in building enterprise applications using JavaScript, TypeScript,
React and AngularJS. Proficient in the full development cycle, from architectural design to final release. Skilled in working
with microservices, DevOps tools (Docker, Jenkins, Bitbucket, Azure), and mentoring interns.`,
  
  skills: {
    frontend: [
      "React", "TypeScript", "JavaScript", "Next.js", "HTML5", "CSS3", 
      "Tailwind CSS", "Styled Components", "Material-UI", "Ant Design", "AngularJS"
    ],
    stateManagement: [
      "Redux Toolkit", "Zustand", "React Query", "SWR", "Context API", "Redux"
    ],
    buildTools: [
      "Webpack", "Vite", "ESLint", "Prettier", "Jest", "React Testing Library", "Docker", "Jenkins", "Azure DevOps"
    ],
    other: [
      "Git", "REST API", "GraphQL", "WebSocket", "PWA", "Responsive Design", "Framer Motion", "Three.js", "vSphere", "Bitbucket", "Nexus"
    ]
  },
  
  experience: [
    {
      company: "Outlier",
      position: "Frontend Expert for AI Training",
      period: "Apr 2025 - Present",
      location: "Freelance, part-time",
      description: [
        "Delivered production-ready SPAs using React, Next.js, and TypeScript, with smooth animations and 3D visuals via TailwindCSS, Framer Motion, and Three.js, and conducted code reviews for other contributors.",
        "Trained AI models by crafting high-quality prompts, reviewing, improving, and debugging AI-generated code."
      ],
      technologies: ["React", "TypeScript", "Next.js", "TailwindCSS", "Framer Motion", "Three.js"]
    },
    {
      company: "Orion Innovation",
      position: "Software Engineer Level 3",
      period: "Nov 2022 - Feb 2025",
      location: "Belgrade, Serbia",
      description: [
        "Project: Admin tool for extended-capacity contact center platform supporting 10,000+ concurrent agents with high availability, load balancing, and advanced analytics integration.",
        "Delivered key product features using React, NextJS and TypeScript, with Redux for complex state management.",
        "Covered logic with Jest unit tests and utilized Docker for isolating and deploying frontend services in a microservice ecosystem.",
        "Project: Optimized application for large contact centers (1000+ agents) processing over 1 million calls per month.",
        "Led delivery of 5 new features for final product release (AngularJS), produced documentation and conducted knowledge transfer sessions.",
        "Independently set up 3 test labs on vSphere and configured end-to-end CI/CD pipelines using Jenkins, Bitbucket, Nexus.",
        "Participated in customer meetings, performed code reviews, and used Git for version control."
      ],
      technologies: ["React", "NextJS", "TypeScript", "Redux", "Jest", "Docker", "AngularJS", "vSphere", "Jenkins", "Bitbucket", "Nexus", "Git"]
    },
    {
      company: "Orion Innovation",
      position: "Software Engineer Level 2",
      period: "Dec 2021 - Oct 2022",
      location: "Nizhniy Novgorod, Russia",
      description: [
        "Project: Unified client interface (desktop/web) for voice, chat, email, video, and social messaging integrating with CRM and analytics, supporting cloud, hybrid, and on-premise deployment.",
        "Delivered 20+ targeted bugfix and feature improvement packages, enhancing system stability and user experience under high-load conditions.",
        "Provided knowledge transfer and mentorship to two interns, significantly enhancing team productivity and code quality."
      ],
      technologies: ["React", "TypeScript", "JavaScript", "CRM Integration", "Analytics"]
    },
    {
      company: "Orion Innovation",
      position: "Software Engineer Level 1",
      period: "Jan 2021 - Nov 2021",
      location: "Nizhniy Novgorod, Russia",
      description: [
        "Project: Omnichannel web platform for contact center agents combining voice, chat, email and CRM data, used in 40+ countries serving millions of customers daily.",
        "Did code review, mentored interns, deployed the project using Azure DevOps pipelines.",
        "Maintained AngularJS web application, improved legacy code, quickly resolved customer issues, fixed bugs.",
        "Maintained the project SDK, implemented new methods for new functions."
      ],
      technologies: ["AngularJS", "Azure DevOps", "SDK Development", "Code Review", "Mentoring"]
    },
    {
      company: "Orion Innovation",
      position: "Software Engineer Intern",
      period: "Sep 2020 - Dec 2020",
      location: "Nizhniy Novgorod, Russia",
      description: [
        "Project: Web-based tool for managing workspaces of over 6400 employees located in 14 RnD centers around the world.",
        "Built the core functionality from scratch using React.js and TypeScript.",
        "Implemented business logic and state management with Redux. Wrote unit tests using Jest."
      ],
      technologies: ["React.js", "TypeScript", "Redux", "Jest"]
    }
  ],
  
  projects: [
    {
      name: "Contact Center Admin Platform",
      description: "Enterprise admin tool for extended-capacity contact center platform supporting 10,000+ concurrent agents with high availability and load balancing",
      technologies: ["React", "NextJS", "TypeScript", "Redux", "Jest", "Docker"],
      features: ["High availability", "Load balancing", "Advanced analytics", "Microservices architecture"]
    },
    {
      name: "Large-Scale Contact Center Application",
      description: "Optimized application for contact centers with 1000+ agents processing over 1 million calls per month",
      technologies: ["AngularJS", "vSphere", "Jenkins", "Bitbucket", "Nexus"],
      features: ["Voice channels", "CMS integration", "Analytical platforms", "Telecom/Banking focus"]
    },
    {
      name: "Unified Client Interface",
      description: "Desktop/web interface for voice, chat, email, video, and social messaging with CRM and analytics integration",
      technologies: ["React", "TypeScript", "JavaScript"],
      features: ["Multi-channel support", "CRM integration", "Cloud/Hybrid/On-premise deployment", "Global usage"]
    },
    {
      name: "Omnichannel Contact Center Platform",
      description: "Web platform combining voice, chat, email and CRM data for contact center agents",
      technologies: ["AngularJS", "Azure DevOps", "SDK"],
      features: ["40+ countries", "Millions of customers", "30% handling time reduction", "Legacy code maintenance"]
    },
    {
      name: "Global Workspace Management Tool",
      description: "Web-based tool for managing workspaces of 6400+ employees across 14 RnD centers worldwide",
      technologies: ["React.js", "TypeScript", "Redux", "Jest"],
      features: ["Global deployment", "Employee management", "Workspace administration", "Multi-center support"]
    }
  ],
  
  education: [
    {
      degree: "Professional course",
      institution: "University of Nizhny Novgorod",
      period: "2019 - 2019",
      description: "JavaScript fundamentals"
    }
  ],
  
  languages: [
    { language: "Russian", level: "Native" },
    { language: "English", level: "Fluent (B2)" }
  ]

};

export const getExperienceContext = () => {
  return `I am ${experienceData.personalInfo.name}, ${experienceData.personalInfo.position}. 
  
  ${experienceData.summary}
  
  Key skills:
  - Frontend: ${experienceData.skills.frontend.join(', ')}
  - State Management: ${experienceData.skills.stateManagement.join(', ')}
  - Build Tools: ${experienceData.skills.buildTools.join(', ')}
  - Other: ${experienceData.skills.other.join(', ')}
  
  Work experience:
  ${experienceData.experience.map(exp => 
    `${exp.position} at ${exp.company} (${exp.period})
    ${exp.description.map(desc => `- ${desc}`).join('\n')}
    Technologies: ${exp.technologies.join(', ')}`
  ).join('\n\n')}
  
  Projects:
  ${experienceData.projects.map(project => 
    `${project.name}: ${project.description}
    Technologies: ${project.technologies.join(', ')}
    Features: ${project.features.join(', ')}`
  ).join('\n\n')}
  
  Education: ${experienceData.education.map(edu => 
    `${edu.degree} at ${edu.institution} (${edu.period})`
  ).join(', ')}
  
  Languages: ${experienceData.languages.map(lang => 
    `${lang.language} - ${lang.level}`
  ).join(', ')}`;
}; 