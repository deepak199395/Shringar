import React from "react";
import { useSelector } from "react-redux";
import "./Account.css";

const Account = () => {
  const { user, isSignIn } = useSelector((state) => state.auth);

  if (!isSignIn || !user) {
    return (
      <div className="account-container">
        <h2>Please login to view your account</h2>
      </div>
    );
  }

  return (
    <div className="account-container">
      <h1 className="account-heading">Your Account</h1>

      <div className="account-grid">
        
        <div className="account-box">
          <h3>Your Orders</h3>
          <p>Track, return or buy again</p>
        </div>

        <div className="account-box">
          <h3>Login & Security</h3>
          <p>Edit login, name and mobile</p>
        </div>

        <div className="account-box">
          <h3>Your Addresses</h3>
          <p>Edit delivery addresses</p>
        </div>

        <div className="account-box">
          <h3>Payment Options</h3>
          <p>Add or edit payment methods</p>
        </div>

        <div className="account-box">
          <h3>Contact Us</h3>
          <p>Customer support</p>
        </div>

        <div className="account-box">
          <h3>User Details</h3>
          <p>{user.FullName}</p>
          <p>{user.Email}</p>
        </div>

      </div>
    </div>
  );
};

export default Account;