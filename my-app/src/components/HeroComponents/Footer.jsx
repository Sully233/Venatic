import React from "react"
import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-white shadow-md p-4 text-center">
        <div className="footer-links flex justify-center gap-4">
          <Link to="/terms" className="hover:text-blue-500 transition duration-300">Terms and Conditions</Link>
          <Link to="/about" className="hover:text-blue-500 transition duration-300">About</Link>
        </div>
      </footer>
    );
  };


export default Footer;