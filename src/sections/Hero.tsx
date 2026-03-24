import React from 'react';

type HeroData = {
  name: string;
  title: string;
  subtitle?: string;
  image?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  availability?: string;
  stats?: { label: string; value: string }[];
  location?: string;
};

const Hero = ({ data }: { data: HeroData }) => {
  if (!data) return null;

  const stats =
    data.stats && data.stats.length
      ? data.stats
      : [
          { label: 'Experience', value: '3+ yrs' },
          { label: 'Projects', value: '12 shipped' },
          { label: 'Location', value: data.location || 'Bangalore' },
          { label: 'Availability', value: data.availability || 'Freelance' },
        ];

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content" data-aos="fade-right">
        <div className="eyebrow">{data.title}</div>
        <h1>
          {data.name}
          <span className="accent-dot">.</span>
        </h1>
        {data.subtitle && <p className="hero-subtitle">{data.subtitle}</p>}

        <div className="hero-actions">
          <a className="btn-primary" href="#portfolio">
            {data.ctaPrimary || 'View Work'}
          </a>
          <a className="btn-ghost" href="#contact">
            {data.ctaSecondary || 'Let’s Talk'}
          </a>
        </div>

        {stats && (
          <div className="hero-meta">
            {stats.map((s) => (
              <div key={s.label}>
                <span className="meta-label">{s.label}</span>
                <span className="meta-value">{s.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hero-visual" data-aos="fade-left">
        <div className="glow" />
        <div className="hero-card">
          <div className="avatar-ring">
            {data.image ? (
              <img src={`/assets/${data.image}`} alt={`${data.name} portrait`} />
            ) : (
              <div className="avatar-placeholder">{data.name?.[0] || 'L'}</div>
            )}
          </div>
          <p className="hero-card-title">{data.title}</p>
          <p className="hero-card-copy">
            Building clean, performant interfaces with React, TypeScript, and Node.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
