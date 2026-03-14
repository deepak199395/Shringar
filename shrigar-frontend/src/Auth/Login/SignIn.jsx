import React, { useState } from "react";
import "./SingIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!Email || !Password) {
        setError("Both Email and Password are required.");
        return;
      }

      setError("");

      console.log("Ready to call login API", { Email, Password });

      const response = await axios.post(
        "https://api.shrigaar.com/api/v1/shringar/User/login/api60",
        {
          Email: Email,
          Password: Password,
        },
      );

      if (response.status === 200) {
        window.location.href = "https://shringaarprod.netlify.app/";
      }
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        <p className="login-subtitle">Welcome back! Please login.</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group password-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <span className="link">Forgot Password?</span>
          <span className="link" onClick={handleNavigate}>
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
