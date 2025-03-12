import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";  // Import CSS

const Register = () => {
    const navigate = useNavigate();

    // Step State
    const [step, setStep] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    const [error, setError] = useState("");

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Proceed to Next Step
    const nextStep = () => setStep(step + 1);

    // Go Back to Previous Step
    const prevStep = () => setStep(step - 1);

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the username already exists
        const checkResponse = await fetch(`http://localhost:5000/users?username=${formData.username}`);
        const existingUsers = await checkResponse.json();

        if (existingUsers.length > 0) {
            setError("Username already taken! Choose another one.");
            return;
        }

        // Submit Data
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
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
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>

                {/* Step 1: Account Details */}
                {step === 1 && (
                    <>
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        <button type="button" onClick={nextStep}>Next</button>
                    </>
                )}

                {/* Step 2: Personal Details */}
                {step === 2 && (
                    <>
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                        <button type="button" onClick={prevStep}>Back</button>
                        <button type="button" onClick={nextStep}>Next</button>
                    </>
                )}

                {/* Step 3: Address Details */}
                {step === 3 && (
                    <>
                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                        <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} required />
                        <button type="button" onClick={prevStep}>Back</button>
                        <button type="submit">Submit</button>
                    </>
                )}

                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Register;
