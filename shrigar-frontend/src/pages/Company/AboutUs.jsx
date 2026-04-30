import React from "react";
import { motion } from "framer-motion";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">

      {/* HERO */}
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>About Shringaar</h1>
        <p>Where tradition meets modern lifestyle</p>
      </motion.section>

      {/* FOUNDER */}
      <section className="about-section">
        <motion.div 
          className="about-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e" alt="Founder" />
        </motion.div>

        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2>Meet Our Founder</h2>
          <p>
            Shringaar was founded with a passion for blending Indian heritage 
            with modern design. Our mission is to create products that are 
            stylish, functional, and meaningful.
          </p>
        </motion.div>
      </section>

      {/* PRODUCT GALLERY */}
      <section className="gallery">
        <h2>Our Collection</h2>

        <div className="gallery-grid">
          {[
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
            "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7"
          ].map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt="product"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="video-section">
        <h2>Our Story in Motion</h2>
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/ysz5S6PUM-U"
            title="Brand Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>

        <div className="testimonial-slider">
          {[
            "Amazing quality and beautiful designs!",
            "Perfect blend of tradition and modern style.",
            "Loved the product and fast delivery!"
          ].map((text, i) => (
            <motion.div 
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              ⭐⭐⭐⭐⭐
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutUs;