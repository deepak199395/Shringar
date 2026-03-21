import React, { useState } from "react";
import Header from "../../components/layout/Header/Header";
import { useCart } from "../../components/context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

  const [pincode, setPincode] = useState("");
  const [deliveryMsg, setDeliveryMsg] = useState("");

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum +
      item.qty *
        (item.discountPercentage > 0
          ? item.originalPrice -
            (item.originalPrice * item.discountPercentage) / 100
          : item.originalPrice),
    0
  );

  const finalAmount = totalAmount - discount;

  // 🎟 COUPON
  const applyCoupon = () => {
    if (coupon === "SHRIGAR10") {
      const discountAmount = totalAmount * 0.1;
      setDiscount(discountAmount);
      setMessage("✅ Coupon Applied!");
    } else {
      setDiscount(0);
      setMessage("❌ Invalid Coupon");
    }
  };

  // 📦 PINCODE
  const checkPincode = () => {
    if (pincode.length !== 6) {
      setDeliveryMsg("❌ Invalid pincode");
      return;
    }

    if (pincode.startsWith("4")) {
      setDeliveryMsg("✅ Delivery in 2-3 days");
    } else {
      setDeliveryMsg("⚠️ Delivery may take 5-7 days");
    }
  };

  if (!cartItems.length) {
    return <p className="status-text">Your cart is empty</p>;
  }

  return (
    <>
      <Header />

      <div className="cart-container">

        {/* LEFT */}
        <div className="cart-left">

          <h2>My Cart</h2>

          {/* PINCODE */}
          <div className="pincode-box">
            <input
              type="text"
              placeholder="Enter delivery pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <button onClick={checkPincode}>Check</button>
          </div>
          <p className="delivery-msg">{deliveryMsg}</p>

          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>

              <img src={item.image} alt={item.productName} />

              <div className="cart-details">

                <h4>{item.productName}</h4>

                <p className="price">₹{item.originalPrice}</p>

                <div className="qty-box">
                  <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                </div>

                <div className="cart-actions">
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                  <button>Save for later</button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="cart-right">

          <div className="price-box">

            <h3>Price Details</h3>

            {/* COUPON */}
            <div className="coupon-box">
              <input
                type="text"
                placeholder="Enter coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={applyCoupon}>Apply</button>
            </div>

            <p className="coupon-msg">{message}</p>

            <div className="price-row">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{Math.round(totalAmount)}</span>
            </div>

            <div className="price-row">
              <span>Discount</span>
              <span>-₹{Math.round(discount)}</span>
            </div>

            <div className="price-row">
              <span>Delivery</span>
              <span className="free">FREE</span>
            </div>

            <hr />

            <div className="total-row">
              <span>Total Amount</span>
              <span>₹{Math.round(finalAmount)}</span>
            </div>

            <Link to="/checkout">
              <button className="checkout-btn">Place Order</button>
            </Link>

          </div>

        </div>

      </div>
    </>
  );
};

export default Cart;