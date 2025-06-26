import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // Removed Router
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Contact from './components/ContactForm';
import Reset from "./components/reset";
import OrderForm from './pages/OrderForm';
import OrderPage from './pages/OrderPage';
import AuthPage from './pages/AuthPage';

import './styles.css';
import './css/Popup.css';
import './css/navbar.css';
import './css/Categories.css';
import './css/cart.css';
import './css/Products.css';
import './css/footer.css';
import './css/contactForm.css';
import './css/AuthPage.css';
import './css/Orders.css';

const App = () => {
  const [signedInUser, setSignedInUser] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const handleSignInSuccess = (userData) => {
    setSignedInUser(userData);
    localStorage.setItem('signedInUser', JSON.stringify(userData));

    // Auto sign-out after 15 minutes
    setTimeout(() => {
      handleSignOut();
    }, 15 * 60 * 1000);
  };

  const handleSignOut = () => {
    setSignedInUser(null);
    localStorage.removeItem('signedInUser');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('signedInUser');
    if (storedUser) {
      setSignedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, count: 1 }];
      }
    });
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemId);
      if (existingItem) {
        if (existingItem.count > 1) {
          return prevItems.map((item) =>
            item.id === itemId ? { ...item, count: item.count - 1 } : item
          );
        } else {
          return prevItems.filter((item) => item.id !== itemId);
        }
      } else {
        return prevItems;
      }
    });
  };

  const handleOrderSubmitted = () => {
    setCartItems([]);
  };

  return (
    <div>
      <Navbar 
        signedInUser={signedInUser} 
        cartItems={cartItems} 
        handleSignOut={handleSignOut} 
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<AuthPage handleSignInSuccess={handleSignInSuccess} />} />
          <Route path="/signup" element={<AuthPage handleSignInSuccess={handleSignInSuccess} />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orderform" element={<OrderForm />} />
          <Route path="/order" element={<OrderPage signedInUser={signedInUser} />} />
          <Route path="/products" element={<Products cartItems={cartItems} handleAddToCart={handleAddToCart} setCartItems={setCartItems} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeItem={handleRemoveItem} handleOrderSubmitted={handleOrderSubmitted} />} />
          
          {/* Redirect all unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
