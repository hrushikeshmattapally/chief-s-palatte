import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import "./HomePage.css";
import cookingImage from "../../assets/cooking.jpg";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        {/* Menu Button for Mobile */}
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Site Title */}
        <h1 className="title">Chef's Palette</h1>

        {/* Desktop Navigation (Hidden when menuOpen is true) */}
        <nav className={`nav_items ${menuOpen ? "hidden" : ""}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/recipes" className="nav-link">Recipes</Link>
        </nav>

        {/* Dropdown Menu for Mobile */}
        <nav className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/recipes" className="nav-link">Recipes</Link>
        </nav>

        {/* Profile Section */}
        <div className="button-container">
          {user ? (
            <div className="profile-wrapper">
              <img
                src={user.profilePic || "/default-profile.png"}
                alt="Profile"
                className="profile-pic"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              />
              {profileMenuOpen && (
                <div className="profile-menu">
                  <p>{user.username}</p>
                  <button onClick={() => navigate("/profile")}>View Profile</button>
                  <button onClick={() => { logout(); setProfileMenuOpen(false); }}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/register" className="button subscribe-button">Subscribe</Link>
          )}
        </div>
      </header>

      {/* Image Section */}
      <div className="image-container">
        <div className="popup-text">Become A Professional Chef!</div>
        <img src={cookingImage} alt="Cooking" className="background-image" />
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
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
          <p className="footer-text">© {new Date().getFullYear()} Chef's Palette. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
