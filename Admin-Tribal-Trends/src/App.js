import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductUpdateForm from './components/ProductUpdateForm';
import ContactMessages from './components/ContactMessages';
import Navbar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import OrderList from './components/OrderList'; 
import './css/styles.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setLoggedIn(status);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            {/* Admin Login Route */}
            <Route 
              path="/adminlogin" 
              element={!isLoggedIn ? <AdminLogin handleLogin={handleLogin} /> : <Navigate to="/" />} 
            />

            {/* Protected Routes */}
            <Route 
              path="/" 
              element={isLoggedIn ? <ProductUpdateForm /> : <Navigate to="/adminlogin" />} 
            />
            <Route 
              path="/productform" 
              element={isLoggedIn ? <ProductForm /> : <Navigate to="/adminlogin" />} 
            />
            <Route 
              path="/productupdate" 
              element={isLoggedIn ? <ProductUpdateForm /> : <Navigate to="/adminlogin" />} 
            />
            <Route 
              path="/message" 
              element={isLoggedIn ? <ContactMessages /> : <Navigate to="/adminlogin" />} 
            />
            <Route 
              path="/orderlist" 
              element={isLoggedIn ? <OrderList /> : <Navigate to="/adminlogin" />} 
            />

            {/* Catch-All Redirect */}
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/adminlogin"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
