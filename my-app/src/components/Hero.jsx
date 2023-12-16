import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { motion } from "framer-motion";
import { formStore } from "../stores/FormStore";
import MultiStepForm from "./BookingComponents/MultiStepForm";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import NavBar from './HeroComponents/NavBar';
import Footer from './HeroComponents/Footer';


const Hero = observer(() => {



  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

  }, []);

    return (
      
      <div className="min-h-screen flex flex-col">
      <NavBar></NavBar>
      <div className="flex flex-1 justify-center items-center p-4">
        <Helmet>
          <title>Venatic</title>
        </Helmet>  
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            Perfect Portraits
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            for every
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            season of life.
          </h3>
          <div className="mt-4 md:mt-8 text-lg md:text-xl">
            Feel the Magic of Each Moment, Forever.
          </div>
          <Link to="/booking" className="mt-4 md:mt-8"></Link>

        </div>
        <div className="order-last md:order-last flex justify-center md:justify-end">
          <div className="w-full md:min-w-[500px] md:w-1/2 bg-slate-50 rounded-xl">
            <MultiStepForm />
          </div>
        </div>
      </div>

    </div>
    <Footer></Footer>    

    </div>
  );
});

export default Hero;
