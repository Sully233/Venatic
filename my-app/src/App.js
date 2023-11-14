import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Booking from "./components/Booking";
import PaymentSuccess from "./components/PaymentComponents/PaymentSuccess";
import PaymentFailure from "./components/PaymentComponents/PaymnetFailure";
import 'flowbite';

import "./index.css";
import "./images.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/unsuccessful" element={<PaymentFailure />} />

      </Routes>
    </Router>
  );
}

export default App;
