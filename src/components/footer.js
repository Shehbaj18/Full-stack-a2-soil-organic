import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>SOIL Organics</h2>
          <p>We focus on bringing premium organic fresh food to the community!</p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Shop">Shop</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Specials">Specials</Link></li>
            <li><Link to="/Seminars">Seminars</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <ul>
            <li>Email: support@soilorganic.com</li>
            <li>Phone: 123-456-7890</li>
            <li>Address: 123 High St, Preston VIC, Australia</li>
          </ul>
        </div>
        <div className="footer-section acknowledgment">
          <p>
          We acknowledge the Traditional Owners of Country on which we work, the Wurundjeri people of the Kulin Nation. We recognise their continuing connection to land, waters and culture, and ​pay our respects to their Elders.
          </p>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
