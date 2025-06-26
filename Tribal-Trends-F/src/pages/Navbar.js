import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/FloatingCartIcon.css';
import { SlBag } from "react-icons/sl";

const Navbar = ({ signedInUser, handleSignOut, cartItems }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <nav className={`navbar ${showMenu ? 'show' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src={require('../images/Tribal.png')} alt="Logo" />
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`nav-links ${showMenu ? 'show' : ''}`}>
          <li>
            <Link to="/home" onClick={() => setShowMenu(false)}>
              <strong>Home</strong>
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={() => setShowMenu(false)}>
              <strong>Products</strong> <SlBag />
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={() => setShowMenu(false)}>
              <div className="cart-icon">
                <i className="fas fa-shopping-cart"></i>
                {cartItems?.length > 0 && (
                  <span className="cart-item-count">{cartItems.length}</span>
                )}
              </div>
              <strong>Cart</strong>
            </Link>
          </li>
          <li className="dropdown-container" onClick={toggleDropdown}>
            <strong>Categories</strong>
            {showDropdown && (
              <ul className="dropdown-menu">
                {['Dresses', 'Tops', 'Pants', 'Shoes', 'Accessories'].map((category) => (
                  <li key={category}>
                    <Link to={`/${category.toLowerCase()}`} onClick={() => setShowMenu(false)}>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <Link to="/contact" onClick={() => setShowMenu(false)}>
              <strong>Contact</strong>
            </Link>
          </li>
          <li>
            <Link to="/order" onClick={() => setShowMenu(false)}>
              <strong>Orders</strong>
            </Link>
          </li>
          <li>
            {signedInUser?.name ? (
              <>
                <span>Welcome, <strong>{signedInUser.name}</strong></span>
                <Link onClick={handleSignOut}>
                  <strong>Sign Out</strong>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setShowMenu(false)}>
                  <strong>Sign In</strong>
                </Link>
                <Link to="/signup" onClick={() => setShowMenu(false)}>
                  <strong>Sign Up</strong>
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
