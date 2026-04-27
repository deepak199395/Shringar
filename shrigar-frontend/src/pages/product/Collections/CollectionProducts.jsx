import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Collections/CollectionProducts.css";
import Header from "../../../components/layout/Header/Header";
import { useCart } from "../../../components/context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { productRequest } from "../../../ReduxToolkit/productSlice";
import CustomModal from "../../../CustomComponents/CustomModal";
import { trackScreen, trackAction } from "../../../utils/analytics";

const CollectionProducts = () => {
  const { collectionId } = useParams();
  const { addToCart } = useCart();
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const { products, loading } = useSelector((state) => state.products);

  /* 🟢 TRACK PRODUCT LIST VIEW */
  useEffect(() => {
    trackScreen("PRODUCT_LIST_VIEW", "isProductList", collectionId);
  }, [collectionId]);

  useEffect(() => {
    if (collectionId) {
      dispatch(productRequest(collectionId));
    }
  }, [collectionId, dispatch]);

  if (loading) {
    return <p className="status-text">Loading products...</p>;
  }

  if (!products.length) {
    return <p className="status-text">No products found.</p>;
  }

  return (
    <div className="collection-products-page">
      <Header />

      <div className="product-grid">
        {products.map((item) => {
          const finalPrice =
            item.discountPercentage > 0
              ? Math.round(
                  item.originalPrice -
                    (item.originalPrice * item.discountPercentage) / 100
                )
              : item.originalPrice;

          return (
            <div className="product-card" key={item._id}>
              
              <div className="product-image">
                <img src={item.image} alt={item.productName} />

                {!item.inStock && (
                  <span className="stock-badge">Out of Stock</span>
                )}

                {item.discountPercentage > 0 && (
                  <span className="discount-badge">
                    {item.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <div className="product-info">
                <h4 className="product-title">{item.productName}</h4>

                {/* DESCRIPTION */}
                <p
                  className={`product-desc ${
                    expandedId === item._id ? "expanded" : ""
                  }`}
                >
                  {item.description}
                </p>

                {item.description?.length > 80 && (
                  <span
                    className="see-more"
                    onClick={() => {
                      setExpandedId(
                        expandedId === item._id ? null : item._id
                      );

                      // 🔥 USER ENGAGEMENT
                      trackAction("EXPAND_DESCRIPTION", item._id);
                    }}
                  >
                    {expandedId === item._id ? "See less" : "See more"}
                  </span>
                )}

                {/* PRICE */}
                <div className="product-price">
                  <span className="final-price">₹{finalPrice}</span>

                  {item.discountPercentage > 0 && (
                    <span className="original-price">
                      ₹{item.originalPrice}
                    </span>
                  )}
                </div>

                {/* 🔥 ADD TO CART */}
                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    addToCart(item);

                    // ✅ ACTION (correct)
                    trackAction("ADD_TO_CART", item._id);

                    setPopupMessage("✅ Product added to cart!");
                    setShowPopup(true);
                  }}
                >
                  Add to Cart
                </button>

              </div>
            </div>
          );
        })}
      </div>

      <CustomModal
        show={showPopup}
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />

    </div>
  );
};

export default CollectionProducts;