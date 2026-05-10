import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);

    // 👉 Later connect backend API here
    alert("Message sent successfully!");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">

      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you</p>
      </section>

      {/* MAIN SECTION */}
      <div className="contact-content">

        {/* LEFT - FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>

        {/* RIGHT - INFO */}
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <p><strong>Email:</strong> support@shrigaar.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> Pune, Maharashtra, India</p>

          {/* MAP */}
          <div className="map">
            <iframe
              src="https://maps.google.com/maps?q=pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
              title="map"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;