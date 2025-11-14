import React from "react";
import heroImage from "../assets/hero.png";
import "./HeroSection.css"; // rename your image file to hero.png and place it in /src/assets

const HeroSection = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          Welcome to Advocate AI Bot
        </h1>
        <p className="hero-description">
          Simplify your YouTube legal journey. Get contract explanations,
          content safety checks, invoices, and instant answers.
        </p>
        <a
          href="/contract-explainer"
          className="hero-cta-button"
        >
          Get Started
        </a>
      </div>
      <div className="hero-visual">
        <img
          src={heroImage}
          alt="Hero"

          className="hero-image"

        />
      </div>
    </section>
  );
};

export default HeroSection;