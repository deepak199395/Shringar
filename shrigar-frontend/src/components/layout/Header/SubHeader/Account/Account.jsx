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
      <div className="account-card">
        <h1 className="account-title">My Account</h1>

        <div className="account-info">
          <p><strong>Full Name:</strong> {user.FullName}</p>
          <p><strong>Email:</strong> {user.Email}</p>
          <p><strong>Phone:</strong> {user.phoneNumber}</p>
          <p><strong>Gender:</strong> {user.Gender}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>DOB:</strong> {user.Dob}</p>
          <p><strong>Address:</strong> {user.Address}</p>
          <p><strong>City:</strong> {user.City}</p>
          <p><strong>State:</strong> {user.State}</p>
          <p><strong>Pincode:</strong> {user.Pincode}</p>
          <p><strong>Country:</strong> {user.Country}</p>
        </div>

       
      </div>
    </div>
  );
};

export default Account;