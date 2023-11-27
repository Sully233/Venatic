import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import PaymentSuccess from "./components/PaymentComponents/PaymentSuccess";
import PaymentFailure from "./components/PaymentComponents/PaymentFailure";

import "./index.css";
import "./images.css";
import MyPlacesAutocompletePage from "./components/DatepickerComponents/searchOptions";
import 'react-day-picker/dist/style.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/unsuccessful" element={<PaymentFailure />} />
        <Route path="/autocomplete" element={<MyPlacesAutocompletePage />} />

      </Routes>
    </Router>
  );
}

export default App;
