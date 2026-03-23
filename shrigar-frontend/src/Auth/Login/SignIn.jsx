import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../ReduxToolkit/authSlice";
import "./SingIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!Email || !Password) {
        setError("Enter email and password");
        return;
      }

      const response = await axios.post(
        "https://api.shrigaar.com/api/v1/shringar/User/login/api66",
        { Email, Password }
      );

      if (response.data.success) {
        const userData = response.data.user;

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        dispatch(loginSuccess(userData));
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE IMAGE */}
      <div className="login-left">
        <div className="overlay">
          <h1>Welcome to Shrigaar</h1>
          <p>Shop everything you need with best deals</p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="login-right">
        <div className="login-card">

          <h2>Sign In</h2>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit">Login</button>
          </form>

          <p className="create" onClick={() => navigate("/signup")}>
            Create Account
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignIn;