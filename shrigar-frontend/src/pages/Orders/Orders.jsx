import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "../../ReduxToolkit/orderSlice";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import "./Orders.css";

const Orders = () => {

  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {

    if (user?.id) {
      dispatch(fetchOrdersRequest(user.id));
    }

  }, [dispatch, user]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <>
      <Header />

      <div className="orders-page">

        <h2>My Orders</h2>

        {orders.map((order) => (

          <div key={order._id} className="order-card">

            <div className="order-header">
              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Status:</b> {order.orderStatus}</p>
              <p><b>Total:</b> ₹{order.totalAmount}</p>
            </div>

            {order.items.map((item) => (

              <div key={item._id} className="order-item">

                <img src={item.image} alt={item.productName} />

                <div>
                  <h4>{item.productName}</h4>
                  <p>Qty: {item.qty}</p>
                  <p>Price: ₹{item.priceAfterDiscount}</p>
                </div>

              </div>

            ))}

          </div>

        ))}

      </div>

      <Footer />
    </>
  );
};

export default Orders;