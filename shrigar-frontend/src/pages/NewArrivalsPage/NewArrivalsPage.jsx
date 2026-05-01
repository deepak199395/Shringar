import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCartUI } from "../../context/CartUIContext"; // ✅ IMPORTANT
import "./NewArrivals.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../ReduxToolkit/cartSlice";
const NewArrivalsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsCartOpen } = useCartUI(); // ✅ GLOBAL CONTROL

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

  // ✅ ADD TO CART FUNCTION

  
  return (
    <>
      <h2>New Arrivals</h2>

      <div className="grid">
        {products.map((item) => (
          <div className="card" key={item._id}>
            {/* IMAGE */}
            <div className="card-img-wrapper">
              <img
                src={item.images[0]}
                alt={item.productName}
                onClick={() =>
                  navigate(`/NewArrivalsProductDetails/${item._id}`)
                }
              />

              {/* ❤️ Wishlist */}
              <span
                className="wishlist"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("wishlist clicked", item._id);
                }}
              >
                ❤️
              </span>

              {/* 🔥 Badge */}
              {item.isMostLoved && <span className="badge">Most Loved</span>}
            </div>

            {/* CONTENT */}
            <div className="card-content">
              <h4 className="product-name">{item.productName}</h4>

              {/* ⭐ Rating */}
              <div className="rating">
                {"⭐".repeat(Math.round(item.rating || 4))}
                <span className="rating-count">(120)</span>
              </div>

              <p className="price">₹ {item.priceAfterDiscount}</p>

              {/* ✅ FIXED BUTTON */}
              <button
                className="add-btn"
                onClick={() => {
                  dispatch(
                    addToCart({
                      _id: item._id,
                      name: item.productName,
                      price: item.priceAfterDiscount,
                      image: item.images[0],
                    }),
                  );

                  setIsCartOpen(true); // ✅ THIS OPENS DRAWER
                }}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewArrivalsPage;
