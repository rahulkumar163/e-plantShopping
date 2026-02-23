import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-header">
        <h1>🌿 About e-plantShopping</h1>
        <p className="tagline">Your Ultimate Online Plant Shopping Destination</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            e-plantShopping was founded with a simple mission: to make quality plants and gardening products accessible to everyone. We started as a passion project and have grown into a thriving online destination for plant lovers around the world.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are committed to providing premium quality plants, seeds, and gardening supplies while promoting sustainable and eco-friendly practices. We believe that plants transform spaces and improve lives, and we're here to help you discover that magic in your own home.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <ul className="offerings">
            <li>🌱 Fresh, healthy houseplants and outdoor plants</li>
            <li>🪴 Premium gardening tools and supplies</li>
            <li>🌍 Eco-friendly and sustainable products</li>
            <li>📚 Expert advice and gardening tips</li>
            <li>🚚 Fast and reliable delivery</li>
            <li>💚 Customer support dedicated to your satisfaction</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Why Choose e-plantShopping?</h2>
          <div className="reasons">
            <div className="reason-card">
              <h3>🏆 Quality Guaranteed</h3>
              <p>All our plants are carefully selected and checked for health before delivery.</p>
            </div>
            <div className="reason-card">
              <h3>💰 Competitive Prices</h3>
              <p>We offer the best prices without compromising on quality.</p>
            </div>
            <div className="reason-card">
              <h3>📱 Easy Shopping</h3>
              <p>User-friendly interface makes shopping for plants simple and enjoyable.</p>
            </div>
            <div className="reason-card">
              <h3>🌍 Sustainability</h3>
              <p>We're committed to eco-friendly practices in everything we do.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where every home and office is filled with beautiful, thriving plants. We're not just selling plants; we're fostering a community of plant enthusiasts dedicated to sustainable living and natural beauty.
          </p>
        </section>

        <section className="about-section contact-section">
          <h2>Get in Touch</h2>
          <div className="contact-info">
            <p><strong>Email:</strong> info@e-plantshopping.com</p>
            <p><strong>Phone:</strong> 1-800-PLANTS-1</p>
            <p><strong>Address:</strong> 123 Green Street, Garden City, GC 12345</p>
            <p><strong>Hours:</strong> Monday - Sunday, 9:00 AM - 6:00 PM</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
