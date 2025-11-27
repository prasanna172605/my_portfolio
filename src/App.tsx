import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Instagram, 
  Menu, 
  X, 
  ExternalLink,
  MapPin,
  Calendar,
  Terminal,
  Leaf,
  MessageCircle,
  Send,
  Sparkles,
  Loader2,
  Bot
} from 'lucide-react';

// --- API CONFIGURATION ---
const apiKey = ""; // The execution environment provides this key.
const genAI = new GoogleGenerativeAI(apiKey);

// --- TYPES ---
type ThemeMode = 'professional' | 'personal';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  year?: string;
  link?: string;
  isCert?: boolean;
}

interface Education {
  degree: string;
  school: string;
  year: string;
  location: string;
  grade?: string;
  honor?: string;
}

interface Certificate {
  title: string;
  desc: string;
  category: string;
}

interface Skill {
  name: string;
  level: string;
  percent: number;
  time: string;
}

interface Hobby {
  title: string;
  desc: string;
  meta: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// --- DATA ---
const DATA = {
  professional: {
    home: {
      title: "Prasanna Iyappan",
      subtitle: "Cloud & Data Enthusiast with a Creative Mindset",
      quote: "Great things are built by those who dare to start small and stay consistent.",
      about: "I'm a B.E. AIML student who loves working with cloud, data, and visualisation. I enjoy turning messy datasets into crisp dashboards and blending technical skills with creativity — from AWS and Azure to Power BI, Python, and design.",
      chips: ["⚙️ Cloud & Data", "📊 Power BI Dashboards", "🎨 Creative Problem Solver"]
    },
    education: [
      {
        degree: "B.E. Artificial Intelligence and Machine Learning",
        school: "K. Ramakrishnan College of Technology",
        year: "2023 – 2027",
        location: "Samayapuram, Trichy",
        honor: "🏆 Academic Excellence"
      },
      {
        degree: "Higher Secondary Education",
        school: "Arasunagar Matric Higher Secondary School",
        year: "2022 – 2023",
        location: "Ariyalur",
        grade: "78.9%",
        honor: "🏆 Academic Excellence"
      },
      {
        degree: "Secondary School Certificate",
        school: "Arasunagar Matric Higher Secondary School",
        year: "2020 – 2021",
        location: "Ariyalur",
        honor: "🏆 Academic Excellence"
      }
    ] as Education[],
    projects: [
      {
        title: "FitTracker-AI (AIPS Project)",
        desc: "A fitness tracking web app that helps users monitor workouts and basic health metrics. Built with a clean front-end and simple AI logic to give personalised suggestions.",
        tags: ["HTML", "CSS", "JavaScript"],
        year: "2025",
        link: "https://prasanna172605.github.io/fittracker-ai/"
      },
      {
        title: "Online Retail Data Analysis – Power BI",
        desc: "Analysed an online retail dataset, cleaned bad records, and built interactive dashboards to explore revenue trends, seasonal demand, and top customer segments.",
        tags: ["Power BI", "Data Cleaning", "DAX"],
        year: "2024",
        isCert: true
      },
      {
        title: "Tata Data Visualisation – Simulation",
        desc: "A real-time work simulation focused on building executive-level dashboards for an online retail CEO. Translated raw data into clear stories about high-value customers.",
        tags: ["Business Storytelling", "Dashboards", "Tata"],
        year: "2025",
        isCert: true
      }
    ] as Project[],
    certificates: [
      {
        title: "AWS Solutions Architect – Associate (SAA-C03)",
        desc: "Achieved the official AWS SAA certification showcasing expertise in cloud architecture, VPC design, scalable systems, and cost-optimised deployments.",
        category: "Cloud"
      },
      {
        title: "Microsoft Certified – Azure AI Engineer Associate (Simplilearn)",
        desc: "Certified in building, deploying, and managing AI solutions on Microsoft Azure including cognitive services and enterprise-grade model integrations.",
        category: "Cloud & AI"
      },
      {
        title: "AWS Solutions Architect - Associate Level (SAA)(Simplilearn)",
        desc: "Certified in designing secure, cost-effective, and highly available applications on Amazon Web Services (AWS).",
        category: "Cloud"
      },
      {
        title: " Amazon Web Services (AWS)'s Solutions Architecture - Job Simulation",
        desc: "completed Amazon Web Services (AWS)'s Solutions Architecture on Forage. In the simulation I Designed and simple and scalable hosting architecture based on Elastic Beanstalk for a client experiencing significant growth and slow response times. Described my proposed architecture in plain language ensuring my client understood how it works and how costs will be calculated for it.",
        category: "Cloud & Software Development"
      },
      {
        title: "Tata: Data Visualisation",
        desc: "Real-time simulation work focused on executive-level dashboards, business storytelling, customer segmentation, and seasonal patterns.",
        category: "Business & Data"
      }
    ] as Certificate[],
    skills: {
      frontend: [
        { name: "React", level: "Advanced", percent: 80, time: "3 months" },
        { name: "Tailwind CSS", level: "Advanced", percent: 80, time: "4 months" },
        { name: "HTML", level: "Advanced", percent: 88, time: "3+ years" },
        { name: "Bootstrap", level: "Advanced", percent: 80, time: "6 months" }
      ],
      backend: [
        { name: "Node.js", level: "Beginner", percent: 20, time: "2 months" },
        { name: "Express.js", level: "Beginner", percent: 20, time: "2 months" },
        { name: "REST APIs", level: "Beginner", percent: 20, time: "1 month" },
        { name: "MongoDB", level: "Beginner", percent: 20, time: "1 month" }
      ],
      languages: [
        { name: "Python", level: "Intermediate", percent: 60, time: "2 years" },
        { name: "R", level: "Intermediate", percent: 60, time: "1 year" },
        { name: "Java", level: "Beginner", percent: 30, time: "6 months" },
        { name: "C", level: "Intermediate", percent: 60, time: "1.5 years" }
      ],
      creative: [
        { name: "Pencil Sketching", level: "Expert", percent: 90, time: "5 years" },
        { name: "Freehand Drawing", level: "Expert", percent: 92, time: "6 years" },
        { name: "Digital Art", level: "Advanced", percent: 80, time: "2 years" }
      ]
    }
  },
  personal: {
    home: {
      title: "Hello, I’m ABERRANT",
      subtitle: "This side is all about art, mood, and the things that keep me sane.",
      quote: "Life feels right when I’m creating something – a sketch, a story, a scene, or just a memory with the people I care about.",
      about: "Beyond tech and cloud, I’m someone who enjoys long sketching sessions, listening to music on repeat, and editing random clips just to see how far I can push my creativity. I love building characters in my head and turning those ideas into art.",
      chips: ["✏️ Sketching", "🎨 Painting", "🎬 Video Edits", "📖 Story Concepts"],
      tags: ["Pencil sketching – 5 yrs", "Colour pencil – 4 yrs", "Freehand – 6 yrs", "Digital art – 2 yrs"]
    },
    hobbies: [
      { title: "Drawing & Sketching", desc: "Pencil sketches, portraits, character drawings, shading styles, random ideas on paper.", meta: "5+ years" },
      { title: "Photo & Video Editing", desc: "Colour grading, transitions, smooth cuts, aesthetic edits, reel-style syncing.", meta: "Creative experiments" },
      { title: "Music & Vibes", desc: "Listening to songs on repeat, discovering new playlists, building moods.", meta: "Everyday companion" },
      { title: "Stories & Concepts", desc: "Thinking about characters, scenes, world-building ideas, and plot twists.", meta: "Imagination mode: ON" }
    ] as Hobby[],
    works: [
      { title: "Art & Sketch Collection", desc: "Portraits, character sketches, concept art, and freehand drawings that shaped my style.", meta: "Pencil · Colour · Paint" },
      { title: "Edits & Mini Clips", desc: "Short edits inspired by anime, lyrics, and aesthetics — exploring timing and pacing.", meta: "Basic PC/Mobile editors" },
      { title: "3D Modelling (Learning)", desc: "Beginner-level 3D object designs, lighting practice, and simple animation flows.", meta: "Learning · 1 month" }
    ] as Hobby[]
  }
};

// --- STYLES ---
const CSS_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }

