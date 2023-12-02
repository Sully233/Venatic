import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { formStore } from "../../../stores/FormStore";
import { motion, AnimatePresence } from "framer-motion";
import { customerDetailsStore } from "../../../stores/CustomerDetailsStore";

import "../form.css";

const Confirmation = observer((allFields) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Please review your details:</h3>
      <p>
        <strong>First Name:</strong> {customerDetailsStore.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {customerDetailsStore.lastName}
      </p>
      <p>
        <strong>Email:</strong> {customerDetailsStore.email}
      </p>
      <p>
        <strong>Phone:</strong> {customerDetailsStore.phone}
      </p>
      <p>
        <strong>Address:</strong> {formStore.address}
      </p>
    </div>
  );
});

export default Confirmation;
