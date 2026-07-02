import { useState, useEffect } from 'react';
import { Download, Github, Smartphone, Layout, Mic, Shield, Layers, Zap, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useMediaQuery';
import { SEO } from '../components/SEO';
import './SnuggleMusixLanding.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/50 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'
    }`} style={{ padding: scrolled ? '1rem 2rem' : '1.5rem 2rem', position: 'fixed', top: 0, width: '100%', zIndex: 50, transition: 'all 0.3s', backgroundColor: scrolled ? 'rgba(9,9,11,0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
          <img src="/snuggle-logo.png" alt="Snuggle Musix" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span className="snuggle-display-font" style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>Snuggle Musix</span>
      </div>
      <nav style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', alignItems: 'center' }}>
        {!isMobile && (
          <>
            <a href="https://github.com/prasanna172605/Snugle-Musix" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}><Github size={18} /></a>
          </>
        )}
        <Link to="/" style={{ padding: '0.5rem 1.25rem', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>Back{isMobile ? '' : ' to Portfolio'}</Link>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <header className="snuggle-hero snuggle-container">
      <div className="snuggle-hero-logo">
        <img src="/snuggle-logo.png" alt="Snuggle Musix Logo" />
      </div>
      <h1 className="snuggle-display-xl">
        Music that moves you.<br />
        <span className="snuggle-display-lg" style={{ background: 'linear-gradient(135deg, #FF3366, #FF9933)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Feels personal.
        </span>
      </h1>
      <p className="snuggle-hero-sub snuggle-body-md">
        A premium, open-source Android music player built with Material 3. Experience lossless audio, dynamic themes, and synchronized lyrics in a beautiful package.
      </p>
      <div className="snuggle-hero-ctas">
        <a href="https://github.com/prasanna172605/Snugle-Musix/releases/download/v5.2.26/SnuggleMusix-5.2.26-Universal.apk" download className="snuggle-btn snuggle-btn-primary" aria-label="Download Snuggle Musix APK">
          <Download size={18} /> Download APK
        </a>
        <a href="https://github.com/prasanna172605/Snugle-Musix" target="_blank" rel="noreferrer" className="snuggle-btn snuggle-btn-secondary" aria-label="View Snuggle Musix Source Code on GitHub">
          <Github size={18} /> View Source
        </a>
      </div>
    </header>
  );
};

const Screenshots = () => {
  const screenshots = [
    { file: 'Homepage.jpeg', label: 'Home' },
    { file: 'Search and Explore.jpeg', label: 'Search' },
    { file: 'Music Player.jpeg', label: 'Now Playing' },
    { file: 'Synchronized lyrics.jpeg', label: 'Lyrics' },
    { file: 'Song recognition.jpeg', label: 'Recognition' },
    { file: 'Playlist & library.jpeg', label: 'Library' }
  ];

  return (
    <section className="snuggle-screenshots">
      <div className="snuggle-container snuggle-screenshots-header">
        <p className="snuggle-caption-uppercase" style={{ color: 'var(--muted)', marginBottom: 'var(--space-sm)' }}>SEE IT IN ACTION</p>
        <h2 className="snuggle-display-md" style={{ color: 'var(--ink)' }}>Built for the way you listen</h2>
      </div>
      <div className="snuggle-scroll-strip-wrapper">
        <div className="snuggle-marquee-group">
          {screenshots.map((s, i) => (
            <div key={`m1-${i}`} className="snuggle-phone-mockup-wrapper">
              <img src={`/screenshots/${s.file}`} alt={`Snuggle Musix ${s.label} interface screenshot`} className="snuggle-phone-mockup" loading="lazy" />
              <p className="snuggle-caption" style={{ color: 'var(--muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="snuggle-marquee-group">
          {screenshots.map((s, i) => (
            <div key={`m2-${i}`} className="snuggle-phone-mockup-wrapper">
              <img src={`/screenshots/${s.file}`} alt={`Snuggle Musix ${s.label} interface screenshot`} className="snuggle-phone-mockup" loading="lazy" />
              <p className="snuggle-caption" style={{ color: 'var(--muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="snuggle-features snuggle-container">
      <div style={{ marginBottom: 'var(--space-xxl)' }}>
        <p className="snuggle-caption-uppercase" style={{ color: 'var(--muted)', marginBottom: 'var(--space-sm)' }}>WHY SNUGGLE</p>
        <h2 className="snuggle-display-md" style={{ color: 'var(--ink)', marginBottom: 'var(--space-sm)' }}>Crafted for perfection</h2>
        <p className="snuggle-body-md" style={{ color: 'var(--muted)', maxWidth: '540px', margin: '0 auto' }}>
          Every detail in Snuggle Musix has been meticulously designed to provide the ultimate listening experience.
        </p>
      </div>
      <div className="snuggle-features-grid">
        <div className="snuggle-feature-card snuggle-feature-card-1 snuggle-col-span-2 flex-row">
          <div className="snuggle-feature-icon"><Layout size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Material 3 Design</h3>
            <p className="snuggle-body-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Built from the ground up with Google's latest Material You design language for a truly native feel.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-2">
          <div className="snuggle-feature-icon"><Layers size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Dynamic Themes</h3>
            <p className="snuggle-body-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>The app adapts its colors to match your current playing album art or your system wallpaper.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-3">
          <div className="snuggle-feature-icon"><FileText size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Beautiful Lyrics</h3>
            <p className="snuggle-body-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Synchronized lyrics with AI translation capabilities, karaoke mode, and offline lyric support.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-4">
          <div className="snuggle-feature-icon"><Mic size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Voice Search</h3>
            <p className="snuggle-body-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Find your favorite songs hands-free using our integrated intelligent voice search capabilities.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-5">
          <div className="snuggle-feature-icon"><Zap size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Lossless Ready</h3>
            <p className="snuggle-body-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>High-fidelity audio playback support ensuring you hear every detail of your favorite tracks.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-6 snuggle-col-span-3 flex-row">
          <div className="snuggle-feature-icon"><Shield size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Privacy First & Open Source</h3>
            <p className="snuggle-body-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Completely free and open source. No tracking, no ads. Your listening history and data stay completely on your device.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CustomFooter = () => {
  const isMobile = useIsMobile();
  return (
    <footer style={{ borderTop: '1px solid var(--hairline)', padding: '4rem 0', backgroundColor: 'var(--surface-soft)', marginTop: '4rem' }}>
      <div className="snuggle-container" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: '3rem' }}>
        <div>
          <div className="snuggle-display-font" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF3366, #FF9933)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smartphone size={16} color="white" />
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Snuggle Musix</span>
          </div>
          <p className="snuggle-body-sm" style={{ color: 'var(--muted)', maxWidth: '300px', lineHeight: 1.6 }}>
            Developed by Abberant. An open-source, premium music player for Android.
          </p>
        </div>
        <div style={{ display: 'flex', gap: isMobile ? '2rem' : '4rem', flexDirection: isMobile ? 'column' : 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>Project</span>
            <a href="https://github.com/prasanna172605/Snugle-Musix" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>GitHub Repository</a>
            <a href="https://github.com/prasanna172605/Snugle-Musix/releases" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Releases</a>
            <a href="https://github.com/prasanna172605/Snugle-Musix/issues" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Issue Tracker</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>Legal</span>
            <a href="https://github.com/prasanna172605/Snugle-Musix#privacy" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Licenses</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export function SnuggleMusixLanding() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "MobileApplication"],
    "name": "Snuggle Musix",
    "description": "A beautiful, open-source Android music player featuring Material You, Voice Search, Listen Together, Dynamic Themes and Offline Playback.",
    "operatingSystem": "Android",
    "applicationCategory": "MultimediaApplication",
    "applicationSubCategory": "Music Application",
    "downloadUrl": "https://github.com/prasanna172605/Snugle-Musix/releases",
    "softwareVersion": "5.2.26",
    "image": "https://prasanna0705.netlify.app/snuggle-logo.png",
    "logo": "https://prasanna0705.netlify.app/snuggle-logo.png",
    "author": {
      "@type": "Person",
      "name": "Prasanna Iyappan",
      "url": "https://prasanna0705.netlify.app/"
    },
    "publisher": {
      "@type": "Person",
      "name": "Prasanna Iyappan"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://prasanna0705.netlify.app/Snuggle-Musix"
    },
    "url": "https://prasanna0705.netlify.app/Snuggle-Musix"
  };

  return (
    <div className="snuggle-root">
      <SEO 
        title="Snuggle Musix – Modern Material You Music Player for Android" 
        description="Snuggle Musix is a beautiful open-source Android music player featuring Material You, Apple Music inspired player, Voice Search, Listen Together, Dynamic Themes and Offline Playback."
        canonicalUrl="https://prasanna0705.netlify.app/Snuggle-Musix"
        structuredData={structuredData}
      />
      <Header />
      <Hero />
      <Features />
      <Screenshots />
      <CustomFooter />
    </div>
  );
}
