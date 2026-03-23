import React from "react";

interface UserInfo {
  birthday: string;
  website: string;
  phone: string;
  city: string;
  age: number;
  degree: string;
  email: string;
  freelance: string;
}

interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  info: UserInfo;
}



const About = ({ data }: { data: AboutData }) => {
  if (!data) return null;
  console.log("aBOUT INFO",data)

  const { title, subtitle, description, image, info } = data;
  const displayImage = image ? `/assets/${image}` : '/assets/hero.png';

  return (
    <section id="about" className="about section">
      <div className="section-title" data-aos="fade-up">
        <div className="framed-title">{title}</div>
        <p className="section-subtext">{description}</p>
      </div>

      <div className="container about-grid" data-aos="fade-up" data-aos-delay="60">
        <div className="about-card">
          <h3>{subtitle}</h3>
          <p>{description}</p>
          <div className="about-meta">
            <p><strong>Location:</strong> {info.city}</p>
            <p><strong>Freelance:</strong> {info.freelance}</p>
            <p><strong>Website:</strong> {info.website}</p>
          </div>
        </div>

        <div className="about-card">
          <img
            src={displayImage}
            className="img-fluid"
            alt="Profile"
            style={{ borderRadius: '12px', width: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="about-card">
          <h3>Quick Facts</h3>
          <ul className="about-list">
            <li><strong>Birthday:</strong> {info.birthday}</li>
            <li><strong>Phone:</strong> {info.phone}</li>
            <li><strong>Email:</strong> {info.email}</li>
            <li><strong>Degree:</strong> {info.degree}</li>
            <li><strong>Age:</strong> {info.age}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
