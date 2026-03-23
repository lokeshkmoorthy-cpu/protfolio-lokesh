import React, { useState } from 'react';

type ContactData = {
  address?: string;
  email?: string;
  phone?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
};

const Contact: React.FC<{ data: ContactData }> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Message sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert("❌ Failed to send message");
      }

    } catch (error) {
      console.error(error);
      alert("⚠️ Server error");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">

          {/* LEFT SIDE */}
          <div className="col-lg-5">
            <div className="info-wrap contact-card">
              <div className="info-item d-flex">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>{data.address || 'Your Location'}</p>
                </div>
              </div>

              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(data.address || 'India')}&output=embed`}
                style={{ border: 0, width: '100%', height: '270px' }}
                loading="lazy"
              ></iframe>

              <div className="info-item d-flex" style={{ marginTop: 16 }}>
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email</h3>
                  <p>{data.email || 'email@example.com'}</p>
                </div>
              </div>

              <div className="info-item d-flex">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Phone</h3>
                  <p>{data.phone || '+00 000 000'}</p>
                </div>
              </div>

              {data.socials && (
                <div className="header-actions" style={{ marginTop: 8 }}>
                  <div className="social">
                    {data.socials.twitter && (
                      <a href={data.socials.twitter} aria-label="Twitter">
                        <i className="bi bi-twitter-x" />
                      </a>
                    )}
                    {data.socials.github && (
                      <a href={data.socials.github} aria-label="GitHub">
                        <i className="bi bi-github" />
                      </a>
                    )}
                    {data.socials.linkedin && (
                      <a href={data.socials.linkedin} aria-label="LinkedIn">
                        <i className="bi bi-linkedin" />
                      </a>
                    )}
                    {data.socials.instagram && (
                      <a href={data.socials.instagram} aria-label="Instagram">
                        <i className="bi bi-instagram" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="php-email-form contact-card">
              <div className="row gy-4">

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    value={formData.name}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={formData.email}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                {/* SUBJECT (NEW) */}
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    rows={6}
                    placeholder="Message"
                    value={formData.message}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>

              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
