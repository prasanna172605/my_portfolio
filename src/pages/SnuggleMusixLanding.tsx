import { useState, useEffect } from 'react';
import { Download, Github, Smartphone, Layout, Mic, Shield, Sun, Moon, Brain, Ban, Radio, DownloadCloud, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useMediaQuery';
import { SEO } from '../components/SEO';
import './SnuggleMusixLanding.css';

const Header = ({ theme, setTheme }: { theme: 'dark' | 'light', setTheme: (t: 'dark' | 'light') => void }) => {
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`} style={{ padding: scrolled ? '1rem 2rem' : '1.5rem 2rem', position: 'fixed', top: 0, width: '100%', zIndex: 50, transition: 'all 0.3s', backgroundColor: scrolled ? 'var(--surface-soft)' : 'transparent', opacity: scrolled ? 0.95 : 1, backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid var(--hairline)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit', marginRight: '0.5rem' }} aria-label="Back to Portfolio Homepage">
          <ArrowLeft size={20} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Portfolio</span>
        </a>
        <div style={{ width: isMobile ? '32px' : '40px', height: isMobile ? '32px' : '40px', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/snuggle-logo.png" alt="Snuggle Musix Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: isMobile ? '1.1rem' : '1.3rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #FF3366, #FF9933)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Snuggle Musix
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{ background: 'var(--surface-soft)', border: '1px solid var(--hairline)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', cursor: 'pointer' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a
          href="https://github.com/prasanna172605/Snugle-Musix"
          target="_blank"
          rel="noreferrer"
          style={{ background: 'var(--surface-soft)', border: '1px solid var(--hairline)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}
          aria-label="GitHub Repository"
        >
          <Github size={18} />
        </a>
      </div>
    </header>
  );
};

const Hero = ({ downloadUrl, latestVersion }: { downloadUrl: string, latestVersion: string }) => {
  return (
    <header className="snuggle-hero snuggle-container">
      <div className="snuggle-hero-logo">
        <img src="/snuggle-logo.png" alt="Snuggle Musix Logo" />
      </div>
      <h1 className="snuggle-display-xl" style={{ margin: '0 0 0.5rem 0' }}>
        Snuggle Musix
      </h1>
      <p className="snuggle-display-lg" style={{ background: 'linear-gradient(135deg, #FF3366, #FF9933)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700, margin: '0 0 1.5rem 0' }}>
        Music that moves you.<br />Feels personal.
      </p>
      <p className="snuggle-hero-sub snuggle-body-md">
        Snuggle Musix is a free, open-source Android music player with Material 3 design, dynamic themes, synchronized lyrics, lossless audio and more.
      </p>
      <div className="snuggle-hero-ctas">
        <a href={downloadUrl} download target="_top" className="snuggle-btn snuggle-btn-primary" aria-label="Download Snuggle Musix APK">
          <Download size={18} /> Download APK {latestVersion && latestVersion !== 'Latest' ? `(${latestVersion})` : ''}
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
        <div className="snuggle-marquee-group" aria-hidden="true">
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
      <h2 className="snuggle-display-lg" style={{ color: 'var(--ink)', marginBottom: 'var(--space-sm)' }}>Next-Gen Audio Experience</h2>
      <p className="snuggle-body-md" style={{ color: 'var(--muted)', marginBottom: 'var(--space-xxl)' }}>Everything you love about modern music apps, entirely open source and free.</p>
      
      <div className="snuggle-features-grid">
        <div className="snuggle-feature-card snuggle-feature-card-1 snuggle-col-span-2">
          <div className="snuggle-feature-icon"><Layout size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Material You Dynamic Colors</h3>
            <p className="snuggle-body-sm" style={{ color: 'var(--muted)' }}>Adapts dynamically to your album art and wallpaper with fluid Material 3 theming.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-2 snuggle-col-span-2">
          <div className="snuggle-feature-icon"><Mic size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Synchronized Lyrics</h3>
            <p className="snuggle-body-sm" style={{ color: 'var(--muted)' }}>Sing along with real-time synchronized word-by-word lyrics, translation, and romanization.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-3 snuggle-col-span-2 flex-row">
          <div className="snuggle-feature-icon"><Smartphone size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Apple-Inspired & Classic Mini Player</h3>
            <p className="snuggle-body-sm" style={{ color: 'var(--muted)' }}>Switch effortlessly between Apple-inspired UI and classic docked or floating mini player.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-4 snuggle-col-span-2 flex-row">
          <div className="snuggle-feature-icon"><Ban size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">No ads for now and forever</h3>
            <p className="snuggle-body-sm" style={{ color: 'var(--muted)' }}>Enjoy a pristine, uninterrupted listening experience without any advertisements.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-5">
          <div className="snuggle-feature-icon"><Radio size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">High quality streaming</h3>
            <p className="snuggle-body-sm" style={{ color: 'var(--muted)' }}>Stream your favorite music in pristine, high-fidelity audio quality.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-6">
          <div className="snuggle-feature-icon"><DownloadCloud size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Offline Playback</h3>
            <p className="snuggle-body-sm" style={{ color: 'var(--muted)' }}>Download your music to enjoy it anywhere, anytime without an internet connection.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-7 snuggle-col-span-2 flex-row">
          <div className="snuggle-feature-icon" style={{ color: 'var(--ink)' }}><Shield size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Privacy First & Open Source</h3>
            <p className="snuggle-body-sm" style={{ color: 'var(--muted)' }}>Completely free and open source. No tracking, no ads. Your listening history and data stay completely on your device.</p>
          </div>
        </div>
        <div className="snuggle-feature-card snuggle-feature-card-8 snuggle-col-span-2 flex-row">
          <div className="snuggle-feature-icon" style={{ color: 'var(--ink)' }}><Users size={24} /></div>
          <div>
            <h3 className="snuggle-title-md">Listen Together</h3>
            <p className="snuggle-body-sm" style={{ color: 'var(--muted)' }}>Sync your playback with friends in real-time. Listen to the same music together, no matter where you are.</p>
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
            <a href="https://github.com/prasanna172605/Snugle-Musix/blob/main/LICENSE" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem' }}>License</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export function SnuggleMusixLanding() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [latestVersion, setLatestVersion] = useState<string>('Latest');
  const [downloadUrl, setDownloadUrl] = useState<string>('https://github.com/prasanna172605/Snugle-Musix/releases/latest');

  useEffect(() => {
    fetch('https://api.github.com/repos/prasanna172605/Snugle-Musix/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (data && data.tag_name) {
          setLatestVersion(data.tag_name);
          const apkAsset = data.assets?.find((a: any) => a.name?.endsWith('.apk'));
          if (apkAsset?.browser_download_url) {
            setDownloadUrl(apkAsset.browser_download_url);
          } else if (data.html_url) {
            setDownloadUrl(data.html_url);
          }
        }
      })
      .catch(() => {
        setDownloadUrl('https://github.com/prasanna172605/Snugle-Musix/releases/latest');
      });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "MobileApplication"],
    "name": "Snuggle Musix",
    "description": "Snuggle Musix is a free, open-source Android music player with Material 3 design, dynamic themes, synchronized lyrics, lossless audio and more.",
    "operatingSystem": "Android",
    "applicationCategory": "MultimediaApplication",
    "applicationSubCategory": "Music Application",
    "downloadUrl": downloadUrl,
    "softwareVersion": latestVersion,
    "image": "https://prasanna0705.netlify.app/snuggle-logo.png",
    "url": "https://prasanna0705.netlify.app/Snuggle-Musix",
    "mainEntityOfPage": "https://prasanna0705.netlify.app/Snuggle-Musix",
    "author": {
      "@type": "Person",
      "name": "Prasanna Iyappan",
      "url": "https://aberrant-portfolio-2026.web.app/"
    },
    "publisher": {
      "@type": "Person",
      "name": "Prasanna Iyappan"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className={`snuggle-root ${theme === 'light' ? 'light-mode' : ''}`}>
      <SEO 
        title="Snuggle Musix – Free Open-Source Music Player for Android" 
        description="Snuggle Musix is a free, open-source Android music player with Material 3 design, dynamic themes, synchronized lyrics, lossless audio and more."
        canonicalUrl="https://prasanna0705.netlify.app/Snuggle-Musix"
        structuredData={structuredData}
      />
      <Header theme={theme} setTheme={setTheme} />
      <Hero downloadUrl={downloadUrl} latestVersion={latestVersion} />
      <Screenshots />
      <Features />
      <CustomFooter />
    </div>
  );
}

export default SnuggleMusixLanding;
