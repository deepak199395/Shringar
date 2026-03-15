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
  const { success } = useSelector((state) => state.order);

  const [countdown, setCountdown] = useState(5);
  const [showModal, setShowModal] = useState(false);

  /* REDIRECT IF NOT LOGGED IN */

  useEffect(() => {
    if (!isSignIn) {
      navigate("/signin");
    }
  }, [isSignIn, navigate]);

  /* ORDER SUCCESS MODAL */

  useEffect(() => {

    if (success) {

      setShowModal(true);

      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        navigate("/orders");
      }, 5000);

      return () => clearInterval(interval);

    }

  }, [success, navigate]);

  /* ADDRESS FROM USER */

  const address = {
    fullName: user?.FullName || "",
    phone: user?.phoneNumber || "",
    addressLine: user?.Address || "",
    city: user?.City || "",
    state: user?.State || "",
    pincode: user?.Pincode || ""
  };

  /* CALCULATE TOTAL */

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

  /* PLACE ORDER */

  const handlePlaceOrder = () => {

    if (
      !address.fullName ||
      !address.phone ||
      !address.addressLine ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Your address is incomplete. Please update your profile.");
      return;
    }

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

        {/* ADDRESS */}

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
              ₹
              {Math.round(
                item.qty *
                  (item.discountPercentage > 0
                    ? item.originalPrice -
                      (item.originalPrice * item.discountPercentage) / 100
                    : item.originalPrice)
              )}
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

      {/* SUCCESS MODAL */}

      {showModal && (
        <div className="order-modal">
          <div className="order-modal-content">

            <div className="loader"></div>

            <h2>Processing your order...</h2>

            <h3>{countdown}</h3>

            {countdown === 0 && (
              <h2 className="success-text">
                🎉 Congratulations! Your order has been placed successfully
              </h2>
            )}

          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Checkout;