import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Collections/CollectionProducts.css";
import Header from "../../../components/layout/Header/Header";
import Footer from "../../../components/layout/Footer/Footer";

const CollectionProducts = () => {
  const { collectionId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch & filter products by collectionId
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://devdeepak-backend-api-fbdhhyeddwbab9da.centralindia-01.azurewebsites.net/api/v1/shrigar/Collections/products/list/api56"
      );

      if (res?.data?.success && res?.data?.flage === "Y") {
        const filteredProducts = res.data.product.filter(
          (item) => item.collectionId === collectionId
        );

        setProducts(filteredProducts);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  // ✅ Call API when collectionId changes
  useEffect(() => {
    if (collectionId) {
      fetchProducts();
    }
  }, [collectionId, fetchProducts]);

  // ---------------- UI STATES ----------------

  if (loading) {
    return <p className="status-text">Loading products...</p>;
  }

  if (!products.length) {
    return <p className="status-text">No products found.</p>;
  }

  // ---------------- RENDER ----------------

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
              {/* IMAGE */}
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

              {/* INFO */}
              <div className="product-info">
                <h4 className="product-title">{item.productName}</h4>

                <div className="product-price">
                  <span className="final-price">₹{finalPrice}</span>

                  {item.discountPercentage > 0 && (
                    <span className="original-price">
                      ₹{item.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default CollectionProducts;
