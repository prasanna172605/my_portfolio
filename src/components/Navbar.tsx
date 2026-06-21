import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, Leaf, Menu, X } from 'lucide-react';
import type { ThemeMode } from '../data';

interface NavbarProps {
  mode: ThemeMode;
  toggleMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ mode, toggleMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        </div>
      )}
    </>
  );
};