/* CARD SPOTLIGHT EFFECT */
.card {
  position: relative;
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  top: var(--spot-y);
  left: var(--spot-x);
  width: 350px;
  height: 350px;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: 1;
}

/* Professional Mode Glow */
.mode-professional .card::before {
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.35),
    rgba(61, 28, 246, 0.25),
    transparent 70%
  );
}

/* Personal Mode Glow */
.mode-personal .card::before {
  background: radial-gradient(
    circle,
    rgba(16, 185, 129, 0.45),
    rgba(5, 150, 105, 0.35),
    transparent 70%
  );
}

.card:hover::before {
  opacity: 1;
}


html, body, #root {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  color: #e5e7eb;
  transition: background 0.5s ease;
  display: flex;
  flex-direction: column;
}

.mode-professional { background: radial-gradient(circle at top left, #0f172a 0, #020617 55%, #000 100%); }
.mode-personal { background: radial-gradient(circle at top left, #064e3b 0, #022c22 45%, #020617 100%); }

/* HEADER */
.site-header {
  position: fixed; top: 0; left: 0; width: 100%; padding: 14px 8%;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2); z-index: 100;
  transition: all 0.3s;
}
.site-header.personal-mode { background: rgba(6, 78, 59, 0.9); border-color: rgba(52, 211, 153, 0.2); }

.logo { font-size: 20px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #f9fafb; display: flex; align-items: center; gap: 8px; }
.text-sky-400 { color: #38bdf8; }
.text-emerald-400 { color: #34d399; }

.nav-links { display: flex; gap: 24px; }
.nav-btn {
  background: none; border: none; color: #cbd5e1;
  font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;
  cursor: pointer; position: relative; padding: 5px 0;
  transition: color 0.3s;
}
.nav-btn:hover, .nav-btn.active { color: #38bdf8; }
.personal-mode .nav-btn:hover, .personal-mode .nav-btn.active { color: #34d399; }
.nav-btn::after {
  content: ''; position: absolute; left: 0; bottom: 0; width: 0; height: 2px;
  background: #38bdf8; transition: width 0.3s;
}
.nav-btn.active::after { width: 100%; }
.personal-mode .nav-btn::after { background: #34d399; }

/* HEADER CONTROLS */
.header-controls { display: flex; align-items: center; gap: 16px; }

.mode-toggle {
  border-radius: 999px; border: none; padding: 8px 16px;
  font-size: 11px; font-weight: 700; cursor: pointer;
  text-transform: uppercase; letter-spacing: 0.1em;
  background: linear-gradient(90deg, #38bdf8, #22c55e);
  color: #020617; box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
}

.mobile-menu-btn { display: none; background: none; border: none; color: white; cursor: pointer; }

/* MOBILE OVERLAY */
.mobile-overlay {
  position: fixed; inset: 0; z-index: 50; background: rgba(15, 23, 42, 0.98);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px;
}
.mobile-close { position: absolute; top: 24px; right: 24px; background: none; border: none; color: white; cursor: pointer; }
.mobile-nav-item { font-size: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: white; background: none; border: none; cursor: pointer; }

/* MAIN LAYOUT */
.main-wrapper { padding: 120px 8% 60px; width: 100%; max-width: 1400px; margin: 0 auto; flex: 1; animation: fadeIn 0.5s ease-out; }

/* HERO */
.hero { display: flex; flex-wrap: wrap; gap: 60px; min-height: calc(80vh - 120px); align-items: center; width: 100%; }
.hero-left { flex: 1; min-width: 300px; }
.hero-right { flex: 1; min-width: 300px; display: flex; justify-content: center; position: relative; }

.pill {
  display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px;
  border-radius: 999px; font-size: 11px; margin-bottom: 20px;
  background: rgba(8, 47, 73, 0.6); border: 1px solid rgba(56, 189, 248, 0.4); color: #e0f2fe;
}
.pill-emerald { background: rgba(4, 47, 46, 0.6); border-color: rgba(52, 211, 153, 0.5); color: #d1fae5; }
.pill-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e; }

.hero-title { font-size: 3rem; font-weight: 800; margin-bottom: 10px; line-height: 1.2; }
.text-emerald-100 { color: #d1fae5; }
.gradient-text { background: linear-gradient(90deg, #f97316, #ec4899, #38bdf8); -webkit-background-clip: text; color: transparent; }
.hero-subtitle { font-size: 1.2rem; color: #bfdbfe; margin-bottom: 24px; }
.text-emerald-200 { color: #a7f3d0; }

.quote-card {
  background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(148, 163, 184, 0.3);
  padding: 16px; border-radius: 12px; margin-bottom: 24px;
}
.quote-card.emerald { background: rgba(6, 78, 59, 0.6); border-color: rgba(52, 211, 153, 0.4); }
.quote-text { font-style: italic; color: #e2e8f0; font-size: 0.95rem; }
.quote-author { font-size: 0.75rem; color: #94a3b8; margin-top: 6px; text-align: right; }

.hero-text { color: #cbd5e1; line-height: 1.7; margin-bottom: 24px; max-width: 600px; }

.chip-container { margin-bottom: 32px; }
.chip {
  display: inline-block; padding: 6px 12px; border-radius: 999px;
  font-size: 0.8rem; border: 1px solid rgba(148, 163, 184, 0.3);
  margin: 0 8px 8px 0; background: rgba(15, 23, 42, 0.4); color: #94a3b8;
}
.chip-cyan { border-color: rgba(56, 189, 248, 0.5); color: #7dd3fc; }
.chip-pink { border-color: rgba(236, 72, 153, 0.5); color: #f9a8d4; }
.chip-emerald { border-color: rgba(52, 211, 153, 0.5); color: #6ee7b7; background: rgba(6, 78, 59, 0.4); }

/* HERO BUTTONS */
.hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
.btn-primary {
  background: #0ea5e9; color: #0f172a; font-weight: 700; padding: 10px 24px;
  border-radius: 999px; border: none; cursor: pointer; transition: transform 0.2s, background 0.2s;
}
.btn-primary:hover { background: #38bdf8; transform: translateY(-2px); }
.btn-outline {
  background: transparent; color: #e2e8f0; font-weight: 700; padding: 10px 24px;
  border-radius: 999px; border: 1px solid #475569; text-decoration: none; transition: all 0.2s;
}
.btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #cbd5e1; }

.hero-photo-frame {
  position: relative; padding: 8px; border-radius: 24px;
  background: #020617; border: 1px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  width: 100%; max-width: 380px;
}
.hero-photo-glow {
  position: absolute; inset: -10px; z-index: -1; border-radius: 30px;
  background: conic-gradient(from 180deg, #f97316, #ec4899, #38bdf8);
  filter: blur(30px); opacity: 0.4;
}
.personal .hero-photo-glow { background: conic-gradient(from 180deg, #22c55e, #14b8a6, #0ea5e9); }
.hero-img { width: 100%; height: auto; object-fit: cover; border-radius: 18px; display: block; aspect-ratio: 3/4; }

/* SECTIONS */
.section-title { font-size: 2.2rem; font-weight: 700; margin-bottom: 10px; text-align: center; }
.section-subtitle { text-align: center; color: #94a3b8; margin-bottom: 40px; }
.grid-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; width: 100%; }

.card {
  background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(148, 163, 184, 0.2);
  padding: 24px; border-radius: 16px; backdrop-filter: blur(10px);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex; flex-direction: column;
  min-height: 200px;
}
.card:hover {
  transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); border-color: rgba(56, 189, 248, 0.4);
}
.card.emerald { background: rgba(6, 78, 59, 0.4); border-color: rgba(52, 211, 153, 0.3); }
.card.emerald:hover { border-color: rgba(52, 211, 153, 0.6); box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2); }

.card-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; color: #f1f5f9; }
.card-desc { font-size: 0.95rem; color: #cbd5e1; margin-bottom: 16px; line-height: 1.6; flex-grow: 1; }
.card-meta { font-size: 0.8rem; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; }
.card-footer { width: 100%; display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(71, 85, 105, 0.5); }
.card-link { display: flex; align-items: center; gap: 4px; color: #38bdf8; text-decoration: none; font-size: 0.9rem; }
.card-link:hover { color: #7dd3fc; }

.tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.mini-tag { font-size: 0.7rem; padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; }

/* SKILLS */
.skill-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; width: 100%; }
.skill-category { margin-bottom: 24px; }
.category-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; color: #38bdf8; }
.skill-card { background: rgba(15, 23, 42, 0.5); padding: 16px; border-radius: 12px; border: 1px solid rgba(148, 163, 184, 0.2); margin-bottom: 12px; }
.skill-name { font-weight: 600; margin-bottom: 4px; display: flex; justify-content: space-between; }
.skill-bar-bg { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; margin: 8px 0; }
.skill-bar-fill { height: 100%; background: linear-gradient(90deg, #38bdf8, #818cf8); border-radius: 3px; }
.skill-meta { font-size: 0.75rem; color: #94a3b8; }

/* CERTIFICATES STATS */
.cert-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; margin-bottom: 40px; width: 100%; }
.stat-box { background: rgba(30, 41, 59, 0.5); padding: 16px; border-radius: 12px; text-align: center; border: 1px solid rgba(51, 65, 85, 0.5); }
.stat-val { font-size: 1.8rem; font-weight: 700; margin-bottom: 4px; }
.stat-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; }
.cert-badge { display: inline-block; background: rgba(30, 41, 59, 0.8); padding: 4px 12px; border-radius: 999px; font-size: 0.75rem; color: #cbd5e1; border: 1px solid rgba(71, 85, 105, 0.5); margin-top: auto; }

footer { text-align: center; padding: 40px; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(2, 6, 23, 0.8); margin-top: 60px; width: 100%; }
.footer-header { font-weight: 700; margin-bottom: 16px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.9rem; }
.socials { display: flex; justify-content: center; gap: 16px; margin: 20px 0; }
.social-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); color: #cbd5e1; transition: all 0.3s; border: 1px solid rgba(255,255,255,0.1); }
.social-icon:hover { background: #38bdf8; color: #000; transform: translateY(-3px); }

/* CHAT WIDGET */
.chat-widget { position: fixed; bottom: 30px; right: 30px; z-index: 200; display: flex; flex-direction: column; align-items: flex-end; }
.chat-toggle {
  width: 60px; height: 60px; border-radius: 50%; background: #38bdf8;
  box-shadow: 0 4px 20px rgba(56, 189, 248, 0.5); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; color: #0f172a; transition: transform 0.2s;
}
.chat-toggle:hover { transform: scale(1.1); }
.chat-window {
  width: 340px; height: 500px; background: #0f172a; border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); overflow: hidden;
  display: flex; flex-direction: column; margin-bottom: 20px; animation: slideUp 0.3s ease;
}
.chat-header {
  padding: 16px; background: rgba(56, 189, 248, 0.1); border-bottom: 1px solid rgba(56, 189, 248, 0.2);
  display: flex; align-items: center; gap: 10px; font-weight: 700; color: #38bdf8;
}
.chat-body { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.chat-msg { max-width: 80%; padding: 10px 14px; border-radius: 12px; font-size: 0.9rem; line-height: 1.4; }
.msg-user { align-self: flex-end; background: #38bdf8; color: #0f172a; border-bottom-right-radius: 2px; }
.msg-model { align-self: flex-start; background: rgba(255,255,255,0.1); color: #e2e8f0; border-bottom-left-radius: 2px; }
.chat-input-area {
  padding: 16px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 10px;
}
.chat-input {
  flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px; padding: 10px 16px; color: white; outline: none;
}
.chat-send {
  background: #38bdf8; border: none; width: 40px; height: 40px; border-radius: 50%;
  color: #0f172a; cursor: pointer; display: flex; align-items: center; justify-content: center;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* RESPONSIVE */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .mobile-menu-btn { display: block; }
  .hero { flex-direction: column; text-align: center; }
  .hero-right { order: -1; margin-bottom: 20px; }
  .hero-left { width: 100%; }
  .chat-widget { bottom: 20px; right: 20px; }
  .chat-window { width: 300px; height: 450px; }
  .grid-cols, .skill-grid, .cert-stats { grid-template-columns: 1fr; }
  .main-wrapper { padding: 100px 5% 40px; }
}
`;

// --- LLM HELPERS ---
const SYSTEM_PROMPT = `
You are the AI Assistant for Prasanna Iyappan's portfolio website. 
Here is Prasanna's Data:
${JSON.stringify(DATA.professional)}
Rules:
1. Only answer questions about Prasanna based on the data above.
2. If asked about his personal hobbies, mention he has a "Personal Mode" in the website they can switch to.
3. Be brief and helpful.
`;

const getGeminiResponse = async (history: ChatMessage[], newMessage: string) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-preview-09-2025",
      systemInstruction: SYSTEM_PROMPT 
    });
    
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage(newMessage);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later!";
  }
};

const getCreativeSpark = async () => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });
    const prompt = "Generate a short, evocative, and creative art prompt for a pencil sketch or digital painting. It should be abstract or surreal. Just the prompt, no extra text. Example: 'A clock melting over a tree branch in a desert.'";
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return "A lonely astronaut sitting on a park bench on the moon.";
  }
};

// --- COMPONENTS ---

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Prasanna's AI Assistant. Ask me anything about his projects or skills!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await getGeminiResponse(messages, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <Bot size={20} />
            <span>Chat with Prasanna AI</span>
            <button onClick={() => setIsOpen(false)} style={{marginLeft: 'auto', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer'}}><X size={18}/></button>
          </div>
          <div className="chat-body" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg msg-${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg msg-model" style={{display: 'flex', gap: '8px'}}>
                <Loader2 size={14} className="animate-spin" /> Thinking...
              </div>
            )}
          </div>
          <div className="chat-input-area">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="chat-send" onClick={handleSend} disabled={loading}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

const CreativeSparkGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const result = await getCreativeSpark();
    setPrompt(result);
    setLoading(false);
  };

  return (
    <div className="card emerald" style={{ background: 'rgba(6, 78, 59, 0.8)', borderColor: '#34d399' }}>
      <h3 className="card-title" style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#d1fae5'}}>
        <Sparkles size={20} style={{color: '#fcd34d'}} />
        AI Creative Spark
      </h3>
      <p className="card-desc" style={{color: '#a7f3d0'}}>
        Running out of sketch ideas? Let Gemini generate a unique art prompt for you.
      </p>
      
      {prompt && (
        <div style={{background: 'rgba(6, 78, 59, 0.5)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(52, 211, 153, 0.3)', marginBottom: '16px', fontStyle: 'italic', color: '#d1fae5'}}>
          "{prompt}"
        </div>
      )}
      
      <button 
        onClick={generate}
        disabled={loading}
        style={{marginTop: 'auto', width: '100%', padding: '10px', background: '#10b981', color: '#064e3b', fontWeight: '700', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px'}}
      >
        {loading ? <Loader2 size={18} className="animate-spin"/> : <Sparkles size={18} />}
        {loading ? "Dreaming..." : "Generate Idea"}
      </button>
    </div>
  );
};

const Section: React.FC<{
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ id, title, subtitle, children }) => (
  <section id={id} className="animate-[fadeIn_0.5s_ease-out] mb-20 pt-10" style={{width: '100%'}}>
    <h2 className="section-title">{title}</h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
    {children}
  </section>
);

const Card: React.FC<{
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isEmerald?: boolean;
}> = ({ title, children, footer, isEmerald }) => (
  <article
    className={`card ${isEmerald ? 'emerald' : ''}`}
    onMouseMove={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--spot-x", `${x}px`);
      card.style.setProperty("--spot-y", `${y}px`);
    }}
  >
    <h3 className="card-title">{title}</h3>
    <div className="card-desc">{children}</div>
    {footer && <div className="card-footer">{footer}</div>}
  </article>
);



const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="skill-card">
    <div className="skill-name">
      <span>{skill.name}</span>
      <span style={{fontSize: '0.75rem', color: '#7dd3fc'}}>{skill.level}</span>
    </div>
    <div className="skill-bar-bg">
      <div className="skill-bar-fill" style={{ width: `${skill.percent}%` }}></div>
    </div>
    <div className="skill-meta">{skill.time} experience</div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('professional');
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMode = () => {
    const newMode = mode === 'professional' ? 'personal' : 'professional';
    setMode(newMode);
    setActiveSection('home');
    window.scrollTo(0, 0);
  };

  const navItems = mode === 'professional' 
    ? ['home', 'education', 'projects', 'certificates', 'skills']
    : ['home', 'hobbies', 'works'];

  // Content Helpers
  const pro = DATA.professional;
  const per = DATA.personal;

  return (
    <div className={`app-container mode-${mode}`}>
      <style>{CSS_STYLES}</style>

      {/* HEADER */}
      <header className={`site-header ${mode === 'personal' ? 'personal-mode' : ''}`}>
        <div className="logo">
          {mode === 'professional' ? <Terminal size={20} className="text-sky-400" /> : <Leaf size={20} className="text-emerald-400" />}
          <span>Prasanna{mode === 'professional' ? '.dev' : '.me'}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`nav-btn ${activeSection === item ? 'active' : ''}`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="header-controls">
          <button onClick={toggleMode} className="mode-toggle">
            {mode === 'professional' ? 'Switch to Personal' : 'Switch to Pro'}
          </button>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-overlay">
          <button className="mobile-close" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveSection(item);
                setIsMenuOpen(false);
              }}
              className="mobile-nav-item"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="main-wrapper">
        
        {/* --- PROFESSIONAL CONTENT --- */}
        {mode === 'professional' && (
          <>
            {activeSection === 'home' && (
              <section className="hero animate-[fadeIn_0.5s]">
                <div className="hero-left">
                  <div className="pill">
                    <span className="pill-dot"></span> Available for Opportunities
                  </div>
                  <h1 className="hero-title">
                    <span className="gradient-text">{pro.home.title}</span>
                  </h1>
                  <h2 className="hero-subtitle">{pro.home.subtitle}</h2>
                  
                  <div className="quote-card">
                    <p className="quote-text">"{pro.home.quote}"</p>
                    <p className="quote-author">— Prasanna</p>
                  </div>
                  
                  <p className="hero-text">{pro.home.about}</p>
                  
                  <div className="chip-container">
                    {pro.home.chips.map((chip, i) => (
                      <span key={i} className={`chip ${i % 2 === 0 ? 'chip-cyan' : 'chip-pink'}`}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="hero-actions">
                    <button onClick={() => setActiveSection('projects')} className="btn-primary">
                      View Projects
                    </button>
                    <a href="mailto:named.as.prasanna@gmail.com" className="btn-outline">
                      Contact Me
                    </a>
                  </div>
                </div>
                <div className="hero-right">
                  <div className="hero-photo-glow"></div>
                  <div className="hero-photo-frame">
                    {/* Uses local public image pro.jpg */}
                    <img src="pro.jpg" alt="Prasanna" className="hero-img" />
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'education' && (
              <Section id="education" title="Education" subtitle="A strong foundation in AI & Computer Science.">
                <div className="grid-cols">
                  {pro.education.map((edu, idx) => (
                    <Card key={idx} title={edu.degree}>
                      <p style={{color: '#7dd3fc', fontWeight: 500, marginBottom: '8px'}}>{edu.school}</p>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '16px'}}>
                        <Calendar size={14} /> {edu.year}
                        <MapPin size={14} style={{marginLeft: '8px'}} /> {edu.location}
                      </div>
                      {edu.grade && <p style={{fontSize: '0.9rem', marginBottom: '8px'}}>Grade: <span style={{color: 'white'}}>{edu.grade}</span></p>}
                      {edu.honor && <span style={{color: '#facc15', fontSize: '0.9rem', fontWeight: 600}}>{edu.honor}</span>}
                    </Card>
                  ))}
                </div>
              </Section>
            )}

            {activeSection === 'projects' && (
              <Section id="projects" title="Featured Projects" subtitle="Academic, simulation, and personal work blending cloud & data.">
                <div className="grid-cols">
                  {pro.projects.map((proj, idx) => (
                    <Card 
                      key={idx} 
                      title={proj.title}
                      footer={
                        <>
                          <span>📅 {proj.year}</span>
                          {proj.link ? (
                            <a href={proj.link} target="_blank" rel="noreferrer" className="card-link">
                              Live Demo <ExternalLink size={14}/>
                            </a>
                          ) : (
                            <span style={{color: '#34d399', fontSize: '0.8rem'}}>✔ Completed</span>
                          )}
                        </>
                      }
                    >
                      <p style={{marginBottom: '16px', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6}}>{proj.desc}</p>
                      <div className="tag-row">
                        {proj.tags.map((t, i) => (
                          <span key={i} className="mini-tag">{t}</span>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </Section>
            )}

            {activeSection === 'certificates' && (
              <Section id="certs" title="Certifications" subtitle="Verified credentials in Cloud, AI, and Data.">
                 <div className="cert-stats">
                    <div className="stat-box">
                      <div className="stat-val" style={{color: '#f472b6'}}>5</div>
                      <div className="stat-label">Total Certs</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-val" style={{color: '#38bdf8'}}>4</div>
                      <div className="stat-label">Categories</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-val" style={{color: '#34d399'}}>2025</div>
                      <div className="stat-label">Latest</div>
                    </div>
                 </div>

                 <div className="grid-cols">
                    {pro.certificates.map((cert, idx) => (
                      <Card key={idx} title={cert.title}>
                        <p style={{fontSize: '0.9rem', color: '#94a3b8', marginBottom: '16px'}}>{cert.desc}</p>
                        <div className="cert-badge">
                          Category: {cert.category}
                        </div>
                      </Card>
                    ))}
                 </div>
              </Section>
            )}

            {activeSection === 'skills' && (
              <Section id="skills" title="Technical Skills">
                <div className="skill-grid">
                  <div className="skill-category">
                    <h3 className="category-title">Frontend Development</h3>
                    <div>
                      {pro.skills.frontend.map((s, i) => <SkillBar key={i} skill={s} />)}
                    </div>
                  </div>
                  <div className="skill-category">
                    <h3 className="category-title" style={{color: '#c084fc'}}>Backend & Cloud</h3>
                    <div>
                      {[...pro.skills.backend, { name: "AWS", level: "Intermediate", percent: 60, time: "3 months" }].map((s, i) => <SkillBar key={i} skill={s} />)}
                    </div>
                  </div>
                </div>
              </Section>
            )}

            {/* AI CHAT WIDGET - Only active in Professional Mode */}
            <ChatWidget />
          </>
        )}

        {/* --- PERSONAL CONTENT --- */}
        {mode === 'personal' && (
          <div className="personal">
            {activeSection === 'home' && (
              <section className="hero animate-[fadeIn_0.5s]">
                 <div className="hero-left">
                   <div className="pill pill-emerald">
                     <span className="pill-dot"></span> Welcome to my world
                   </div>
                   <h1 className="hero-title text-emerald-100">{per.home.title}</h1>
                   <h2 className="hero-subtitle text-emerald-200">{per.home.subtitle}</h2>

                   <div className="quote-card emerald">
                     <p className="quote-text text-emerald-100">"{per.home.quote}"</p>
                   </div>
                   
                   <p className="hero-text text-emerald-100">{per.home.about}</p>
                   
                   <div className="chip-container">
                     {per.home.chips.map((c, i) => (
                       <span key={i} className="chip chip-emerald">{c}</span>
                     ))}
                   </div>
                 </div>
                 <div className="hero-right">
                    <div className="hero-photo-glow"></div>
                    <div className="hero-photo-frame" style={{background: '#064e3b', borderColor: '#065f46'}}>
                       {/* Uses local public image personal.jpg */}
                       <img src="personal.jpg" alt="Casual Prasanna" className="hero-img" />
                    </div>
                 </div>
              </section>
            )}

            {activeSection === 'hobbies' && (
              <Section id="hobbies" title="My Hobbies" subtitle="Creative outlets that keep my mind active.">
                <div className="grid-cols">
                  {per.hobbies.map((hobby, idx) => (
                    <Card key={idx} title={hobby.title} isEmerald={true} footer={<span style={{color: '#6ee7b7', fontSize: '0.8rem'}}>{hobby.meta}</span>}>
                       <p style={{color: '#d1fae5', fontSize: '0.9rem', lineHeight: 1.6}}>{hobby.desc}</p>
                    </Card>
                  ))}
                </div>
              </Section>
            )}

            {activeSection === 'works' && (
              <Section id="works" title="Creative Works" subtitle="Sketches, edits, and imagination.">
                 <div className="grid-cols">
                    {/* Gemini AI Feature for Personal Mode */}
                    <CreativeSparkGenerator />

                    {per.works.map((work, idx) => (
                      <Card key={idx} title={work.title} isEmerald={true}>
                         <p style={{color: '#d1fae5', fontSize: '0.9rem', marginBottom: '16px'}}>{work.desc}</p>
                         <span className="cert-badge" style={{background: 'rgba(6, 95, 70, 0.8)', borderColor: '#34d399', color: '#6ee7b7'}}>
                           {work.meta}
                         </span>
                      </Card>
                    ))}
                 </div>
              </Section>
            )}
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer>
        <p className="footer-header">Let's Connect</p>
        <div className="socials">
          <a href="https://github.com/prasanna172605" target="_blank" className="social-icon"><Github size={18} /></a>
          <a href="https://www.linkedin.com/in/prasanna-iyappan-b728042a3/" target="_blank" className="social-icon"><Linkedin size={18} /></a>
          <a href="mailto:named.as.prasanna@gmail.com" className="social-icon"><Mail size={18} /></a>
          <a href="https://www.instagram.com/__prasannaaah__?utm_source=qr" target="_blank" className="social-icon"><Instagram size={18} /></a>
        </div>
        <p style={{fontSize: '0.8rem', color: '#64748b'}}>© {new Date().getFullYear()} Prasanna Iyappan</p>
      </footer>
    </div>
  );
}