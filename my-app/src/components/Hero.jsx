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
import HorizontalScrollCarousel from "./HeroComponents/HorizontalScroll";
import Features from "./FeatureShowcase/Features";

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

      {/* Introduction Text & Gallery Shuffle */}
      <div className="shuffle-hero ">
        <ShuffleHero></ShuffleHero>
      </div>

      {/* Form Container */}
      <div className="flex justify-center w-full pt-60 px-4 md:pt-0">
        <div className="bg-slate-50 rounded-xl w-full md:min-w-[500px] md:w-1/2 mx-auto">
          <MultiStepForm></MultiStepForm>
        </div>
      </div>


      {/* Features */}
      <div>
        <Features></Features>
      </div>

      {/* Horizontal Image Gallery On Scroll */}
      <div>
        <HorizontalScrollCarousel></HorizontalScrollCarousel>
      </div>

      {/* Footer */}
      <div className="pt-16">
        <Footer></Footer>
      </div>
    </div>
  );
});

export default Hero;
