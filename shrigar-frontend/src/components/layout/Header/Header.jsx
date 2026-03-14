import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../../../assets/images/logo.jpeg";
import { useCart } from "../../context/CartContext";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../ReduxToolkit/authSlice";

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { isSignIn, user } = useSelector((state) => state.auth);

  const { cartItems } = useCart();

  const closeMenu = () => setMenuOpen(false);

  // Cart total quantity
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <header className="header">

      {/* Logo */}
      <Link to="/" className="logo" onClick={closeMenu}>
        <img src={logo} alt="Shrigar Luxury Intimate Jewellery" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="nav desktop-nav">

        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        {/* Cart */}
        <Link to="/cart" className="cart-link">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        <Link to="/account">Account</Link>

        {/* Authentication */}
        {isSignIn ? (
          <div className="user-section">

            <span className="user-name">
              👤 {user?.name}
            </span>

            <button
              className="logout-btn"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>

          </div>
        ) : (
          <Link to="/SignIn">Login</Link>
        )}

      </nav>

      {/* Hamburger */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${menuOpen ? "show" : ""}`}>

        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/shop" onClick={closeMenu}>Shop</Link>

        <Link to="/cart" className="cart-link">
          🛒 Cart
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        <Link to="/account" onClick={closeMenu}>Account</Link>

        {isSignIn ? (
          <>
            <span className="mobile-user">👤 {user?.name}</span>

            <button
              className="logout-btn"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/SignIn" onClick={closeMenu}>
            Login
          </Link>
        )}

      </nav>

    </header>
  );
};

export default Header;