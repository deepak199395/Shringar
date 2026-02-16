import React from "react";
import AboutUs from "./AboutUs";
import './AboutUsPage.css';
import Layout from "../../components/layout/Layout";

const AboutUsPage = () => {
    return (
        <Layout>
            <div className="about-container">
                {/* <h1>About us</h1> */}
                <AboutUs />
            </div>
        </Layout>
    )
}

export default AboutUsPage;