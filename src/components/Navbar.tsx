import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, Leaf, Menu, X } from 'lucide-react';
import type { ThemeMode } from '../data';
import { useIsMobile } from '../hooks/useMediaQuery';

interface NavbarProps {
  mode: ThemeMode;
  toggleMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ mode, toggleMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = mode === 'professional'
    ? [
        { label: 'home', path: '/' },
        { label: 'projects', path: '/projects' },
        { label: 'skills', path: '/skills' },
        { label: 'experience', path: '/experience' },
        { label: 'contact', path: '/contact' }
      ]
    : [
        { label: 'home', path: '/' },
        { label: 'hobbies', path: '/skills' }, // Map hobbies to skills page
        { label: 'works', path: '/projects' }  // Map works to projects page
      ];

  return (
    <>
      <header className={`site-header ${mode === 'personal' ? 'personal-mode' : ''}`}>
        <div className="logo">
          {mode === 'professional' ? <Terminal size={20} className="text-sky-400" /> : <Leaf size={20} className="text-emerald-400" />}
          <span>Prasanna{mode === 'professional' ? '.dev' : '.me'}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Snuggle Musix Link */}
        {!isMobile && (
          <div>
            <NavLink
              to="/Snuggle-Musix"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium hover:scale-105 transition-transform text-sm no-underline"
              style={{ backgroundImage: 'linear-gradient(135deg, #FF3366, #FF9933)', color: 'white', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
            >
              Snuggle Musix
            </NavLink>
          </div>
        )}

        {/* Controls */}
        <div className="header-controls">
          <button onClick={toggleMode} className="mode-toggle">
            {mode === 'professional' ? 'Switch to Personal' : 'Switch to Pro'}
          </button>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-overlay">
          <button className="mobile-close" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/Snuggle-Musix"
            onClick={() => setIsMenuOpen(false)}
            className="mobile-nav-item"
            style={{ backgroundImage: 'linear-gradient(135deg, #FF3366, #FF9933)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Snuggle Musix
          </NavLink>
        </div>
      )}
    </>
  );
};
