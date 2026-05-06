import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhoneAuthModal from "../../CustomComponents/PhoneAuthModal";
import { clearCart } from "../../ReduxToolkit/cartSlice";
import axios from "axios";
import "./ArrivelCheckout.css";

const ArriveCheckout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ REDUX DATA
  const { user, isSignIn } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
    name: user?.FullName || "",
    email: user?.Email || "",
    phone: user?.phoneNumber || "",
    address: user?.Address || "",
    city: user?.City || "",
    state: user?.State || "",
    pincode: user?.Pincode || "",
    country: user?.Country || "",
  };

  // 🛒 STEP 1
  const handlePlaceOrder = () => {
    if (!cartItems.length) {
      alert("Cart is empty");
      return;
    }

    if (!userDetails.address) {
      alert("Please update your address");
      return;
    }

    setShowOtpModal(true);
  };

  // 🔐 STEP 2
  const handleVerifySuccess = async (token) => {
    try {
      setLoading(true);
      setShowOtpModal(false);

      // ✅ MAP ITEMS (IMPORTANT)
      const items = cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }));

      const payload = {
        userId: user.id,
        email: user.Email,
        phone: user.phoneNumber,

        address: {
          fullName: userDetails.name,
          phoneNumber: userDetails.phone,
          addressLine: userDetails.address,
          city: userDetails.city,
          state: userDetails.state,
          pincode: userDetails.pincode,
          country: userDetails.country,
        },

        items,
      };

      console.log("FINAL PAYLOAD 👉", payload);

      const res = await axios.post(
        "https://api.shrigaar.com/api/v1/shringar/createNewArrival-order/get/api76",
        payload
      );

      if (res.data.success) {
        alert("🎉 Order Placed Successfully!");

        // ✅ OPTIONAL: clear cart (if you have action)
        dispatch(clearCart());

        navigate("/orders");
      }
    } catch (error) {
      console.error("ORDER ERROR ❌", error);
      alert(error?.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return <p className="status-text">No items to checkout</p>;
  }

  return (
    <div className="checkout-container">
      <Header />

      <div className="checkout-content">
        <div className="checkout-page">
          <h2>Arrival Checkout</h2>

          {/* 👤 USER */}
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

          {/* 🧾 CART */}
          {cartItems.map((item) => (
            <div key={item._id} className="checkout-item">
              <img
                src={item.image}
                alt={item.name}
                className="checkout-img"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/70")
                }
              />

              <div className="checkout-info">
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            </div>
          ))}

          <h3>Total: ₹{totalAmount}</h3>

          <button
            className="checkout-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* 🔐 OTP */}
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