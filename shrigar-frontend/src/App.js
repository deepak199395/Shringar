import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// 🔥 CONTEXT (IMPORTANT)
import { useCartUI } from "./context/CartUIContext";

// Layout
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

// Pages
import HomePage from "./pages/home/HomePage";
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
import Account from "./components/layout/Header/SubHeader/Account/Account";

import ProductDetails from "./components/layout/Header/ProductDetails";

import NewArrivalsPage from "./pages/NewArrivalsPage/NewArrivalsPage";
import ProductCard from "./pages/NewArrivalsPage/ProductCard";
import NewArrivalsProductDetails from "./pages/NewArrivalsPage/NewArrivalsProductDetails";

import AboutUs from "./pages/Company/AboutUs";
import ContactUs from "./pages/Company/ContactUs";
import Careers from "./pages/Company/Careers";

// 🔥 EXTRA COMPONENTS
import WhatsAppButton from "./pages/WhatsappBussines/WhatsAppButton";
import CartDrawer from "./components/cart/CartDrawer";

import { exitScreen } from "./utils/analytics";

const App = () => {

  // ✅ USE CONTEXT (IMPORTANT FIX)
  const { isCartOpen, setIsCartOpen } = useCartUI();

  // ✅ GET CART FROM REDUX
  const cartItems = useSelector((state) => state.cart.items);

  // 🔴 GLOBAL EXIT TRACKING
  useEffect(() => {
    const handleExit = () => exitScreen();

    window.addEventListener("beforeunload", handleExit);

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
    <BrowserRouter>

      {/* ✅ GLOBAL HEADER */}
      <Header />

      {/* ✅ ROUTES */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />

        <Route path="/login" element={<LoginScreen />} />
        <Route path="/registeruser" element={<RegisterUserScreen />} />

        <Route path="/ProdCollections" element={<Collections />} />
        <Route path="/collection/:collectionId" element={<CollectionProducts />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/track-order" element={<TrackPackage />} />
        <Route path="/returns" element={<ReturnExchange />} />
        <Route path="/account" element={<Account />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/NewArrivalsPage" element={<NewArrivalsPage />} />
        <Route path="/ProductCard" element={<ProductCard />} />
        <Route
          path="/NewArrivalsProductDetails/:id"
          element={<NewArrivalsProductDetails />}
        />

        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Careers" element={<Careers />} />
      </Routes>

      {/* ✅ GLOBAL FOOTER */}
      <Footer />

      {/* ✅ CART DRAWER (SIDE SLIDER) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />

      {/* ✅ WHATSAPP BUTTON */}
      <WhatsAppButton />

    </BrowserRouter>
  );
};

export default App;