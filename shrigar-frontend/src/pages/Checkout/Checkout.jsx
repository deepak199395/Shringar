import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useCart } from "../../components/context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { createOrderRequest } from "../../ReduxToolkit/orderSlice";
import { useNavigate } from "react-router-dom";
import PhoneAuthModal from "../../CustomComponents/PhoneAuthModal";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSignIn } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.order);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

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

  /* ADDRESS */
  const address = {
    fullName: user?.FullName || "",
    phone: user?.phoneNumber || "",
    addressLine: user?.Address || "",
    city: user?.City || "",
    state: user?.State || "",
    pincode: user?.Pincode || "",
  };

  /* TOTAL */
  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum +
      item.qty *
        (item.discountPercentage > 0
          ? item.originalPrice -
            (item.originalPrice * item.discountPercentage) / 100
          : item.originalPrice),
    0,
  );
  /* STEP 1 → OPEN OTP MODAL */
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

    setShowOtpModal(true);
  };

  /* STEP 2 → AFTER OTP VERIFIED → PLACE ORDER */
  const handleVerifySuccess = (token) => {
    console.log("Firebase Token:", token);
    setShowOtpModal(false);

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
      collectionId: item.collectionId,
    }));

    const payload = {
      userId: user?.id,
      email: user?.Email,
      items,
      address,
      totalAmount,
      paymentMethod,
      firebaseToken: token,
    };
    console.log("🟢 FRONTEND DEBUG START");
    console.log("User object:", user);
    console.log("User email:", user?.Email);
    console.log("Payload:", payload);
    console.log("🟢 FRONTEND DEBUG END");

    dispatch(createOrderRequest(payload));
  };
  console.log("USER EMAIL:", user?.Email);
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
          <p>
            <b>Name:</b> {address.fullName}
          </p>
          <p>
            <b>Phone:</b> {address.phone}
          </p>
          <p>
            <b>Address:</b> {address.addressLine}
          </p>
          <p>
            <b>City:</b> {address.city}
          </p>
          <p>
            <b>State:</b> {address.state}
          </p>
          <p>
            <b>Pincode:</b> {address.pincode}
          </p>
        </div>

        {/* PAYMENT */}
        <div className="payment-box">
          <h3>Payment Method</h3>

          <label className="payment-option">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
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
                    : item.originalPrice),
              )}
            </span>
          </div>
        ))}

        <h3>Total: ₹{Math.round(totalAmount)}</h3>

        {/* NOTE */}
        <div className="note-box">
          <p>
            <b>Note:</b>
            <br />
            Currently we support <b>Cash on Delivery</b> only.
          </p>
        </div>

        <button
          className="checkout-btn"
          onClick={handlePlaceOrder}
          disabled={showOtpModal}
        >
          Place Order
        </button>
      </div>

      {/* OTP MODAL */}
      <PhoneAuthModal
        show={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleVerifySuccess}
      />

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="order-modal">
          <div className="order-modal-content">
            <div className="loader"></div>

            <h2>Processing your order...</h2>
            <h3>{countdown}</h3>

            {countdown === 0 && (
              <h2 className="success-text">🎉 Order placed successfully!</h2>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Checkout;
