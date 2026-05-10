import React, { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";
import { BASE_URL, GET_CATEGORIES } from "../../../config/endpoints";

const ProjCategories = () => {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${GET_CATEGORIES.LIST}`);
      const data = res.data;

      if (data?.success && data?.flage === "Y" && Array.isArray(data.Allcategories)) {
        setCategories(data.Allcategories);
      } else {
        setCategories([]);
      }

    } catch (err) {
      console.error("Category fetch failed", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading Categories...</p>;

  return (
    <section className="category-section">
      <h2 className="category-heading">SHOP BY CATEGORIES</h2>

      <div className="category-grid">
        {categories.map((item) => (
          <div className="category-card" key={item._id}>
            <div className="category-image">
              <img src={item.image} alt={item.name} />
            </div>
            <p className="category-title">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjCategories;
