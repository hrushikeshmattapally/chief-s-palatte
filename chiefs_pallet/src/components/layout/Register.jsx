import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";  // Import the CSS file

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Check if the user already exists
        const checkResponse = await fetch(`http://localhost:5000/users?username=${username}`);
        const existingUsers = await checkResponse.json();

        if (existingUsers.length > 0) {
            setError("Username already taken! Choose another one.");
            return;
        }

        // Proceed with registration
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert("Registration successful!");
            navigate("/login");
        } else {
            setError("Registration failed! Try again.");
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Register</h2>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
