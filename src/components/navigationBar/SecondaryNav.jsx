import { Link } from "react-router-dom";
import { SECONDARY_NAV } from "../../config/navigation.config";
import "./SecondaryNav.css";

const SecondaryNav = () => {
  return (
    <nav className="secondary-nav">
      <ul className="secondary-nav-list">
        {SECONDARY_NAV.map((item) => (
          <li key={item.label}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SecondaryNav;
