import PDFDocument from 'pdfkit';
import fs from 'fs';
import { experiences } from './src/data/experiences.js';
import { projects } from './src/data/projects.js';
import { skills } from './src/data/skills.js';

const doc = new PDFDocument({ margin: 0, size: 'A4', autoFirstPage: true });

const writeStream = fs.createWriteStream('public/resume.pdf');
doc.pipe(writeStream);

const pageWidth = doc.page.width;
const pageHeight = doc.page.height;
const leftColWidth = pageWidth * 0.35;
const rightColWidth = pageWidth - leftColWidth;

const colors = {
  bgLeft: '#1c2331',
  textLeft: '#ffffff',
  textLeftMuted: '#94a3b8',
  accent: '#21b6a8',
  bgRight: '#ffffff',
  textRight: '#333333',
  textRightBold: '#000000',
};

// Left Column Background
doc.rect(0, 0, leftColWidth, pageHeight).fill(colors.bgLeft);

// Helper functions for left column
let yLeft = 30;
const xLeft = 30;
const wLeft = leftColWidth - 60;

function addLeftHeading(text) {
  doc.font('Times-Bold').fontSize(13).fillColor(colors.textLeft).text(text.toUpperCase(), xLeft, yLeft);
  yLeft += 16;
  doc.moveTo(xLeft, yLeft).lineTo(xLeft + wLeft, yLeft).lineWidth(1).strokeColor(colors.accent).stroke();
  yLeft += 12;
}

// Header
doc.font('Times-Bold').fontSize(20).fillColor(colors.textLeft).text('PRASANNA I', xLeft, yLeft, { align: 'center', width: wLeft });
yLeft += 22;
doc.font('Times-Bold').fontSize(11).fillColor(colors.accent).text('AI & ML ENGINEER', xLeft, yLeft, { align: 'center', width: wLeft });
yLeft += 18;
doc.moveTo(xLeft, yLeft).lineTo(xLeft + wLeft, yLeft).lineWidth(1).strokeColor(colors.accent).stroke();
yLeft += 16;

// Contact
doc.font('Times-Roman').fontSize(10).fillColor(colors.textLeft);
const contacts = [
  'named.as.prasanna@gmail.com',
  '+91 8760668866',
  'aberrant-portfolio-2026.web.app',
  'linkedin.com/in/prasanna-iyappan-b728042a3',
  'github.com/prasanna172605'
];
contacts.forEach(c => {
  doc.fillColor(colors.accent).circle(xLeft + 5, yLeft + 4, 2).fill();
  doc.fillColor(colors.textLeft).text(c, xLeft + 15, yLeft);
  yLeft += 16;
});
yLeft += 10;

addLeftHeading('Education');
doc.font('Times-Bold').fontSize(11).fillColor(colors.textLeft).text('B.E., Computer Science', xLeft, yLeft);
yLeft += 14;
doc.font('Times-Italic').fontSize(10).fillColor(colors.textLeft).text('AI & Machine Learning', xLeft, yLeft);
yLeft += 14;
doc.font('Times-Roman').fontSize(10).fillColor(colors.textLeftMuted).text('K. Ramakrishnan College of Tech.', xLeft, yLeft);
yLeft += 14;
doc.text('2023 - 2027 · Ariyalur, India', xLeft, yLeft);
yLeft += 14;
doc.font('Times-Italic').text('Currently in Final Year', xLeft, yLeft);
yLeft += 18;

addLeftHeading('Programming');
const programming = [
  { name: 'Python', pct: 0.9 },
  { name: 'Java', pct: 0.8 },
  { name: 'JavaScript / HTML / CSS', pct: 0.85 },
  { name: 'SQL / DAX', pct: 0.75 }
];
programming.forEach(p => {
  doc.font('Times-Roman').fontSize(10).fillColor(colors.textLeft).text(p.name, xLeft, yLeft);
  yLeft += 14;
  doc.rect(xLeft, yLeft, wLeft, 5).fill('#334155');
  doc.rect(xLeft, yLeft, wLeft * p.pct, 5).fill(colors.accent);
  yLeft += 12;
});
yLeft += 12;

