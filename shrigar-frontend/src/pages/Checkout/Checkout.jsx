import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useCart } from "../../components/context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { createOrderRequest } from "../../ReduxToolkit/orderSlice";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {

  const { cartItems } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSignIn } = useSelector((state) => state.auth);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: ""
  });

  /* CHECK LOGIN STATUS */

  useEffect(() => {

    if (!isSignIn) {
      navigate("/signin");
    }

  }, [isSignIn, navigate]);

  /* AUTO FILL ADDRESS FROM LOGIN API */

  useEffect(() => {

    if (user) {

      setAddress({
        fullName: user.FullName || "",
        phone: user.phoneNumber || "",
        addressLine: user.Address || "",
        city: user.City || "",
        state: user.State || "",
        pincode: user.Pincode || ""
      });

    }

  }, [user]);

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

  const handlePlaceOrder = () => {

    const items = cartItems.map((item) => ({
      productId: item._id,
      productName: item.productName,
      image: item.image,
      description: item.description,
      qty: item.qty,
      price: item.originalPrice,
      originalPrice: item.originalPrice,
      discountPercentage: item.discountPercentage,
      priceAfterDiscount:
        item.discountPercentage > 0
          ? item.originalPrice -
            (item.originalPrice * item.discountPercentage) / 100
          : item.originalPrice,
      inStock: item.inStock,
      collectionId: item.collectionId
    }));

    const payload = {
      userId: user?.id,
      items,
      address,
      totalAmount
    };

    dispatch(createOrderRequest(payload));

  };

  if (!cartItems.length) {
    return <p className="status-text">No items to checkout</p>;
  }

  return (
    <>
      <Header />

      <div className="checkout-page">

        <h2>Checkout</h2>

        {/* AUTO FILLED USER ADDRESS */}

        <div className="address-box">

          <p><b>Name:</b> {address.fullName}</p>
          <p><b>Phone:</b> {address.phone}</p>
          <p><b>Address:</b> {address.addressLine}</p>
          <p><b>City:</b> {address.city}</p>
          <p><b>State:</b> {address.state}</p>
          <p><b>Pincode:</b> {address.pincode}</p>

        </div>

        {/* ORDER SUMMARY */}

        {cartItems.map((item) => (
          <div key={item._id} className="checkout-item">

            <span>
              {item.productName} × {item.qty}
            </span>

            <span>
              ₹{item.originalPrice * item.qty}
            </span>

          </div>
        ))}

        <h3>Total: ₹{Math.round(totalAmount)}</h3>

        <button
          className="checkout-btn"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>

      </div>

      <Footer />
    </>
  );
};

export default Checkout;