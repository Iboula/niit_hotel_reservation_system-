import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>★ Hotel Liberty</h3>
          <p>
            Experience luxury and comfort at Hotel Liberty. We provide world-class
            hospitality services to make your stay unforgettable.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/rooms">Rooms</a></li>
            <li><a href="/reservations">Reservations</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><a href="#">24/7 Room Service</a></li>
            <li><a href="#">Free WiFi</a></li>
            <li><a href="#">Swimming Pool</a></li>
            <li><a href="#">Spa & Wellness</a></li>
            <li><a href="#">Restaurant & Bar</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <span>📍</span>
              <span>Almadies, Route de Ngor, Dakar, Sénégal</span>
            </div>
            <div className="contact-item">
              <span>📞</span>
              <span>+221 33 820 10 00</span>
            </div>
            <div className="contact-item">
              <span>✉️</span>
              <span>contact@hotelliberty.sn</span>
            </div>
            <div className="contact-item">
              <span>🕐</span>
              <span>Disponible 24h/24 7j/7</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hotel Liberty. All rights reserved. | Designed with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
