import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Cooking & Recipes</h1>
        
        {/* Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        
        {/* Navigation */}
        <nav className={`md:flex gap-6 ${menuOpen ? 'block' : 'hidden'} md:block`}>
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          <Link to="/recipes" className="text-gray-700 hover:text-gray-900">Recipes</Link>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl font-semibold text-gray-900">Welcome to Cooking & Recipes</h2>
        <p className="text-gray-600 mt-2">Discover delicious recipes and enhance your cooking skills!</p>
        
        {/* Login & Signup Buttons */}
        <div className="mt-6 flex gap-4">
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Login</Link>
          <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Sign Up</Link>
        </div>
      </main>
    </div>
  );
}