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

  /* 🔥 Prevent UI flash */
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setInitialLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // 🔥 SPLIT ORDERS
  const normalOrders = orders.filter((order) =>
    order.items?.some((item) => item.productName)
  );

  const arrivalOrders = orders.filter((order) =>
    order.items?.some((item) => item.name)
  );

  // 🔥 LOADER
  if (loading || initialLoading) {
    return (
      <div className="loader-overlay">
        <TailSpin height="60" width="60" color="#c9a24d" />
        <p className="loader-text">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />

      <div className="orders-page">
        <h2 className="page-title">My Orders</h2>

        {/* 🟡 EMPTY */}
        {orders.length === 0 && (
          <div className="empty-orders">
            <div className="empty-icon">📦</div>
            <h3>No Orders Yet</h3>
            <button onClick={() => navigate("/")}>Start Shopping</button>
          </div>
        )}

        {/* 🟢 NORMAL ORDERS */}
        {normalOrders.length > 0 && (
          <>
            <h3 className="section-title">Your Orders</h3>

            {normalOrders.map((order) => (
              <div key={order._id} className="order-card">

                <div className="order-top">
                  <p>
                    Delivery by{" "}
                    <b>{new Date(order.createdAt).toDateString()}</b>
                  </p>
                </div>

                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.productName} />

                    <div className="item-info">
                      <h4>{item.productName}</h4>
                      <p>Qty: {item.qty}</p>
                      <p>₹{item.priceAfterDiscount || item.price}</p>
                    </div>
                  </div>
                ))}

                <div className="order-footer">
                  <p><b>Status:</b> {order.orderStatus}</p>
                  <p><b>Total:</b> ₹{order.totalAmount}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {/* 🟣 NEW ARRIVAL ORDERS */}
        {arrivalOrders.length > 0 && (
          <>
            <h3 className="section-title">New Arrival Orders</h3>

            {arrivalOrders.map((order) => (
              <div key={order._id} className="order-card">

                <div className="order-top">
                  <p>
                    Delivery by{" "}
                    <b>{new Date(order.createdAt).toDateString()}</b>
                  </p>
                </div>

                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/80")
                      }
                    />

                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                ))}

                <div className="order-footer">
                  <p><b>Status:</b> {order.orderStatus}</p>

                  <p>
                    <b>Total:</b> ₹{
                      order.totalAmount > 0
                        ? order.totalAmount
                        : order.items.reduce(
                            (sum, item) =>
                              sum +
                              (item.price || 0) *
                                (item.quantity || item.qty || 1),
                            0
                          )
                    }
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;