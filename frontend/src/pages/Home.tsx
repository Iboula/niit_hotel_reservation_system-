import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Hotel Reservation System</h1>
          <p>Find and book your perfect room with ease</p>
          <Link to="/rooms" className="btn btn-primary btn-large">
            Browse Rooms
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🏨</div>
            <h3>Luxury Rooms</h3>
            <p>Choose from a variety of room types to suit your needs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Easy Booking</h3>
            <p>Simple and secure reservation process</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Best Prices</h3>
            <p>Competitive rates for all our rooms</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your data is protected with industry-standard security</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to book your stay?</h2>
          <p>Join thousands of satisfied guests</p>
          <Link to="/register" className="btn btn-secondary btn-large">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
