import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Smartphone, Layout, Mic, Shield, Layers, Zap, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

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
    }`} style={{ padding: scrolled ? '1rem 2rem' : '1.5rem 2rem', position: 'fixed', top: 0, width: '100%', zIndex: 50, transition: 'all 0.3s', backgroundColor: scrolled ? 'rgba(0,0,0,0.7)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
          <img src="/snuggle-logo.png" alt="Snuggle Musix" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>Snuggle Musix</span>
      </div>
      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <a href="#features" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Features</a>
        <a href="#screenshots" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Screenshots</a>
        <a href="#why" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Why Snuggle?</a>
        <a href="https://github.com/prasanna172605/Snugle-Musix" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}><Github size={18} /></a>
        <Link to="/" style={{ padding: '0.5rem 1.25rem', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>Back to Portfolio</Link>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(255,51,102,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(255,153,51,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)' }}></div>
      
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <motion.div initial="initial" animate="animate" variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div variants={fadeIn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', width: 'fit-content' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF3366', display: 'inline-block' }}></span>
            <span style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Version 5.2.24</span>
          </motion.div>
          <motion.h1 variants={fadeIn} style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', margin: 0 }}>
            Music that <br />
            <span style={{ background: 'linear-gradient(135deg, #FF3366, #FF9933)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>feels personal.</span>
          </motion.h1>
          <motion.p variants={fadeIn} style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '500px', margin: 0 }}>
            A premium, open-source Android music player built with Material 3. Experience lossless audio, dynamic themes, and synchronized lyrics in a beautiful package.
          </motion.p>
          <motion.div variants={fadeIn} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="https://github.com/prasanna172605/Snugle-Musix/releases/latest/download/app-foss-debug.apk" style={{ padding: '1rem 2rem', borderRadius: '100px', background: 'linear-gradient(135deg, #FF3366, #FF9933)', color: 'white', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 30px -10px rgba(255,51,102,0.5)', transition: 'transform 0.2s', border: 'none' }}>
              <Download size={20} />
              Download APK
            </a>
            <a href="https://github.com/prasanna172605/Snugle-Musix" target="_blank" rel="noreferrer" style={{ padding: '1rem 2rem', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', transition: 'background-color 0.2s' }}>
              <Github size={20} />
              View Source
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Abstract representation of the app mockup since we don't have the actual assets path mapped yet */}
          <div style={{ width: '300px', height: '600px', borderRadius: '40px', background: '#111', border: '8px solid #222', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(135deg, rgba(255,51,102,0.4), rgba(255,153,51,0.2))', filter: 'blur(20px)' }}></div>
            <div style={{ position: 'absolute', bottom: '10%', left: '10%', right: '10%', height: '80px', borderRadius: '20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}></div>
            <div style={{ position: 'absolute', top: '20%', left: '10%', right: '10%', height: '250px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}></div>
            <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '25px', borderRadius: '20px', background: '#000' }}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) => {
  return (
    <motion.div whileHover={{ y: -5 }} style={{ padding: '2rem', borderRadius: '24px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem', backdropFilter: 'blur(10px)' }}>
      <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
        <Icon size={24} />
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>{title}</h3>
      <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0, fontSize: '0.95rem' }}>{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    { icon: Layout, title: "Material 3 Design", description: "Built from the ground up with Google's latest Material You design language for a truly native feel.", color: "#4285F4" },
    { icon: Layers, title: "Dynamic Themes", description: "The app adapts its colors to match your current playing album art or your system wallpaper.", color: "#EA4335" },
    { icon: FileText, title: "Beautiful Lyrics", description: "Synchronized lyrics with AI translation capabilities, karaoke mode, and offline lyric support.", color: "#FBBC05" },
    { icon: Mic, title: "Voice Search", description: "Find your favorite songs hands-free using our integrated intelligent voice search capabilities.", color: "#34A853" },
    { icon: Zap, title: "Lossless Ready", description: "High-fidelity audio playback support ensuring you hear every detail of your favorite tracks.", color: "#8E24AA" },
    { icon: Shield, title: "Privacy First", description: "Open source and tracker-free. Your listening history and data stay completely on your device.", color: "#00ACC1" },
  ];

  return (
    <section id="features" style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Crafted for perfection.</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Every detail in Snuggle Musix has been meticulously designed to provide the ultimate listening experience.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
};

const Screenshots = () => {
  return (
    <section id="screenshots" style={{ padding: '4rem 0', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Beautiful Interfaces.</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Designed following Material 3 principles with an emphasis on fluid animations and dynamic colors.</p>
      </div>
      <div style={{ display: 'flex', gap: '2rem', padding: '1rem 2rem', overflowX: 'auto', snapType: 'x mandatory' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ minWidth: '300px', height: '600px', borderRadius: '24px', backgroundColor: '#111', border: '4px solid #333', flexShrink: 0, scrollSnapAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#555' }}>Screenshot {i}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const WhySnuggle = () => {
  const reasons = [
    { title: "Completely Free & Open Source", description: "No hidden costs, no premium tiers. Inspect the code on GitHub and see exactly how it works." },
    { title: "No Advertisements or Tracking", description: "Your listening habits are your own. We don't track what you play, and we will never serve you ads." },
    { title: "Optimized & Lightweight", description: "Built with modern Android architectures to ensure smooth performance even on older devices." }
  ];

  return (
    <section id="why" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Why Snuggle Musix?</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {reasons.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ padding: '2rem', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>{r.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '1.05rem', lineHeight: 1.6 }}>{r.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const DownloadSection = () => {
  return (
    <section id="download" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ borderRadius: '32px', background: 'linear-gradient(135deg, rgba(255,51,102,0.1), rgba(255,153,51,0.1))', border: '1px solid rgba(255,255,255,0.1)', padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Cg%3E%3C/svg%3E")', opacity: 0.5 }}></div>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: 0 }}>Ready to upgrade?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '500px', margin: 0 }}>Download the latest version of Snuggle Musix and transform your music listening experience today.</p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Latest Release</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>v5.2.24</span>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Requirements</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Android 8.0+</span>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Size</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>24.5 MB</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="https://github.com/prasanna172605/Snugle-Musix/releases/latest/download/app-foss-debug.apk" style={{ padding: '1rem 2rem', borderRadius: '100px', background: 'white', color: 'black', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s', border: 'none' }}>
              <Download size={20} />
              Download APK
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const CustomFooter = () => {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 2rem', backgroundColor: '#050505', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF3366, #FF9933)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smartphone size={16} color="white" />
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Snuggle Musix</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', maxWidth: '300px', lineHeight: 1.6 }}>
            Developed by Abberant. An open-source, premium music player for Android.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>Project</span>
            <a href="https://github.com/prasanna172605/Snugle-Musix" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem' }}>GitHub Repository</a>
            <a href="https://github.com/prasanna172605/Snugle-Musix/releases" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem' }}>Releases</a>
            <a href="https://github.com/prasanna172605/Snugle-Musix/issues" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem' }}>Issue Tracker</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>Legal</span>
            <a href="https://github.com/prasanna172605/Snugle-Musix#privacy" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem' }}>Licenses</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export function SnuggleMusixLanding() {
  return (
    <div style={{ background: '#09090b', color: '#ffffff', minHeight: '100vh', fontFamily: '"Inter", sans-serif', overflowX: 'hidden' }}>
      <Header />
      <Hero />
      <Features />
      <Screenshots />
      <WhySnuggle />
      <DownloadSection />
      <CustomFooter />
    </div>
  );
}
