import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>🌿 About Paradise Nursery</h1>
        <p className="tagline">Bringing Nature Home Since 2010</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Paradise Nursery was founded with a simple mission: to make quality plants and gardening products accessible to everyone. What started as a small local store in 2010 has grown into a thriving online and offline destination for plant lovers.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are committed to providing premium quality plants, seeds, and gardening supplies while promoting sustainable and eco-friendly practices. We believe that plants transform spaces and improve lives, and we're here to help you discover that magic.
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
          <h2>Why Choose Us?</h2>
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
            <p><strong>Email:</strong> info@paradisenursery.com</p>
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
