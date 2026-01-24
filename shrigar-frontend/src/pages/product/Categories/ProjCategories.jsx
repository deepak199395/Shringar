import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../../APIs/CategoriesApi/Categories.api";
import "./Categories.css";

const ProjCategories = () => {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      console.log("FULL RESPONSE 👉", JSON.stringify(res, null, 2));

      
      if (res?.success && res?.flage === "Y" && Array.isArray(res.Allcategories)) {
        setCategories(res.Allcategories);
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
            <img
              src={item.image}
              alt={item.name}
            />
          </div>
          <p className="category-title">{item.name}</p>
        </div>
      ))}
    </div>
  </section>
);

};

export default ProjCategories;
