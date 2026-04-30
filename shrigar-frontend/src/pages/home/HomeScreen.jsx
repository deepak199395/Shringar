import React, { useEffect } from "react";
import Carousel from "../../components/common/Carousel/Carousel";
import ProjCategories from "../product/Categories/ProjCategories";
import ShopByBudget from "../../components/budget/ShopByBudget";
import SecondaryNav from "../../components/navigationBar/SecondaryNav";
import Collections from "../product/Collections/Collections";
import { trackScreen, trackAction } from "../../utils/analytics";
import NewArrivalsPage from "../NewArrivalsPage/NewArrivalsPage";

const HomeScreen = () => {
  /* 🟢 TRACK HOME VIEW */
  useEffect(() => {
    trackScreen("HOME_VIEW", "isHome");
  }, []);

  return (
    <div>
      <SecondaryNav />

      {/* 🔥 Banner interaction */}
      <div onClick={() => trackAction("CLICK_BANNER")}>
        <Carousel />
      </div>

      {/* 🔥 Collection interaction */}
      <div onClick={() => trackAction("CLICK_COLLECTION")}>
        <Collections />
      </div>

      {/* 🔥 Category interaction */}
      <div onClick={() => trackAction("CLICK_CATEGORY")}>
        <ProjCategories />
      </div>
      <div onClick={() => trackAction("ClICK_NEW_ARRIVALS")}>
        <NewArrivalsPage />
      </div>
      {/* 🔥 Budget interaction */}
      <div onClick={() => trackAction("CLICK_BUDGET")}>
        <ShopByBudget />
      </div>

     
    </div>
  );
};

export default HomeScreen;