addLeftHeading('Skills');

const frontend = skills.filter(s => s.category === 'frontend').map(s => s.name).join(', ');
const backend = skills.filter(s => s.category === 'backend').map(s => s.name).join(', ');
const mobile = skills.filter(s => s.category === 'mobile').map(s => s.name).join(', ');
const tools = skills.filter(s => s.category === 'tools').map(s => s.name).join(', ');

doc.font('Times-Bold').fontSize(10).fillColor(colors.textLeft).text('Frontend', xLeft, yLeft);
yLeft += 12;
doc.font('Times-Roman').fontSize(9).fillColor(colors.textLeftMuted).text(frontend, xLeft, yLeft, { width: wLeft });
yLeft += doc.heightOfString(frontend, { width: wLeft }) + 6;

doc.font('Times-Bold').fontSize(10).fillColor(colors.textLeft).text('Backend & AI', xLeft, yLeft);
yLeft += 12;
doc.font('Times-Roman').fontSize(9).fillColor(colors.textLeftMuted).text(backend, xLeft, yLeft, { width: wLeft });
yLeft += doc.heightOfString(backend, { width: wLeft }) + 6;

doc.font('Times-Bold').fontSize(10).fillColor(colors.textLeft).text('Mobile', xLeft, yLeft);
yLeft += 12;
doc.font('Times-Roman').fontSize(9).fillColor(colors.textLeftMuted).text(mobile, xLeft, yLeft, { width: wLeft });
yLeft += doc.heightOfString(mobile, { width: wLeft }) + 6;

doc.font('Times-Bold').fontSize(10).fillColor(colors.textLeft).text('Tools & Cloud', xLeft, yLeft);
yLeft += 12;
doc.font('Times-Roman').fontSize(9).fillColor(colors.textLeftMuted).text(tools, xLeft, yLeft, { width: wLeft });
yLeft += doc.heightOfString(tools, { width: wLeft }) + 6;

yLeft += 6;

addLeftHeading('Certifications');
const certs = [
  { name: 'AWS Solutions Architect', desc: 'Associate (SAA-C03)' },
  { name: 'Microsoft Azure AI', desc: 'Engineer Associate' },
  { name: 'AWS Cloud Architect', desc: 'Solution – Simplilearn' }
];
certs.forEach(c => {
  doc.font('Times-Bold').fontSize(10).fillColor(colors.textLeft).text(c.name, xLeft, yLeft);
  yLeft += 12;
  doc.font('Times-Italic').fontSize(9).fillColor(colors.textLeftMuted).text(c.desc, xLeft, yLeft);
  yLeft += 16;
});
yLeft += 10;

addLeftHeading('Languages');
const langs = [
  { name: 'Tamil', level: 'Native' },
  { name: 'English', level: 'Fluent' },
  { name: 'Hindi', level: 'Intermediate' },
  { name: 'Spanish', level: 'Beginner' }
];
langs.forEach(l => {
  doc.font('Times-Roman').fontSize(10).fillColor(colors.textLeftMuted).text(l.name + ' – ', xLeft, yLeft, { continued: true });
  doc.fillColor(colors.textLeft).text(l.level);
  yLeft += 14;
});

// Right Column Content
let yRight = 30;
const xRight = leftColWidth + 30;
const wRight = rightColWidth - 60;

function addRightHeading(text) {
  doc.font('Times-Bold').fontSize(16).fillColor(colors.textRightBold).text(text.toUpperCase(), xRight, yRight);
  yRight += 20;
  doc.moveTo(xRight, yRight).lineTo(xRight + wRight, yRight).lineWidth(1.5).strokeColor(colors.accent).stroke();
  yRight += 15;
}

// Summary
const summaryText = 'AI & ML undergraduate specializing in AI application development, computer vision, and full-stack engineering. Hands-on experience building React, Firebase, and AI-powered solutions, with working knowledge of AWS and Azure cloud platforms. Proficient in Python, OpenCV, and deep learning frameworks, with a strong foundation in UI/UX design, data analytics, and scalable software architecture.';
doc.font('Times-Roman').fontSize(11).fillColor(colors.textRight).text(summaryText, xRight, yRight, { width: wRight, align: 'justify', lineGap: 2 });
yRight += doc.heightOfString(summaryText, { width: wRight, align: 'justify', lineGap: 2 }) + 20;

