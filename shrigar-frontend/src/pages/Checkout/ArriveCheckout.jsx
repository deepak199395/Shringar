import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhoneAuthModal from "../../CustomComponents/PhoneAuthModal";
import "./ArrivelCheckout.css";

const ArriveCheckout = () => {
  const navigate = useNavigate();

  // ✅ REDUX DATA
  const cartItems = useSelector((state) => state.cart.items);
  const { isSignIn } = useSelector((state) => state.auth);

  // 🔐 OTP MODAL STATE
  const [showOtpModal, setShowOtpModal] = useState(false);

  // 🔐 LOGIN CHECK
  useEffect(() => {
    if (!isSignIn) {
      navigate("/signin");
    }
  }, [isSignIn, navigate]);

  // 💰 TOTAL
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🛒 STEP 1: CLICK PLACE ORDER
  const handlePlaceOrder = () => {
    if (!cartItems.length) {
      alert("Cart is empty");
      return;
    }

    // 👉 OPEN OTP MODAL
    setShowOtpModal(true);
  };

  // 🔐 STEP 2: OTP VERIFIED
  const handleVerifySuccess = (token) => {
    console.log("OTP Verified, Firebase Token:", token);

    setShowOtpModal(false);

    // 👉 YOU CAN CALL BACKEND API HERE
    // Example:
    // dispatch(createOrderRequest(payload));

    alert("🎉 Order Placed Successfully!");

    // 👉 OPTIONAL REDIRECT
    navigate("/orders");
  };

  // 🚫 EMPTY CART
  if (!cartItems.length) {
    return <p className="status-text">No items to checkout</p>;
  }

  return (
    <div className="checkout-container">
      <Header />

      <div className="checkout-content">
        <div className="checkout-page">
          <h2>Arrivel Checkout</h2>

          {/* 🧾 CART ITEMS */}
          {cartItems.map((item) => (
            <div key={item._id} className="checkout-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          {/* 💰 TOTAL */}
          <h3>Total: ₹{totalAmount}</h3>

          {/* 🛒 PLACE ORDER BUTTON */}
          <button
            className="checkout-btn"
            onClick={handlePlaceOrder}
            disabled={showOtpModal}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* 🔐 OTP MODAL */}
      <PhoneAuthModal
        show={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleVerifySuccess}
      />

      <Footer />
    </div>
  );
};

export default ArriveCheckout;