import React from "react";
import { useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart
} from "../../ReduxToolkit/cartSlice";

import "./CartDrawer.css";

const CartDrawer = ({ isOpen, onClose, cartItems }) => {

  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`drawer-overlay ${isOpen ? "open" : ""}`}
      onClick={onClose}
    >
      <div
        className={`drawer ${isOpen ? "slide" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="drawer-header">
          <h3>Cart</h3>
          <button onClick={onClose}>✖</button>
        </div>

        {/* BODY */}
        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="drawer-item" key={item._id}>

                <img src={item.image} alt={item.name} />

                <div className="drawer-details">

                  <p className="item-name">{item.name}</p>

                  <div className="item-price">
                    ₹ {item.price * item.quantity}
                  </div>

                  {/* ➕➖ QUANTITY */}
                  <div className="qty-controls">

                    <button
                      onClick={() => dispatch(decreaseQty(item._id))}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => dispatch(increaseQty(item._id))}
                    >
                      +
                    </button>

                  </div>

                  {/* 🗑 REMOVE */}
                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="drawer-footer">

          <h4>Subtotal: ₹ {subtotal}</h4>

          <button className="checkout-btn">
            Checkout
          </button>

        </div>

      </div>
    </div>
  );
};

export default CartDrawer;