import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewArrivals.css";

const NewArrivalsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://api.shrigaar.com/api/v1/shringar/getAllNewArrivals/api72",
      );
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2>New Arrivals</h2>
      <div className="grid">
        {products.map((item) => (
          <div
            key={item._id}
            className="card"
            onClick={() => navigate(`/NewArrivalsProductDetails/${item._id}`)}
          >
            <img src={item.images[0]} alt="" className="card-img" />
            <h4>{item.productName}</h4>
            <p>₹ {item.priceAfterDiscount}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewArrivalsPage;
