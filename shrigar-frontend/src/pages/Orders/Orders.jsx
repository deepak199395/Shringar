import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "../../ReduxToolkit/orderSlice";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.order);
  const { user, isSignIn } = useSelector((state) => state.auth);

  // 🔥 FIX: prevent flash
  const [initialLoading, setInitialLoading] = useState(true);

  /* 🔐 Redirect if not logged in */
  useEffect(() => {
    if (!isSignIn) {
      navigate("/signin");
    }
  }, [isSignIn, navigate]);

  /* 📦 Fetch Orders */
  useEffect(() => {
    if (user?.id || user?._id) {
      dispatch(fetchOrdersRequest(user?.id || user?._id));
    }
  }, [dispatch, user]);

  /* 🔥 Remove flash after loading completes */
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setInitialLoading(false);
      }, 300); // smooth transition
      return () => clearTimeout(timer);
    }
  }, [loading]);

  /* 👤 Filter user orders */
  const userOrders = orders.filter(
    (order) => order.userId === user?.id || order.userId === user?._id
  );

  // 🔥 BLOCK UI UNTIL READY (NO FLASH)
  if (loading || initialLoading) {
    return (
      <div className="loader-overlay">
        <TailSpin
          height="60"
          width="60"
          color="#c9a24d"
          ariaLabel="loading"
        />
        <p className="loader-text">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />

      <div className="orders-page">
        <h2 className="page-title">My Orders</h2>

        {/* 🟡 EMPTY STATE */}
        {userOrders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">📦</div>
            <h3>No Orders Yet</h3>
            <p>You haven’t placed any orders yet.</p>

            <button
              className="shop-btn"
              onClick={() => navigate("/")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          userOrders.map((order) => (
            <div key={order._id} className="order-card">

              {/* TOP */}
              <div className="order-top">
                <div>
                  <p className="delivery-text">
                    Delivery by{" "}
                    <b>{new Date(order.createdAt).toDateString()}</b>
                  </p>
                  <p className="track-link">Track & manage order</p>
                </div>

                <div className="success-icon">✔</div>
              </div>

              {/* ITEMS */}
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.productName} />

                  <div className="item-info">
                    <h4>{item.productName}</h4>
                    <p>Qty: {item.qty}</p>
                    <p>₹{item.priceAfterDiscount}</p>
                  </div>
                </div>
              ))}

              {/* FOOTER */}
              <div className="order-footer">
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>Status:</b> {order.orderStatus}</p>
                <p><b>Total:</b> ₹{order.totalAmount}</p>
              </div>

              <button
                className="continue-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>

            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;