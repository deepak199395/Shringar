import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhoneAuthModal from "../../CustomComponents/PhoneAuthModal";
import axios from "axios";
import "./ArrivelCheckout.css";

const ArriveCheckout = () => {
  const navigate = useNavigate();

  // ✅ REDUX DATA
  const { user, isSignIn } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  // 🔐 OTP MODAL STATE
  const [showOtpModal, setShowOtpModal] = useState(false);

  /* 🔐 LOGIN CHECK */
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

  // 👤 USER DETAILS
  const userDetails = {
    name: user?.FullName || "N/A",
    email: user?.Email || "N/A",
    phone: user?.phoneNumber || "N/A",
    address: user?.Address || "N/A",
    city: user?.City || "",
    state: user?.State || "",
    pincode: user?.Pincode || "",
  };

  console.log("USER 👉", user);
  console.log("CART 👉", cartItems);

  // 🛒 STEP 1: CLICK PLACE ORDER
  const handlePlaceOrder = () => {
    if (!cartItems.length) {
      alert("Cart is empty");
      return;
    }

    setShowOtpModal(true);
  };

  // 🔐 STEP 2: OTP VERIFIED → CREATE ORDER
  const handleVerifySuccess = async (token) => {
    try {
      setShowOtpModal(false);

      // 🔥 MAP CART ITEMS
      const items = cartItems.map((item) => ({
        productId: item._id,
        productName: item.name,
        description: item.name,
        price: item.price,
        qty: item.quantity,
        image: item.image,
      }));

      // 🔥 FINAL PAYLOAD
      const payload = {
        userId: user?.id,
        email: user?.Email,
        phone: user?.phoneNumber,
        items,
        totalAmount,
      };

      console.log("ORDER PAYLOAD 👉", payload);

      // 🔥 API CALL
      const res = await axios.post(
        "https://api.shrigaar.com/api/v1/shringar/arrival-order/create/api76",
        payload
      );

      if (res.data.success) {
        alert("🎉 Order Placed Successfully!");

        // 👉 redirect to orders page
        navigate("/orders");
      }
    } catch (error) {
      console.error("ORDER ERROR ❌", error);
      alert("Order failed. Try again.");
    }
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
          <h2>Arrival Checkout</h2>

          {/* 👤 USER DETAILS */}
          <div className="user-box">
            <h3>User Details</h3>
            <p><b>Name:</b> {userDetails.name}</p>
            <p><b>Email:</b> {userDetails.email}</p>
            <p><b>Phone:</b> {userDetails.phone}</p>
            <p>
              <b>Address:</b> {userDetails.address}, {userDetails.city},{" "}
              {userDetails.state} - {userDetails.pincode}
            </p>
          </div>

          {/* 🧾 CART ITEMS */}
          {cartItems.map((item) => (
            <div key={item._id} className="checkout-item">

              {/* 🖼️ IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                className="checkout-img"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/70";
                }}
              />

              {/* 📦 DETAILS */}
              <div className="checkout-info">
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>

            </div>
          ))}

          {/* 💰 TOTAL */}
          <h3>Total: ₹{totalAmount}</h3>

          {/* 🛒 PLACE ORDER */}
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