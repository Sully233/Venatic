import React from "react"
import { Link } from "react-router-dom";



const NavBar = () => {
    return (
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="logo">
          <Link to="/" className="text-xl font-bold">Venatic</Link>
        </div>
        <div className="nav-links flex gap-4">
          <Link to="/about" className="hover:text-blue-500 transition duration-300">About</Link>
          <Link to="/services" className="hover:text-blue-500 transition duration-300">Services</Link>
          <Link to="/contact" className="hover:text-blue-500 transition duration-300">Contact</Link>
          <Link to="/booking" className="hover:text-blue-500 transition duration-300">Booking</Link>
        </div>
      </nav>
    );
  };

  export default NavBar;