import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext'; // Assuming you have an AuthContext
import './HomePage.css';
import coockingImage from '../../assets/cooking.jpg';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Get user data from context

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
        <nav className="nav_items">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/recipes" className="nav-link">Recipes</Link>
        </nav>

        {/* Login & Signup/Profile Dropdown */}
        <div className="button-container">
          {user ? (
            <div className="profile-dropdown">
              <img 
                src={user.profilePic || "/default-profile.png"} 
                alt="Profile"
                className="profile-pic"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              />
              {profileMenuOpen && (
                <div className="profile-menu">
                  <Link to="/profile" className="profile-option">View Profile</Link>
                  <button className="profile-option logout-button" onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/register" className="button subscribe-button">Subscribe</Link>
          )}
        </div>
      </header>

      <div className="image-container">
        <div className="popup-text">Become A Professional Chef!</div>
        <img src={coockingImage} alt="Cooking" className="background-image" />
      </div>

      {/* Main Content */}
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
