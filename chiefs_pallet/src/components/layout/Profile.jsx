import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
    const { user, logout, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedUser((prev) => ({ ...prev, profilePic: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            console.log("Sending Update Request:", editedUser);

            const response = await fetch("http://localhost:5000/api/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedUser),
            });

            console.log("Raw Response:", response);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.log("Error Data:", errorData);
                throw new Error(errorData.message || "Failed to update profile");
            }

            const data = await response.json();
            console.log("Success Response:", data);

            // ✅ Update user context and UI immediately
            updateUser(data.user);
            setEditMode(false);
        } catch (err) {
            console.error("Profile Update Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-picture-container">
                    <img
                        src={editedUser.profilePic || "/default-profile.png"}
                        alt="Profile"
                        className="profile-picture"
                    />
                    {editMode && (
                        <>
                            <input
                                type="file"
                                id="profilePicInput"
                                className="file-input"
                                onChange={handleProfilePicChange}
                            />
                            <button
                                className="profile-picture-edit"
                                onClick={() => document.getElementById("profilePicInput").click()}
                            >
                                ✏️
                            </button>
                        </>
                    )}
                </div>

                <div className="profile-form">
                    <input
                        type="text"
                        name="username"
                        value={editedUser.username}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="profile-input"
                    />

                    <input
                        type="email"
                        name="email"
                        value={editedUser.email || ""}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="profile-input"
                    />

                    {error && <p className="error-message">{error}</p>}

                    {editMode ? (
                        <div className="button-container">
                            <button className="save-button" onClick={handleSave} disabled={loading}>
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    ) : (
                        <div className="button-container">
                            <button className="save-button" onClick={() => setEditMode(true)}>
                                Edit Profile
                            </button>
                            <button className="logout-button" onClick={() => { logout(); navigate("/"); }}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

