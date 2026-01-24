import { Link } from "react-router-dom";
import { UTILITY_LINKS } from "../../../config/header.config";
import "../Header/UtilityHeader.css";

const UtilityHeader = () => {
  return (
    <div className="utility-header">
      <div className="utility-links">
        {UTILITY_LINKS.map((item) => (
          <Link key={item.label} to={item.path}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UtilityHeader;
