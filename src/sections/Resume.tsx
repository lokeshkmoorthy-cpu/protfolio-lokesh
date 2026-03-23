import React from 'react';

interface ResumeData {
  summary: {
    name: string;
    description: string;
    details: string[];
  };
  education: {
    degree: string;
    year: string;
    institute: string;
  }[];
  experience: {
    role: string;
    year: string;
    company: string;
    points: string[];
  }[];
}

const Resume = ({ data }: { data: ResumeData }) => {
  if (!data) return null;

  return (
    <section id="resume" className="resume section">
      <div className="container section-title">
        <h2>Resume</h2>
      </div>

      <div className="container">
        <div className="row">

          {/* LEFT */}
          <div className="col-lg-6">
            <h3 className="resume-title">Summary</h3>
            <div className="resume-item pb-0">
              <h4>{data.summary.name}</h4>
              <p><em>{data.summary.description}</em></p>
              <ul>
                {data.summary.details.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <h3 className="resume-title">Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} className="resume-item">
                <h4>{edu.degree}</h4>
                <h5>{edu.year}</h5>
                <p><em>{edu.institute}</em></p>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="col-lg-6">
            <h3 className="resume-title">Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="resume-item">
                <h4>{exp.role}</h4>
                <h5>{exp.year}</h5>
                <p><em>{exp.company}</em></p>
                <ul>
                  {exp.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;