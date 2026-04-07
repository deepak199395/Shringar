import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "../Footer/Footer";
import "../../../styles/Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://shrigaar.com/pyFastApi/v1/product/all");
      const data = await res.json();

      setProducts(data?.products || data || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="MainContainer">
        <div className="CardContainer">
          {loading ? (
            <p>Loading...</p>
          ) : (
            products.map((item) => (
              <div
                className="card"
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img src={item.main_image} alt={item.name} />
                <h3>{item.name}</h3>

                <p className="price">
                  ₹{item.price_after_discount}
                  <span className="oldPrice">₹{item.price}</span>
                </p>

                <button>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;