import HomePage from "./components/layout/HomePage"; // Correct import
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/layout/Register";
import Login from "./components/layout/Login";
import Profile from "./components/layout/Profile";
import AuthProvider from "./context/AuthContext";


function App() {
  return (
      <AuthProvider>
          <Router>
              <nav>
                  <Link to="/">Home</Link>
                  <Link to="/register">Register</Link>
                  <Link to="/login">Login</Link>
              </nav>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
              </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;