import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../../../assets/images/logo.jpeg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">

      {/* Logo */}
      <Link to="/" className="logo">
        <img src={logo} alt="Shrigar Luxury Intimate Jewellery" />
      </Link>

      {/* Desktop Nav */}
      <nav className="nav desktop-nav">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/account">Account</Link>
      </nav>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      <nav className={`mobile-nav ${menuOpen ? "show" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
        <Link to="/account" onClick={() => setMenuOpen(false)}>Account</Link>
      </nav>

    </header>
  );
};

export default Header;
