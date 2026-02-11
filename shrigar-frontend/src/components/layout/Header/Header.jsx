import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../../../assets/images/logo.jpeg";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const closeMenu = () => setMenuOpen(false);

  // ✅ Total cart quantity
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

        {/* Cart with count */}
        <Link to="/cart" className="cart-link">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        <Link to="/account">Account</Link>
      </nav>

      {/* Hamburger */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      ></button>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${menuOpen ? "show" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/shop" onClick={closeMenu}>
          Shop
        </Link>

        {/* Cart with count (mobile) */}
        <Link to="/cart" className="cart-link">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        <Link to="/account" onClick={closeMenu}>
          Account
        </Link>
      </nav>
    </header>
  );
};

export default Header;
