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

function App() {
  return (
    <div>
      <body className="h-[5000px]">
        <div className=""></div>
        <div></div>
        <Header />
        <div className="py-16 sm:py-16 md:py-16 lg:py-0 xl:py-0 2xl:py-0">
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
      </body>
      
    </div>
  );
}

export default App;
