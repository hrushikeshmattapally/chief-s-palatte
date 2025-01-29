import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/layout/HomePage"; // Correct import

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<div className='flex justify-center items-center h-screen'>Login Page</div>} />
          <Route path="/signup" element={<div className='flex justify-center items-center h-screen'>Sign Up Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}
