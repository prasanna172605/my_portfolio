import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DATA, CSS_STYLES } from './data';
import type { ThemeMode } from './data';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Experience } from './pages/Experience';
import { Contact } from './pages/Contact';
import { ChatWidget } from './components/ChatWidget';
import { SnuggleMusixLanding } from './pages/SnuggleMusixLanding';
import { useLocation } from 'react-router-dom';

function PortfolioLayout({ mode, toggleMode, children }: { mode: ThemeMode, toggleMode: () => void, children: React.ReactNode }) {
  return (
    <>
      <Navbar mode={mode} toggleMode={toggleMode} />
      <main className="main-wrapper">
        {children}
      </main>
      <Footer />
      {mode === 'professional' && <ChatWidget />}
    </>
  );
}

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('professional');

  const toggleMode = () => {
    const newMode = mode === 'professional' ? 'personal' : 'professional';
    setMode(newMode);
    window.scrollTo(0, 0);
  };

  return (
    <BrowserRouter>
      <AppContent mode={mode} toggleMode={toggleMode} />
    </BrowserRouter>
  );
}

function AppContent({ mode, toggleMode }: { mode: ThemeMode, toggleMode: () => void }) {
  const location = useLocation();
  const isSnuggle = location.pathname.startsWith('/Snuggle-Musix');

  return (
    <div className={`app-container ${!isSnuggle ? `mode-${mode}` : ''}`}>
      <style>{CSS_STYLES}</style>
      <Routes>
        <Route path="/Snuggle-Musix" element={<SnuggleMusixLanding />} />
        
        <Route path="/*" element={
          <PortfolioLayout mode={mode} toggleMode={toggleMode}>
            <Routes>
              <Route path="/" element={<Home mode={mode} data={DATA} />} />
              <Route path="/projects" element={<Projects mode={mode} data={DATA} />} />
              <Route path="/skills" element={<Skills mode={mode} data={DATA} />} />
              <Route path="/experience" element={<Experience mode={mode} data={DATA} />} />
              <Route path="/contact" element={<Contact mode={mode} data={DATA} />} />
            </Routes>
          </PortfolioLayout>
        } />
      </Routes>
    </div>
  );
}