import { SHOP_BY_BUDGET } from "../../config/budget.config";
import "./ShopByBudget.css";

const ShopByBudget = () => {
  return (
    <section className="budget-section">
      <h2 className="budget-heading">SHOP BY BUDGET</h2>

      <div className="budget-grid">
        {SHOP_BY_BUDGET.map((item, index) => (
          <div className="budget-card" key={index}>
            <span className="budget-label">{item.label}</span>
            <span className="budget-price">₹ {item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByBudget;
