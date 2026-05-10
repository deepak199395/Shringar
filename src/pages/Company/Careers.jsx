import React from "react";
import "./Careers.css";

const jobs = [
  {
    title: "Frontend Developer (React)",
    location: "Pune / Remote",
    type: "Full Time",
  },
  {
    title: "Backend Developer (Node.js)",
    location: "Pune",
    type: "Full Time",
  },
  {
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
  },
];

const Careers = () => {
  return (
    <div className="careers-container">

      {/* HERO */}
      <section className="careers-hero">
        <h1>Join Our Team</h1>
        <p>Build something meaningful with Shringaar</p>
      </section>

      {/* WHY JOIN */}
      <section className="careers-section">
        <h2>Why Work With Us</h2>

        <div className="benefits">
          <div className="benefit-card">
            <h3>🚀 Growth</h3>
            <p>Work on real-world impactful projects.</p>
          </div>

          <div className="benefit-card">
            <h3>💻 Flexible Work</h3>
            <p>Remote-friendly and flexible hours.</p>
          </div>

          <div className="benefit-card">
            <h3>🤝 Team Culture</h3>
            <p>Collaborative and supportive environment.</p>
          </div>

          <div className="benefit-card">
            <h3>💰 Competitive Pay</h3>
            <p>We value your skills and compensate fairly.</p>
          </div>
        </div>
      </section>

      {/* JOB LIST */}
      <section className="careers-section">
        <h2>Open Positions</h2>

        <div className="jobs">
          {jobs.map((job, i) => (
            <div className="job-card" key={i}>
              <h3>{job.title}</h3>
              <p>{job.location}</p>
              <p>{job.type}</p>
              <button>Apply Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="careers-cta">
        <h2>Didn’t find your role?</h2>
        <p>Send us your resume anyway — we’re always hiring talent.</p>
        <button>Email Resume</button>
      </section>

    </div>
  );
};

export default Careers;