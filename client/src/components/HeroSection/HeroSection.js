import React from 'react';
import HeroImage from "../../assets/piano-8413277_1280.jpg";

const HeroSection = () => {
    return (
        <div className="hero-container">
            <img src={HeroImage} alt="Music School" className="hero-image" />
            <div className="hero-content">
                <h1>Music Art Incubator</h1>
            </div>
        </div>
    );
};

export default HeroSection;
