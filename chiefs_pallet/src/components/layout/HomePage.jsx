import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import './HomePage.css';  // Import the CSS file
import coockingImage from '../../assets/cooking.jpg';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        {/* Menu Button */}
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Dropdown Menu */}
      <nav className={`dropdown-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/recipes" className="nav-link">Recipes</Link>
      </nav>

        <h1 className="title">Chef's Palette</h1>
        
        {/* Navigation */}
        <nav className='nav_items'>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/recipes" className="nav-link">Recipes</Link>
        </nav>
        {/* Login & Signup Buttons */}
        <div className="button-container">
          <Link to="/login" className="button login-button">Login</Link>
          <Link to="/signup" className="button signup-button">Sign Up</Link>
        </div>
      </header>
      <div className="popup-text">Become A Professional Chef!</div>
      <img src={coockingImage} alt="Cooking" style={{ width: '100%', height: 'auto' }} className="background-image" />
      {/* Main Content */}
      <div className="course-delivery-section">
        <h2>Course Delivery</h2>
        <p >ICCA Dubai’s program is primarily available in the following options:</p>

        <h3>A) Full-time Intensive Program</h3>
        <ul>
          <li>Timings: The classes are run 4 days a week on a full-time basis, where students start their day at 07.00 AM and end their day at 05.30 PM, Monday through Thursday.</li>
          <li>Friday and Saturday are for IWP / industry exposure and Sunday is the weekly day off.</li>
        </ul>

        <h3>B) Part-time Weekend Program</h3>
        <ul>
          <li>Timings: The weekend program is held on Sundays and runs in a cycle with admissions open throughout the year.</li>
          <li>This program takes approx. twelve (12) months to complete.</li>
        </ul>

        <p>The student intakes for the full-time program are held every six weeks. Kindly refer to Program Start Dates for upcoming intakes.</p>
        <p>All equipment, ingredients, and protective gear are provided, along with Standard Recipe Cards for all classes.</p>
      </div>
      <main className="main-content">
        <h2 className="welcome-title">Welcome to Cooking & Recipes</h2>
        <p className="description">Discover delicious recipes and enhance your cooking skills!</p>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
          <p className="footer-text">© {new Date().getFullYear()} YourSiteName. All rights reserved.</p>
        </div>
      </footer>
    </div>
    
  );
}
