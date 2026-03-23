import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../ReduxToolkit/authSlice";
import "./SignUp.css";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    FullName: "",
    phoneNumber: "",
    Email: "",
    Password: "",
    Dob: "",
    age: "",
    Address: "",
    City: "",
    Gender: "",
    Pincode: "",
    Country: "",
    State: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(formData));
    navigate("/SignIn");
  };

  return (
    <div className="signup-container">

      {/* LEFT SIDE IMAGE */}
      <div className="signup-left">
        <div className="overlay">
          <h1>Create Your Account Today</h1>
          <p>Personalized Shopping • Faster Checkout • Exclusive Offers</p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="signup-right">
        <div className="signup-card">

          <h2>Shrigaar</h2>
          <h3>Create Account</h3>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div className={`step ${step >= 1 ? "active" : ""}`}></div>
            <div className={`step ${step >= 2 ? "active" : ""}`}></div>
            <div className={`step ${step >= 3 ? "active" : ""}`}></div>
          </div>

          <p className="step-text">Step {step} of 3</p>

          <form onSubmit={handleSubmit}>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <input name="FullName" placeholder="Full Name" onChange={handleChange} />
                <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                <input name="Email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="Password" placeholder="Password" onChange={handleChange} />

                <button type="button" onClick={nextStep}>
                  Continue
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <input type="date" name="Dob" onChange={handleChange} />
                <input type="number" name="age" placeholder="Age" onChange={handleChange} />

                <select name="Gender" onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <div className="btn-group">
                  <button type="button" onClick={prevStep}>Back</button>
                  <button type="button" onClick={nextStep}>Continue</button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <input name="Address" placeholder="Address" onChange={handleChange} />
                <input name="City" placeholder="City" onChange={handleChange} />
                <input name="State" placeholder="State" onChange={handleChange} />
                <input name="Country" placeholder="Country" onChange={handleChange} />
                <input name="Pincode" placeholder="Pincode" onChange={handleChange} />

                <div className="btn-group">
                  <button type="button" onClick={prevStep}>Back</button>
                  <button type="submit">
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </>
            )}

          </form>

          {error && <p className="error">{error}</p>}

        </div>
      </div>
    </div>
  );
};

export default SignUp;