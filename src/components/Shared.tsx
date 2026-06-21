
import type { Skill } from '../data';

export const Section: React.FC<{
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ id, title, subtitle, children }) => (
  <section id={id} className="animate-[fadeIn_0.5s_ease-out] mb-20 pt-10" style={{ width: '100%' }}>
    <h2 className="section-title">{title}</h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
    {children}
  </section>
);

export const Card: React.FC<{
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

export const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="skill-card">
    <div className="skill-name">
      <span>{skill.name}</span>
      <span style={{ fontSize: '0.75rem', color: '#7dd3fc' }}>{skill.level}</span>
    </div>
    <div className="skill-bar-bg">
      <div className="skill-bar-fill" style={{ width: `${skill.percent}%` }}></div>
    </div>
    <div className="skill-meta">{skill.time} experience</div>
  </div>
);
