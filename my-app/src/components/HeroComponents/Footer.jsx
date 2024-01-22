import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../images/logo0.png";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://venatic.me/" className="flex items-center">
              <img src={logoImage} className="h-8 me-3" alt="Venatic Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                Venatic
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-black uppercase">
                Legal
              </h2>
              <ul className="text-black font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-black uppercase">
                Information
              </h2>
              <ul className="text-black font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Placeholder
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-black sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-black sm:text-center">
            © {new Date().getFullYear()}{" "}
            <a href="https://venatic.me/" className="hover:underline">
              Venatic
            </a>
            . All Rights Reserved.
          </span>{" "}
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {/* Social icons */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
