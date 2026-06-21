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

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('professional');

  const toggleMode = () => {
    const newMode = mode === 'professional' ? 'personal' : 'professional';
    setMode(newMode);
    window.scrollTo(0, 0);
  };

  return (
    <BrowserRouter>
      <div className={`app-container mode-${mode}`}>
        <style>{CSS_STYLES}</style>

        <Navbar mode={mode} toggleMode={toggleMode} />

        <main className="main-wrapper">
          <Routes>
            <Route path="/" element={<Home mode={mode} data={DATA} />} />
            <Route path="/projects" element={<Projects mode={mode} data={DATA} />} />
            <Route path="/skills" element={<Skills mode={mode} data={DATA} />} />
            <Route path="/experience" element={<Experience mode={mode} data={DATA} />} />
            <Route path="/contact" element={<Contact mode={mode} data={DATA} />} />
          </Routes>
        </main>

        <Footer />
        
        {/* AI CHAT WIDGET - Only active in Professional Mode */}
        {mode === 'professional' && <ChatWidget />}
      </div>
    </BrowserRouter>
  );
}