export const skillsData = {
  languages: [
    { name: "Java", level: "Advanced" },
    { name: "SQL", level: "Advanced" },
    { name: "Python", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
  ],
  frameworks: [
    { name: "React.js", level: "Advanced" },
    { name: "Flask", level: "Intermediate" },
    { name: "Express.js", level: "Advanced" },
  ],
  databases: [
    { name: "MySQL", level: "Advanced" },
    { name: "Firestore", level: "Intermediate" },
  ],
  tools: [
    { name: "Git", level: "Advanced" },
    { name: "GitHub", level: "Advanced" },
    { name: "Firebase", level: "Intermediate" },
    { name: "VS Code", level: "Advanced" },
    { name: "Postman", level: "Intermediate" },
    { name: "Docker", level: "Intermediate" },
    { name: "Maven", level: "Intermediate" },
    { name: "Vercel", level: "Intermediate" },
    // { name: "PythonAnywhere", level: "Intermediate" },
  ],
};

export const skillCategories = [
  { id: "languages", label: "Languages", skills: skillsData.languages },
  { id: "frameworks", label: "Frameworks & Libraries", skills: skillsData.frameworks },
  { id: "databases", label: "Databases", skills: skillsData.databases },
  { id: "tools", label: "Tools & Platforms", skills: skillsData.tools },
];
