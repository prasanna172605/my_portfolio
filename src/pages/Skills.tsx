
import type { ThemeMode } from '../data';
import { Section, SkillBar, Card } from '../components/Shared';

export const Skills: React.FC<{ mode: ThemeMode, data: typeof import('../data').DATA }> = ({ mode, data }) => {
  const pro = data.professional;
  const per = data.personal;

  return (
    <>
      {mode === 'professional' ? (
        <Section id="skills" title="Technical Skills">
          <div className="skill-grid">
            <div className="skill-category">
              <h3 className="category-title">Frontend Development</h3>
              <div>
                {pro.skills.frontend.map((s: import('../data').Skill, i: number) => <SkillBar key={i} skill={s} />)}
              </div>
            </div>
            <div className="skill-category">
              <h3 className="category-title" style={{ color: '#c084fc' }}>Backend & Cloud</h3>
              <div>
                {[...pro.skills.backend, { name: "AWS", level: "Intermediate", percent: 60, time: "3 months" }].map((s: import('../data').Skill, i: number) => <SkillBar key={i} skill={s} />)}
              </div>
            </div>
          </div>
        </Section>
      ) : (
        <div className="personal">
          <Section id="hobbies" title="My Hobbies" subtitle="Creative outlets that keep my mind active.">
            <div className="grid-cols">
              {per.hobbies.map((hobby: import('../data').Hobby, idx: number) => (
                <Card key={idx} title={hobby.title} isEmerald={true} footer={<span style={{ color: '#6ee7b7', fontSize: '0.8rem' }}>{hobby.meta}</span>}>
                  <p style={{ color: '#d1fae5', fontSize: '0.9rem', lineHeight: 1.6 }}>{hobby.desc}</p>
                </Card>
              ))}
            </div>
          </Section>
        </div>
      )}
    </>
  );
};
