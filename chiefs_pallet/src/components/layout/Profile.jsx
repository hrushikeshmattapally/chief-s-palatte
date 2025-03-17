import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
    const { user, logout, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

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
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5000/api/auth/update`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editedUser),
            });

            const data = await response.json();

            if (response.ok) {
                updateUser(data.user); // Update context
                setEditMode(false);
            } else {
                alert(data.message || "Failed to update profile");
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
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

                    {editMode ? (
                        <div className="button-container">
                            <button className="save-button" onClick={handleSave}>
                                Save
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


