import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to CarRental</h1>
          <p>Find the perfect car for your journey. Rent with ease and drive with confidence.</p>
          <div className="hero-buttons">
            <Link to="/cars" className="btn btn-primary">
              Browse Cars
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="car-animation">🚗</div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔑</div>
            <h3>Easy Booking</h3>
            <p>Book your car in minutes with our simple and intuitive booking process.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Get the best rates with our competitive pricing and transparent fees.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Safe & Reliable</h3>
            <p>All our cars are well-maintained and regularly inspected for your safety.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>24/7 Support</h3>
            <p>Our customer support team is available round the clock to help you.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of satisfied customers who trust us for their car rental needs.</p>
        <Link to="/cars" className="btn btn-primary">
          Start Renting Now
        </Link>
      </div>
    </div>
  );
};

export default Home;