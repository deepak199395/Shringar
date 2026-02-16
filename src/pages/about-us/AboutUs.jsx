import React from "react";
import './AboutUsPage.css';

const AboutUs = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="overlay">
                    <div className="hero-content">
                        <h1>About Us</h1>
                        <p>
                            At <strong> Shringar</strong>, we craft imitation jewellery
                            that radiates elegance and affordability. Our mission is to make
                            every woman feel confident, stylish, and celebrated—without
                            compromise.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-details">
                <div className="about-container">
                    <div className="about-text">
                        <h2>Our Story</h2>
                        <p>
                            Founded with a passion for design and craftsmanship, Gleam Jewels
                            brings together modern trends and timeless traditions. Each piece
                            is thoughtfully created to reflect beauty, durability, and
                            affordability.
                        </p>
                        <p>
                            From festive occasions to everyday wear, our jewellery is designed
                            to complement your lifestyle and make you shine.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src="https://copilot.microsoft.com/th/id/BCO.efc4c914-a98e-4f74-8db0-e0ed9b663a3a.png" alt="Elegant Imitation Jewellery" width="400" height="300" loading="lazy" />
                    </div>
                </div>
            </section>

            <section className="mission-vision">
                <div className="my-container">
                    <div className="mv-block">
                        <h2>Our Mission</h2>
                        <p>
                            To deliver high-quality imitation jewellery that blends elegance
                            with affordability, empowering individuals to express their style
                            without limits.
                        </p>
                    </div>

                    <div className="mv-block">
                        <h2>Our Vision</h2>
                        <p>
                            To become a trusted global brand in imitation jewellery, known for
                            innovation, craftsmanship, and making luxury accessible to all.
                        </p>
                    </div>

                </div>

            </section>
        </div>
    )
}

export default AboutUs;