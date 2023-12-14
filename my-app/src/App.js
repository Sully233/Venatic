import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import PaymentSuccess from "./components/PaymentComponents/PaymentSuccess";
import PaymentFailure from "./components/PaymentComponents/PaymentFailure";

import "./index.css";
import "./images.css";
import MyPlacesAutocompletePage from "./components/addressSearchComponents/searchOptions";
import "react-day-picker/dist/style.css";
import Header from "./components/Header";
import ReactGA from "react-ga4";


function App() {

  ReactGA.initialize('G-70W43V359V')
  
  return (
    <div>
        <div className=""></div>
        <div></div>
        <Header />
        <div className="">
        <Router>
          <Routes>
            <Route path="/" element={<Hero />} />

            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/unsuccessful" element={<PaymentFailure />} />
            <Route
              path="/autocomplete"
              element={<MyPlacesAutocompletePage />}
            />
          </Routes>
        </Router>
        </div>
      
    </div>
  );
}

export default App;
