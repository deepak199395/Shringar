import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import "./ArrivalOrders.css";

const ArrivalOrders = () => {
  const navigate = useNavigate();
  const { user, isSignIn } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔐 Redirect if not logged in */
  useEffect(() => {
    if (!isSignIn) {
      navigate("/signin");
    }
  }, [isSignIn, navigate]);

  /* 📦 Fetch Arrival Orders */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://api.shrigaar.com/api/v1/shringar/getArrivalsOrder/list/api77/${user?.id}`
        );

        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchOrders();
  }, [user]);

  /* 🔄 LOADER */
  if (loading) {
    return (
      <div className="loader-overlay">
        <TailSpin height="60" width="60" color="#c9a24d" />
        <p>Loading your arrival orders...</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />

      <div className="arrival-orders-page">
        <h2 className="page-title">New Arrival Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h3>No Orders Yet</h3>
            <button onClick={() => navigate("/")}>
              Start Shopping
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">

              {/* HEADER */}
              <div className="order-top">
                <p>
                  Ordered on{" "}
                  <b>{new Date(order.createdAt).toDateString()}</b>
                </p>
                <span className="status">{order.orderStatus}</span>
              </div>

              {/* ITEMS */}
              {order.items.map((item, index) => {
                const qty = item.quantity || item.qty || 1;

                return (
                  <div key={index} className="order-item">
                    <img
                      src={item.image}
                      alt="product"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/80")
                      }
                    />

                    <div className="item-info">
                      <h4>New Arrival Product</h4>
                      <p>Qty: {qty}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                );
              })}

              {/* ADDRESS */}
              {order.address && (
                <div className="order-address">
                  <p><b>{order.address.fullName}</b></p>
                  <p>
                    {order.address.addressLine}, {order.address.city},{" "}
                    {order.address.state} - {order.address.pincode}
                  </p>
                </div>
              )}

              {/* FOOTER */}
              <div className="order-footer">
                <p><b>Order ID:</b> {order._id}</p>

                <p>
                  <b>Total:</b> ₹{
                    order.totalAmount > 0
                      ? order.totalAmount
                      : order.items.reduce(
                          (sum, item) =>
                            sum +
                            item.price *
                              (item.quantity || item.qty || 1),
                          0
                        )
                  }
                </p>
              </div>

            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ArrivalOrders;