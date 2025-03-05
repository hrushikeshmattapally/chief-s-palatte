import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";  // Import the CSS file

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) {
        return null; // Prevent rendering before redirect
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Welcome, {user.username}!</h2>
                <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;

