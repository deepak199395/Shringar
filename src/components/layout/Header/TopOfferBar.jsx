import { TOP_OFFER } from "../../../config/header.config";
import "../Header/TopOfferBar.css";

const TopOfferBar = () => {
  if (!TOP_OFFER.enabled) return null;

  return (
    <div
      className="top-offer-bar"
      style={{
        backgroundColor: TOP_OFFER.backgroundColor,
        color: TOP_OFFER.textColor
      }}
    >
      <span className="offer-text">
        {TOP_OFFER.text}
        <span className="offer-subtext">
          {" "} / {TOP_OFFER.subText}
        </span>
      </span>
    </div>
  );
};

export default TopOfferBar;
