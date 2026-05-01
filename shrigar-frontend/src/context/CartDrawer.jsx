import React from "react";
import "./CartDrawer.css";

const CartDrawer = ({ isOpen, onClose, cartItems }) => {

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={`drawer-overlay ${isOpen ? "open" : ""}`}>

      <div className={`drawer ${isOpen ? "slide" : ""}`}>

        <div className="drawer-header">
          <h3>Cart</h3>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="drawer-item" key={item._id}>
                <img src={item.image} alt="" />

                <div>
                  <p>{item.name}</p>
                  <strong>
                    ₹ {item.price} × {item.quantity}
                  </strong>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="drawer-footer">
          <h4>Subtotal: ₹ {subtotal}</h4>
          <button className="checkout-btn">Checkout</button>
        </div>

      </div>
    </div>
  );
};

export default CartDrawer;