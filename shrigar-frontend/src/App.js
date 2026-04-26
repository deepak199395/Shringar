import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import LoginScreen from "./store/auth/LoginScreen";
import RegisterUserScreen from "./store/auth/RegisterUserScreen";
import Collections from "./pages/product/Collections/Collections";
import CollectionProducts from "./pages/product/Collections/CollectionProducts";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import PlaceOrder from "./Payment/PlaceOrder";
import SignUp from "./Auth/Register/SignUp";
import SignIn from "./Auth/Login/SignIn";
import Orders from "./pages/Orders/Orders";
import Shop from "./components/layout/Header/Shop";
import TrackPackage from "./components/layout/Header/SubHeader/TrackPackage/TrackPackage";
import ReturnExchange from "./components/layout/Header/SubHeader/Return&Exchange/ReturnExchange";
import ContactUs from "./components/layout/Header/SubHeader/ContactUs/ContactUs";
import Account from "./components/layout/Header/SubHeader/Account/Account";
import ProductDetails from "./components/layout/Header/ProductDetails";
import { exitScreen } from "./utils/analytics";
const App = () => {
  
  // 🔴 GLOBAL EXIT TRACKING
  useEffect(() => {
    const handleExit = () => {
      exitScreen();
    };
    // 🔥 Tab close / refresh
    window.addEventListener("beforeunload", handleExit);
    // 🔥 Tab switch / minimize
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        exitScreen();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("beforeunload", handleExit);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/header" element={<Header />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/registeruser" element={<RegisterUserScreen />} />
          <Route path="/ProdCollections" element={<Collections />} />
          <Route
            path="/collection/:collectionId"
            element={<CollectionProducts />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/PlaceOrder" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/track-order" element={<TrackPackage />} />
          <Route path="/returns" element={<ReturnExchange />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/account" element={<Account />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
