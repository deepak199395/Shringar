import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "../../ReduxToolkit/orderSlice";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.order);
  const { user, isSignIn } = useSelector((state) => state.auth);

  /* Redirect if not logged in */
  useEffect(() => {
    if (!isSignIn) {
      navigate("/signin");
    }
  }, [isSignIn, navigate]);

  /* Fetch Orders */
  useEffect(() => {
    if (user?.id || user?._id) {
      dispatch(fetchOrdersRequest(user?.id || user?._id));
    }
  }, [dispatch, user]);

  /* Filter user orders */
  const userOrders = orders.filter(
    (order) => order.userId === user?.id || order.userId === user?._id
  );

  if (loading) return <p className="loading">Loading orders...</p>;

  return (
    <>
      <Header />

      <div className="orders-page">
        <h2 className="page-title">My Orders</h2>

        {userOrders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          userOrders.map((order) => (
            <div key={order._id} className="order-card">

              {/* TOP SECTION */}
              <div className="order-top">
                <div>
                  <p className="delivery-text">
                    Delivery by{" "}
                    <b>
                      {new Date(order.createdAt).toDateString()}
                    </b>
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

              {/* BUTTON */}
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
    </>
  );
};

export default Orders;