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

  /* ✅ Redirect if not logged in */
  useEffect(() => {
    if (!isSignIn) {
      navigate("/signin");
    }
  }, [isSignIn, navigate]);

  /* ✅ Fetch orders */
  useEffect(() => {
    if (user?.id || user?._id) {
      dispatch(fetchOrdersRequest(user?.id || user?._id));
    }
  }, [dispatch, user]);

  /* ✅ Filter only logged-in user orders */
  const userOrders = orders.filter(
    (order) => order.userId === user?.id || order.userId === user?._id
  );

  if (loading) return <p>Loading orders...</p>;

  return (
    <>
      <Header />

      <div className="orders-page">
        <h2>My Orders</h2>

        {userOrders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          userOrders.map((order) => (
            <div key={order._id} className="order-card">
              
              <div className="order-header">
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>Status:</b> {order.orderStatus}</p>
                <p><b>Total:</b> ₹{order.totalAmount}</p>
                <p>
                  <b>Date:</b>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.productName} />

                  <div>
                    <h4>{item.productName}</h4>
                    <p>Qty: {item.qty}</p>
                    <p>Price: ₹{item.priceAfterDiscount}</p>
                  </div>
                </div>
              ))}

            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default Orders;