addRightHeading('EXPERIENCE & PROJECTS');

// We mix experience and top projects to fit the right column dynamically.
const filteredExp = experiences.filter(e => !e.role.includes('B.E.'));
const combined = [
  ...filteredExp.map(e => ({ type: 'exp', ...e })),
  ...projects.filter(p => p.featured).map(p => ({ type: 'proj', ...p }))
].slice(0, 4); // limit to 4 items so it fits on 1 page

combined.forEach(item => {
  if (item.type === 'exp') {
    doc.font('Times-Bold').fontSize(13).fillColor(colors.textRightBold).text(item.role, xRight, yRight, { continued: true });
    doc.font('Times-Roman').fontSize(11).fillColor(colors.textRightMuted || '#666666').text(' · ' + item.company);
    yRight += 15;
    doc.font('Times-Bold').fontSize(10).fillColor(colors.accent).text(item.date, xRight, yRight);
    yRight += 15;
    
    doc.font('Times-Roman').fontSize(11).fillColor(colors.textRight);
    doc.circle(xRight + 5, yRight + 5, 2).fill(colors.textRight);
    doc.text(item.description, xRight + 15, yRight, { width: wRight - 15, lineGap: 2 });
    yRight += doc.heightOfString(item.description, { width: wRight - 15, lineGap: 2 }) + 10;
  } else {
    doc.font('Times-Bold').fontSize(13).fillColor(colors.textRightBold).text(item.role || 'Developer', xRight, yRight, { continued: true });
    doc.font('Times-Roman').fontSize(11).fillColor(colors.textRightMuted || '#666666').text(' · ' + item.title + ' · Personal Project');
    yRight += 15;
    doc.font('Times-Roman').fontSize(11).fillColor(colors.textRight);
    doc.circle(xRight + 5, yRight + 5, 2).fill(colors.textRight);
    doc.text(item.description, xRight + 15, yRight, { width: wRight - 15, lineGap: 2 });
    yRight += doc.heightOfString(item.description, { width: wRight - 15, lineGap: 2 }) + 10;
  }
});

yRight += 5;
addRightHeading('KEY ACHIEVEMENTS');
const achievements = [
  'Developed 2+ full-stack AI applications integrating machine learning, computer vision, and cloud technologies.',
  'Attained industry-recognized AWS Solutions Architect – Associate (SAA-C03) global certification.',
  'Earned Microsoft Azure AI Engineer Associate certification, demonstrating proficiency in cloud-based AI service deployment.',
  'Built production-ready responsive applications using the React ecosystem, deployed to live hosting environments.'
];

achievements.forEach(ach => {
  doc.font('Times-Roman').fontSize(11).fillColor(colors.textRight);
  // doc.circle(xRight + 5, yRight + 5, 2).fill(colors.textRight);
  doc.text(ach, xRight + 5, yRight, { width: wRight - 5, lineGap: 2 });
  yRight += doc.heightOfString(ach, { width: wRight - 5, lineGap: 2 }) + 8;
});

yRight += 5;
addRightHeading('INTERESTS');
doc.font('Times-Roman').fontSize(11).fillColor(colors.textRight)
   .text('Professional Artist', xRight, yRight, { continued: true });
doc.font('Times-Roman').fillColor(colors.textRight).text(' – pencil sketching, digital art, canvas painting, 3D modelling & animation (Blender). ', { continued: true });
doc.font('Times-Bold').text('UI/UX Design', { continued: true });
doc.font('Times-Roman').text(' – interactive and stunning rebranding concepts. ', { continued: true });
doc.font('Times-Bold').text('Editing', { continued: true });
doc.font('Times-Roman').text(' – video, photo editing, and VFX.', { width: wRight, lineGap: 2 });

doc.end();

writeStream.on('finish', () => {
  console.log('Resume PDF generated successfully.');
});