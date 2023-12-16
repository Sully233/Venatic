import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { motion } from "framer-motion";
import { formStore } from "../stores/FormStore";
import MultiStepForm from "./BookingComponents/MultiStepForm";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import NavBar from "./HeroComponents/NavBar";
import Footer from "./HeroComponents/Footer";
import ShuffleHero from "./ShuffleHero";
import "./hero.css";

const Hero = observer(() => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  // return (
  //     <ShuffleHero></ShuffleHero>
  // );

  return (


    <div className="flex flex-col">
      {/* Navbar */}
      <NavBar></NavBar>

      <div className="shuffle-hero">
      <ShuffleHero></ShuffleHero>

      </div>

      {/* Form Container */}
      <div className="flex justify-center w-full p-4 md:p-4 md:py-0 py-16">
        <div className="bg-slate-50 rounded-xl w-full md:min-w-[500px] md:w-1/2 mx-auto">
          <MultiStepForm></MultiStepForm>
        </div>
      </div>
      
      {/* Footer */}
      <div className="py-16">

      <Footer></Footer>  

      </div >

    </div>
  );
});

export default Hero;
