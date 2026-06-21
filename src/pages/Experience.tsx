
import { MapPin, Calendar } from 'lucide-react';
import type { ThemeMode } from '../data';
import { Section, Card } from '../components/Shared';

export const Experience: React.FC<{ mode: ThemeMode, data: typeof import('../data').DATA }> = ({ mode, data }) => {
  const pro = data.professional;

  if (mode === 'personal') {
    return (
      <div className="personal">
        <Section id="experience" title="Personal Experience" subtitle="Life, travels, and personal growth.">
          <p style={{ textAlign: 'center', color: '#a7f3d0' }}>Switch to Professional mode to see my formal education and certifications.</p>
        </Section>
      </div>
    );
  }

  return (
    <>
      <Section id="education" title="Education" subtitle="A strong foundation in AI & Computer Science.">
        <div className="grid-cols">
          {pro.education.map((edu: import('../data').Education, idx: number) => (
            <Card key={idx} title={edu.degree}>
              <p style={{ color: '#7dd3fc', fontWeight: 500, marginBottom: '8px' }}>{edu.school}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '16px' }}>
                <Calendar size={14} /> {edu.year}
                <MapPin size={14} style={{ marginLeft: '8px' }} /> {edu.location}
              </div>
              {edu.grade && <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Grade: <span style={{ color: 'white' }}>{edu.grade}</span></p>}
              {edu.honor && <span style={{ color: '#facc15', fontSize: '0.9rem', fontWeight: 600 }}>{edu.honor}</span>}
            </Card>
          ))}
        </div>
      </Section>

      <Section id="certs" title="Certifications" subtitle="Verified credentials in Cloud, AI, and Data.">
        <div className="cert-stats">
          <div className="stat-box">
            <div className="stat-val" style={{ color: '#f472b6' }}>5</div>
            <div className="stat-label">Total Certs</div>
          </div>
          <div className="stat-box">
            <div className="stat-val" style={{ color: '#38bdf8' }}>4</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-box">
            <div className="stat-val" style={{ color: '#34d399' }}>2025</div>
            <div className="stat-label">Latest</div>
          </div>
        </div>

        <div className="grid-cols">
          {pro.certificates.map((cert: import('../data').Certificate, idx: number) => (
            <Card key={idx} title={cert.title}>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '16px' }}>{cert.desc}</p>
              <div className="cert-badge" style={{ display: 'inline-block', background: 'rgba(30, 41, 59, 0.8)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', color: '#cbd5e1', border: '1px solid rgba(71, 85, 105, 0.5)' }}>
                Category: {cert.category}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
};
