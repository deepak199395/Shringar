import React from "react";
import Header from "../../components/layout/Header/Header";
import { useCart } from "../../components/context/CartContext";
import "./Cart.css"
const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();

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

  if (!cartItems.length) {
    return <p className="status-text">Your cart is empty</p>;
  }

  return (
    <>
      <Header />

      <div className="cart-page">
        <h2>My Cart</h2>

        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.productName} />

            <div className="cart-info">
              <h4>{item.productName}</h4>
              <p>₹{item.originalPrice}</p>

              <div className="qty-box">
                <button onClick={() => updateQty(item._id, item.qty - 1)}>
                  -
                </button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item._id, item.qty + 1)}>
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <h3>Total: ₹{Math.round(totalAmount)}</h3>
      </div>

    </>
  );
};

export default Cart;
