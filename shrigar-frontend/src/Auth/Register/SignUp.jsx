import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  //const [gender,setGender]=useState()
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.shrigaar.com/api/v1/shringar/User/registerUser/api55",
        formData,
      );
      navigate("/");

      console.log(response.data);
      alert("User Registered Successfully");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Create Account</h2>

        <div className="step-indicator">Step {step} of 3</div>

        <form onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="signup-group">
                <label>Full Name</label>
                <input
                  name="FullName"
                  value={formData.FullName}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-group">
                <label>Phone Number</label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-group">
                <label>Email</label>
                <input
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-group">
                <label>Password</label>
                <input
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                />
              </div>

              <button type="button" className="signup-btn" onClick={nextStep}>
                Next
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="signup-group">
                <label>Date of Birth</label>
                <input
                  name="Dob"
                  value={formData.Dob}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-group">
                <label>Age</label>
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-group">
                <label>Gender</label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="btn-group">
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={nextStep}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="signup-group">
                <label>Address</label>
                <input
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-group">
                <label>City</label>
                <input
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-group">
                <label>State</label>
                <input
                  name="State"
                  value={formData.State}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-group">
                <label>Country</label>
                <input
                  name="Country"
                  value={formData.Country}
                  onChange={handleChange}
                />
              </div>

              <div className="signup-group">
                <label>Pincode</label>
                <input
                  name="Pincode"
                  value={formData.Pincode}
                  onChange={handleChange}
                />
              </div>

              <div className="btn-group">
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="submit">Submit</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
