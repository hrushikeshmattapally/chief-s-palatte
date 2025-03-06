import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";  // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/users?username=${username}`);
        const data = await response.json();

        if (data.length > 0 && data[0].password === password) {
            login(data[0]);
            navigate("/profile");
        } else {
            setError("Invalid username or password!");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
