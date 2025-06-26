import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css'
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };
  useEffect(() => {
    // Add event listener to close the menu when a link inside the menu is clicked
    const handleLinkClick = () => {
      setShowMenu(false);
    };

    const links = document.querySelectorAll('.nav-links a, .nav-links button');
    links.forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });

    return () => {
      // Clean up the event listener on unmount
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);
  return (
    <nav className={`navbar ${showMenu ? 'show' : ''}`}>
      <div className="navbar-container">
      <Link to="/" className="logo">
          <img src={require('../images/Tribal.png')} alt="" />
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`nav-links ${showMenu ? 'show' : ''}`}>
          <li>
            <Link to="/">ProductUpdate</Link>
          </li>
          <li>
            <Link to="/productform" onClick={closeMenu}>ProductForm</Link>
          </li>
          <li>
            <Link to="/message" onClick={closeMenu}>ContactMessages</Link>
          </li>
          <li>
            <Link to="/orderlist" onClick={closeMenu}>OrderList</Link>
          </li>
          <li>
          <Link to={{ pathname: "{Your frontend Server Link}" }} target="_blank">View Site</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
