import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './HomePage.css';  // Import the new CSS file

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="title">Chef's Palette</h1>
        
        {/* Menu Button */}
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        
        {/* Navigation */}
        <nav className={`nav ${menuOpen ? 'show' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/recipes" className="nav-link">Recipes</Link>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="main-content">
        <h2 className="welcome-title">Welcome to Cooking & Recipes</h2>
        <p className="description">Discover delicious recipes and enhance your cooking skills!</p>
        
        {/* Login & Signup Buttons */}
        <div className="button-container">
          <Link to="/login" className="button login-button">Login</Link>
          <Link to="/signup" className="button signup-button">Sign Up</Link>
        </div>
      </main>
    </div>
  );
}
