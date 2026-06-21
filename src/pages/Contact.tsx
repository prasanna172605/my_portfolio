
import type { ThemeMode } from '../data';
import { Section, Card } from '../components/Shared';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

export const Contact: React.FC<{ mode: ThemeMode, data: typeof import('../data').DATA }> = ({ mode }) => {
  return (
    <>
      <Section id="contact" title="Get In Touch" subtitle="I'm always open to new opportunities and interesting projects.">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Card title="Contact Information" isEmerald={mode === 'personal'}>
            <p style={{ marginBottom: '24px', color: mode === 'personal' ? '#a7f3d0' : '#cbd5e1', lineHeight: 1.6 }}>
              Whether you have a question, a project idea, or just want to say hi, feel free to drop a message.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="mailto:named.as.prasanna@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#38bdf8', textDecoration: 'none', padding: '12px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <Mail size={24} />
                <span>named.as.prasanna@gmail.com</span>
              </a>
              
              <a href="https://www.linkedin.com/in/prasanna-iyappan-b728042a3/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#38bdf8', textDecoration: 'none', padding: '12px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <Linkedin size={24} />
                <span>LinkedIn Profile</span>
              </a>

              <a href="https://github.com/prasanna172605" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#38bdf8', textDecoration: 'none', padding: '12px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <Github size={24} />
                <span>GitHub Profile</span>
              </a>

              <a href="https://www.instagram.com/__prasannaaah__?utm_source=qr" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#38bdf8', textDecoration: 'none', padding: '12px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <Instagram size={24} />
                <span>Instagram Profile</span>
              </a>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
};
