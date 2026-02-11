import React from "react";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useCart } from "../../components/context/CartContext";
import "./Checkout.css"
const Checkout = () => {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      item.qty *
        (item.discountPercentage > 0
          ? item.originalPrice -
            (item.originalPrice * item.discountPercentage) / 100
          : item.originalPrice),
    0
  );

  if (!cartItems.length) {
    return <p className="status-text">No items to checkout</p>;
  }

  return (
    <>
      <Header />

      <div className="checkout-page">
        <h2>Checkout</h2>

        {cartItems.map((item) => (
          <div key={item._id} className="checkout-item">
            <span>{item.productName} × {item.qty}</span>
            <span>₹{item.originalPrice * item.qty}</span>
          </div>
        ))}

        <h3>Total: ₹{Math.round(total)}</h3>

        <button className="checkout-btn">
          Place Order
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
