import React, { useEffect } from "react";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ArrivelCheckout.css";

const ArriveCheckout = () => {
  const navigate = useNavigate();

  // ✅ GET CART FROM REDUX
  const cartItems = useSelector((state) => state.cart.items);
  const { isSignIn } = useSelector((state) => state.auth);

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

  if (!cartItems.length) {
    return <p className="status-text">No items to checkout</p>;
  }

  return (
  <div className="checkout-container">
    <Header />

    <div className="checkout-content">
      <div className="checkout-page">
        <h2>Arrivel Checkout</h2>

        {cartItems.map((item) => (
          <div key={item._id} className="checkout-item">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <h3>Total: ₹{totalAmount}</h3>

        <button
          className="checkout-btn"
          onClick={() => alert("Order Placed (Demo)")}
        >
          Place Order
        </button>
      </div>
    </div>

    <Footer />
  </div>
);
};

export default ArriveCheckout;