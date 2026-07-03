export interface Project {
  title: string;
  desc: string;
  tags: string[];
  link?: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  location: string;
  honor?: string;
  grade?: string;
}

export interface Certificate {
  title: string;
  desc: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Experience {
  role: string;
  company: string;
  desc: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const DATA = {
  home: {
    title: "Prasanna Iyappan",
    subtitle: "Full-Stack Developer & Data Enthusiast",
    about: "I'm a B.E. AIML student who loves working with cloud, data, and visualisation. I enjoy turning messy datasets into crisp dashboards and blending technical skills with creativity — from AWS and Azure to Power BI, Python, and frontend development."
  },
  education: [
    {
      degree: "B.E. Artificial Intelligence and Machine Learning",
      school: "K. Ramakrishnan College of Technology",
      year: "2023 – 2027",
      location: "Samayapuram, Trichy",
      honor: "🏆 Academic Excellence"
    }
  ] as Education[],
  experience: [
    {
      role: "Co-Founder",
      company: "Atti-Community",
      desc: "Co-founded a community focused on learning and building real-world projects together, organizing events and fostering a developer ecosystem."
    },
    {
      role: "Data Analyst",
      company: "K. Ramakrishnan College of Technology",
      desc: "Worked as a data analyst for a college project analyzing student academic performance using PowerBI, creating interactive dashboards to track and improve outcomes."
    }
  ] as Experience[],
  projects: [
    {
      title: "SnuggleMusix",
      desc: "A premium open-source Android music player built with Kotlin & Jetpack Compose. Supports YouTube Music, JioSaavn, Spotify import, lyrics sync, Material You theming, and more. Features a full CI/CD release pipeline on GitHub Actions.",
      tags: ["Kotlin", "Jetpack Compose", "Material You", "CI/CD"],
    },
    {
      title: "Snuggle Messenger",
      desc: "A React Native messaging app with Firebase Authentication and a realtime database architecture supporting secure message synchronization.",
      tags: ["React Native", "Firebase", "Realtime DB"],
    },
    {
      title: "Audadham",
      desc: "A full-fledged smart healthcare companion app built around helping people stay safe, consistent, and stress-free with their medication — especially families who manage health for loved ones. Worked as a frontend developer.",
      tags: ["Frontend", "Healthcare", "UI/UX"],
    },
    {
      title: "FitTracker-AI (AIPS Project)",
      desc: "A fitness tracking web app that helps users monitor workouts and basic health metrics. Built with a clean front-end and simple AI logic to give personalised suggestions.",
      tags: ["Web", "AI logic", "Fitness"],
      link: "https://prasanna172605.github.io/fittracker-ai/"
    },
    {
      title: "Student Academics Performance Analysis",
      desc: "A data analytics project for KRCT analyzing student academic performance and extracting actionable insights.",
      tags: ["Data Analysis", "PowerBI"],
    },
    {
      title: "Payanam Parcel",
      desc: "A new way for Parcel and courier services. (Work in progress)",
      tags: ["Logistics", "Work in Progress"],
    }
  ] as Project[],
  skills: [
    { name: "React / React Native", level: "Advanced" },
    { name: "TypeScript", level: "Advanced" },
    { name: "Kotlin & Jetpack Compose", level: "Advanced" },
    { name: "Firebase", level: "Advanced" },
    { name: "PowerBI", level: "Intermediate" },
    { name: "Node.js", level: "Intermediate" },
    { name: "HTML & CSS / Tailwind", level: "Advanced" },
    { name: "AWS & Azure", level: "Intermediate" },
    { name: "AI/ML Basics", level: "Intermediate" }
  ] as Skill[],
  certificates: [
    {
      title: "AWS Solutions Architect – Associate (SAA-C03)",
      desc: "Global certificate showcasing expertise in cloud architecture, VPC design, scalable systems, and cost-optimised deployments."
    },
    {
      title: "Microsoft Certified – Azure AI Engineer Associate",
      desc: "Certified in building, deploying, and managing AI solutions on Microsoft Azure including cognitive services and enterprise-grade model integrations. (Simplilearn)"
    },
    {
      title: "AWS Solutions Architect - Associate Level",
      desc: "Certified in designing secure, cost-effective, and highly available applications on Amazon Web Services (AWS). (Simplilearn)"
    },
    {
      title: "AWS Academy Graduate - Generative AI Foundations",
      desc: "Training Badge for Generative AI Foundations."
    }
  ] as Certificate[]
};

export const SYSTEM_PROMPT = `You are the AI Assistant for Prasanna Iyappan's portfolio website. Here is Prasanna's Data:
${JSON.stringify(DATA)}
Rules:
1. Only answer questions about Prasanna based on the data above.
2. Be brief and helpful.
`;
