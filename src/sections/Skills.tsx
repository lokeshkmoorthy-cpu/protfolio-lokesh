import React from 'react';

interface SkillItem {
  name: string;
  level: number;
}

const Skills: React.FC<{ data: SkillItem[] }> = ({ data }) => {
  const top = data?.slice(0, 6) || [];

  return (
    <section id="skills" className="skills section">
      <div className="section-title" data-aos="fade-up">
        <div className="framed-title">Skills</div>
        <p className="section-subtext">
          Tools and technologies I’m using right now to ship clean, performant products.
        </p>
      </div>

      <div className="container skills-grid" data-aos="fade-up" data-aos-delay="80">
        {top.map((skill) => (
          <div key={skill.name} className="skill-card">
            <span>{skill.name}</span>
            <div className="skill-bar">
              <span style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
