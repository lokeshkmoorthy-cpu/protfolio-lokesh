import React, { useState } from 'react';
import AdminPanel, { AdminPanelProps } from '../UI/AdminPanel';

type HeaderProps = {
  name?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
  adminPanel?: AdminPanelProps;
};

const Header: React.FC<HeaderProps> = ({ name = 'Portfolio', socials, adminPanel }) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { name: 'Home', section: 'hero' },
    { name: 'About', section: 'about' },
    { name: 'Resume', section: 'resume' },
    { name: 'Portfolio', section: 'portfolio' },
    { name: 'Contact', section: 'contact' },
  ];

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileNavOpen(false);
  };

  return (
    <header className="modern-header">
      <div className="header-shell">
        <button className="brand" onClick={() => handleNavClick('hero')}>
          <span className="brand-dot" />
          <span className="brand-name">{name}</span>
        </button>

        <nav className={`nav-links ${isMobileNavOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => handleNavClick(link.section)}>
              {link.name}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <div className="social">
            {socials?.twitter && <a href={socials.twitter} aria-label="Twitter"><i className="bi bi-twitter-x" /></a>}
            {socials?.linkedin && <a href={socials.linkedin} aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>}
            {socials?.github && <a href={socials.github} aria-label="GitHub"><i className="bi bi-github" /></a>}
            {socials?.instagram && <a href={socials.instagram} aria-label="Instagram"><i className="bi bi-instagram" /></a>}
          </div>
          <button
            className="nav-toggle d-xl-none"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${isMobileNavOpen ? 'bi-x-lg' : 'bi-list'}`} />
          </button>
        </div>

        {adminPanel && (
          <div className="header-admin">
            <AdminPanel {...adminPanel} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
