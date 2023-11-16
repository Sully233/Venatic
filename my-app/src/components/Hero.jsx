import React from "react";
import { Link } from "react-router-dom";
import MyPlacesAutocompletePage from "./BookingComponents/searchOptions";

const Hero = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl grid grid-cols-2 gap-20">
        <div className="first-quarter flex flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight text-gray-900 whitespace-nowrap">
            Perfect Portraits
          </h1>
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            for every
          </h1>
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            season of life.
          </h1>
          <div className="mt-8 text-xl">
            Feel the Magic of Each Moment, Forever.
          </div>
          <Link to="/booking">
            <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-sm">
              BOOK A SESSION
            </button>
          </Link>
        </div>
        <MyPlacesAutocompletePage/>
      </div>
    </div>
  );
};

export default Hero;
