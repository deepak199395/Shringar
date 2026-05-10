import { Link } from "react-router-dom";
import { SECONDARY_NAV } from "../../config/navigation.config";
import "./SecondaryNav.css";
import CustomModal from "../../CustomComponents/CustomModal"
import { useState } from "react";
const SecondaryNav = () => {
    const [showModal, setShowModal] = useState(false);
const handleClick = (e) => {
    e.preventDefault(); // 🚫 stop navigation
    setShowModal(true);
  };
  return (
    <>
    <nav className="secondary-nav">
      <ul className="secondary-nav-list">

          {SECONDARY_NAV.map((item) => (
            <li key={item.label}>
              <Link to={item.path} onClick={handleClick}>
                {item.label}
              </Link>
            </li>
          ))}

        </ul>
    </nav>
    <CustomModal
        show={showModal}
        message="🚧 This section is coming soon!"
        onClose={() => setShowModal(false)}
      />
    </>
   
  );
};

export default SecondaryNav;
