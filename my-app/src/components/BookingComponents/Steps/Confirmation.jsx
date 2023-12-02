import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { formStore } from "../../../stores/FormStore";
import { motion, AnimatePresence } from "framer-motion";

import "../form.css";

const Confirmation = observer((allFields) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Please review your details:</h3>
      <p>
        <strong>First Name:</strong> {allFields.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {allFields.lastName}
      </p>
      <p>
        <strong>Email:</strong> {allFields.email}
      </p>
      <p>
        <strong>Phone:</strong> {allFields.phone}
      </p>
      <p>
        <strong>Address:</strong> {formStore.address}
      </p>
    </div>
  );
});

export default Confirmation;
