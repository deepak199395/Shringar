import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCartUI } from "../../context/CartUIContext";
import "./NewArrivals.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../ReduxToolkit/cartSlice";

// ✅ Loader
import { TailSpin } from "react-loader-spinner";

const NewArrivalsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsCartOpen } = useCartUI();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://api.shrigaar.com/api/v1/shringar/getAllNewArrivals/api72"
      );
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOADER
  if (loading) {
    return (
      <div className="loader-wrapper">
        <TailSpin height="50" width="50" color="#094c54" />
      </div>
    );
  }

  return (
    <>
      <h2 className="section-title">New Arrivals</h2>

      <div className="grid">
        {products.map((item) => {
          const imageUrl = item.images?.[0]
            ? item.images[0].startsWith("http")
              ? item.images[0]
              : `https://api.shrigaar.com/${item.images[0]}`
            : "https://via.placeholder.com/150";

          return (
            <div className="card" key={item._id}>
              
              {/* IMAGE */}
              <div className="card-img-wrapper">
                <img
                  src={imageUrl}
                  alt={item.productName}
                  onClick={() =>
                    navigate(`/NewArrivalsProductDetails/${item._id}`)
                  }
                />

                <span
                  className="wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("wishlist clicked", item._id);
                  }}
                >
                  ❤️
                </span>

                {item.isMostLoved && (
                  <span className="badge">Most Loved</span>
                )}
              </div>

              {/* ✅ CONTENT BACK */}
              <div className="card-content">
                <h4 className="product-name">{item.productName}</h4>

                <div className="rating">
                  {"⭐".repeat(Math.round(item.rating || 4))}
                  <span className="rating-count">(120)</span>
                </div>

                <p className="price">₹ {item.priceAfterDiscount}</p>

                {/* BUTTONS */}
                <div className="button-group">
                  <button
                    className="add-btn view-btn"
                    onClick={() =>
                      navigate(`/NewArrivalsProductDetails/${item._id}`)
                    }
                  >
                    View
                  </button>

                  <button
                    className="add-btn cart-btn"
                    onClick={() => {
                      dispatch(
                        addToCart({
                          _id: item._id,
                          name: item.productName,
                          price: item.priceAfterDiscount,
                          image: imageUrl,
                        })
                      );

                      setIsCartOpen(true);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NewArrivalsPage;