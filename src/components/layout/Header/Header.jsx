import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../../../assets/images/logo.jpeg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="logo" onClick={closeMenu}>
        <img src={logo || null} alt="Shrigar Luxury Intimate Jewellery" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="nav desktop-nav">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link> 
        <Link to="/account">Account</Link>
      </nav>

      {/* Hamburger */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${menuOpen ? "show" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/shop" onClick={closeMenu}>Shop</Link>
        <Link to="/cart" onClick={closeMenu}>Cart</Link>
        <Link to="/account" onClick={closeMenu}>Account</Link>
      </nav>
    </header>
  );
};

export default Header;
