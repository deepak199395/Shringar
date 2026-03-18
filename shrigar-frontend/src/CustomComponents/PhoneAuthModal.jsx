import React, { useState } from "react";
import "./PhoneAuthModal.css";
import { auth } from "../firebase"; // adjust path if needed
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

const PhoneAuthModal = ({ show, onClose, onVerify }) => {

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  // 🔥 Setup reCAPTCHA
  const setupRecaptcha = () => {
  try {
    if (!window.recaptchaVerifier) {

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, // ✅ FIRST PARAM MUST BE auth
        "recaptcha-container", // ✅ SECOND param
        {
          size: "invisible"
        }
      );

    }
  } catch (error) {
    console.error("Recaptcha error:", error);
  }
};

  // 📲 SEND OTP
  const handleSendOtp = async () => {

    if (phone.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    setLoading(true);

    try {
      setupRecaptcha();

      const appVerifier = window.recaptchaVerifier;

      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        appVerifier
      );

      window.confirmationResult = confirmation;

      setStep(2);

    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    }

    setLoading(false);
  };

  // 🔐 VERIFY OTP
  const handleVerifyOtp = async () => {

    if (otp.length !== 6) {
      alert("Enter valid OTP");
      return;
    }

    setLoading(true);

    try {
      const result = await window.confirmationResult.confirm(otp);

      const user = result.user;

      const token = await user.getIdToken(); // 🔥 IMPORTANT

      onVerify(token); // send to checkout
      onClose();

    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }

    setLoading(false);
  };

  return (
    <div className="otp-overlay">

      <div className="otp-box">

        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>Verify Mobile Number</h2>

        {/* STEP 1: PHONE */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
            />

            <button onClick={handleSendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />

            <button onClick={handleVerifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* 🔥 Required for Firebase */}
        <div id="recaptcha-container"></div>

      </div>

    </div>
  );
};

export default PhoneAuthModal;