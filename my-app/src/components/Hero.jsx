import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="ml-5 mt-5">
      <h1 className="text-4xl font-bold leading-tight text-gray-900">
        Hypothetical Landing Page
      </h1>
      <div>Blah blah blah cool website!</div>
      <div>Lorem ipsum dolor would be nice if we knew what subsidiary we're doing!</div>
      <Link to="/booking">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-3">
          Book Now
        </button>
      </Link>
    </div>
  );
};

export default Hero;
