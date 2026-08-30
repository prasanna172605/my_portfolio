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
      <h1 className="snuggle-display-xl" style={{ marginBottom: '0.5rem' }}>
        Snuggle Musix
      </h1>
      <p className="snuggle-display-lg" style={{ background: 'linear-gradient(135deg, #FF3366, #FF9933)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700, margin: '0.25rem 0 1.25rem 0' }}>
        Music that moves you. Feels personal.
      </p>
      <p className="snuggle-hero-sub snuggle-body-md">
        Snuggle Musix is a free, open-source Android music player with Material 3 design, dynamic themes, synchronized lyrics, lossless audio and more.
      </p>
      <div className="snuggle-hero-ctas">
        <a href={downloadUrl} download target="_top" className="snuggle-btn snuggle-btn-primary" aria-label="Download Snuggle Musix APK">
          <Download size={18} /> Download APK {latestVersion ? `(${latestVersion})` : ''}
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
    { file: 'Apple Music Style.jpeg', label: 'Player' },
    { file: 'Synchronized Lyrics.jpeg', label: 'Lyrics' },
    { file: 'Dynamic Theming.jpeg', label: 'Theme' },
    { file: 'Mood Playlists.jpeg', label: 'Moods' },
    { file: 'Speed Dial.jpeg', label: 'Speed Dial' },
    { file: 'Voice Search.jpeg', label: 'Voice Search' },
    { file: 'Equalizer.jpeg', label: 'Equalizer' }
  ];

  return (
    <section className="snuggle-screenshots snuggle-container">
      <div className="snuggle-section-header">
        <h2 className="snuggle-display-md">Crafted with Precision</h2>
        <p className="snuggle-body-md" style={{ color: 'var(--text-secondary)' }}>
          Every detail thoughtfully designed with Material 3 and Liquid Glass aesthetics.
        </p>
      </div>
      <div className="snuggle-gallery">
        {screenshots.map((s, i) => (
          <div key={i} className="snuggle-phone-frame">
            <img src={`/screenshots/${s.file}`} alt={`Snuggle Musix - ${s.label}`} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

const Features = () => {
  const feats = [
    { icon: <Layout />, title: "Material 3 Design", desc: "Dynamic color extraction tailored seamlessly with your album art and wallpaper." },
    { icon: <Mic />, title: "Synchronized Lyrics", desc: "Sing along with precision, zero-latency real-time synchronized lyrics." },
    { icon: <Brain />, title: "AI Powered Search", desc: "Find your music instantly with natural voice command search." },
    { icon: <Ban />, title: "100% Ad-Free", desc: "Zero telemetry, no interruptions. Pure music enjoyment for everyone." },
    { icon: <Radio />, title: "Lossless Audio", desc: "Experience pristine studio sound with an integrated graphic equalizer." },
    { icon: <DownloadCloud />, title: "Offline Playback", desc: "Download tracks and albums locally for listening anywhere, anytime." },
    { icon: <Users />, title: "Listen Together", desc: "Synchronize audio playback seamlessly across multiple friends' devices." },
    { icon: <Shield />, title: "Open Source", desc: "Built transparently on Android Media3 with full community trust." }
  ];

  return (
    <section className="snuggle-features snuggle-container">
      <div className="snuggle-section-header">
        <h2 className="snuggle-display-md">Next-Gen Audio Experience</h2>
        <p className="snuggle-body-md" style={{ color: 'var(--text-secondary)' }}>
          Everything you love about modern music apps, entirely open source and free.
        </p>
      </div>
      <div className="snuggle-grid">
        {feats.map((f, i) => (
          <div key={i} className="snuggle-card">
            <div className="snuggle-card-icon">{f.icon}</div>
            <h3 className="snuggle-headline">{f.title}</h3>
            <p className="snuggle-body-md">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const CustomFooter = () => {
  return (
    <footer className="snuggle-footer snuggle-container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <p className="snuggle-body-md" style={{ color: 'var(--text-tertiary)' }}>
          Built with passion by <a href="https://aberrant-portfolio-2026.web.app/" target="_blank" rel="noreferrer" style={{ color: '#FF3366', textDecoration: 'none', fontWeight: 600 }}>Prasanna Iyappan</a>.
        </p>
        <p className="snuggle-body-md" style={{ color: 'var(--text-tertiary)' }}>
          <a href="/" style={{ color: 'inherit', textDecoration: 'underline' }}>Portfolio</a> • <a href="https://github.com/prasanna172605/Snugle-Musix" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>GitHub Repository</a>
        </p>
        <p className="snuggle-body-md" style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} Snuggle Musix. Free & Open Source.
        </p>
      </div>
    </footer>
  );
};

export function SnuggleMusixLanding() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [downloadUrl, setDownloadUrl] = useState('https://github.com/prasanna172605/Snugle-Musix/releases/latest');
  const [latestVersion, setLatestVersion] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/repos/prasanna172605/Snugle-Musix/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (data.tag_name) setLatestVersion(data.tag_name);
        const apk = data.assets?.find((a: any) => a.name.endsWith('.apk'));
        if (apk?.browser_download_url) {
          setDownloadUrl(apk.browser_download_url);
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
    <div className={`snuggle-root ${theme === "light" ? "light-mode" : ""}`}>
      <SEO 
        title="Snuggle Musix – Free Open-Source Music Player for Android" 
        description="Snuggle Musix is a free, open-source Android music player with Material 3 design, dynamic themes, synchronized lyrics, lossless audio and more."
        canonicalUrl="https://prasanna0705.netlify.app/Snuggle-Musix"
        ogType="website"
        ogImage="https://prasanna0705.netlify.app/snuggle-logo.png"
        structuredData={structuredData}
      />
      <Header theme={theme} setTheme={setTheme} />
      <Hero downloadUrl={downloadUrl} latestVersion={latestVersion} />
      <Features />
      <Screenshots />
      <CustomFooter />
    </div>
  );
}

export default SnuggleMusixLanding;
