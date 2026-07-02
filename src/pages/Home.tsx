
import type { ThemeMode } from '../data';
import { NavLink } from 'react-router-dom';
import { SEO } from '../components/SEO';

interface HomeProps {
  mode: ThemeMode;
  data: typeof import('../data').DATA;
}

export const Home: React.FC<HomeProps> = ({ mode, data }) => {
  const pro = data.professional;
  const per = data.personal;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://prasanna0705.netlify.app/#person",
        "name": "Prasanna Iyappan",
        "jobTitle": "Android Developer",
        "url": "https://prasanna0705.netlify.app/",
        "sameAs": [
          "https://github.com/prasanna172605",
          "https://www.linkedin.com/in/prasanna-iyappan-b728042a3/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://prasanna0705.netlify.app/#website",
        "url": "https://prasanna0705.netlify.app/",
        "name": "Prasanna Iyappan Portfolio",
        "publisher": {
          "@id": "https://prasanna0705.netlify.app/#person"
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Prasanna Iyappan | Android & Cloud Developer Portfolio" 
        description="I'm Prasanna Iyappan, an AIML student and the lead developer of Snuggle Musix, a beautiful open-source Android music player featuring Material You."
        canonicalUrl="https://prasanna0705.netlify.app/"
        structuredData={structuredData}
      />
      {mode === 'professional' ? (
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
              {pro.home.chips.map((chip: string, i: number) => (
                <span key={i} className={`chip ${i % 2 === 0 ? 'chip-cyan' : 'chip-pink'}`}>
                  {chip}
                </span>
              ))}
            </div>

            <div className="hero-actions">
              <NavLink to="/projects" className="btn-primary">
                View Projects
              </NavLink>
              <NavLink to="/contact" className="btn-outline">
                Contact Me
              </NavLink>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-photo-glow"></div>
            <div className="hero-photo-frame">
              {/* Uses local public image personal.jpg */}
              <img src="/personal.jpg" alt="Prasanna" className="hero-img" />
            </div>
          </div>
        </section>
      ) : (
        <div className="personal">
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
                {per.home.chips.map((c: string, i: number) => (
                  <span key={i} className="chip chip-emerald">{c}</span>
                ))}
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-photo-glow"></div>
              <div className="hero-photo-frame" style={{ background: '#064e3b', borderColor: '#065f46' }}>
                {/* Uses local public image personal.jpg */}
                <img src="/personal.jpg" alt="Casual Prasanna" className="hero-img" />
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
