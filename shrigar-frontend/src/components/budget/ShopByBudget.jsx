import React, { useEffect, useState } from "react";
import "./ShopByBudget.css";
import axios from "axios";

const ShopByBudget = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [loading, setLoading] = useState(true);

  // featch api
  const getUnderBudgetData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://api.shrigaar.com/api/v1/shringar/underBudget/list/api79",
      );
      if (response.data.success) {
        setBudgetData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // 🔥 On Load
  useEffect(() => {
    getUnderBudgetData();
  }, []);
  return (
    <section className="budget-section">
      <h2 className="budget-heading">SHOP BY BUDGET</h2>

      <div className="budget-grid">
        {loading ? (
          <p>Loading...</p>
        ) : (
          budgetData.map((item) => (
            <div className="budget-card" key={item._id}>
              {/* Image */}
              <img src={item.image} alt={item.title} className="budget-image" />
              {/* Title */}
              <span className="budget-label">{item.title}</span>
              {/* Amount */}
              <span className="budget-price">₹ {item.amount}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ShopByBudget;
