
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <p className="footer-header">Let's Connect</p>
      <div className="socials">
        <a href="https://github.com/prasanna172605" target="_blank" rel="noreferrer" className="social-icon"><Github size={18} /></a>
        <a href="https://www.linkedin.com/in/prasanna-iyappan-b728042a3/" target="_blank" rel="noreferrer" className="social-icon"><Linkedin size={18} /></a>
        <a href="mailto:named.as.prasanna@gmail.com" className="social-icon"><Mail size={18} /></a>
        <a href="https://www.instagram.com/__prasannaaah__?utm_source=qr" target="_blank" rel="noreferrer" className="social-icon"><Instagram size={18} /></a>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#64748b' }}>© {new Date().getFullYear()} Prasanna Iyappan</p>
    </footer>
  );
};
