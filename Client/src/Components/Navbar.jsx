import React from 'react';
import { Link } from 'react-router-dom'; 
import '../Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
        <h1 className='Stores'>Amazon Stores</h1>
      <ul className="navbar-menu">
        <li>
          <Link to="/">Banners</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
