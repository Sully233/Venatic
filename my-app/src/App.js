import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Booking from "./components/Booking";
import PaymentSuccess from "./components/PaymentComponents/PaymentSuccess";
import PaymentFailure from "./components/PaymentComponents/PaymentFailure";

import "./index.css";
import "./images.css";
import MyPlacesAutocompletePage from "./components/BookingComponents/searchOptions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/unsuccessful" element={<PaymentFailure />} />
        <Route path="/autocomplete" element={<MyPlacesAutocompletePage />} />

      </Routes>
    </Router>
  );
}

export default App;
