import React, { useState, useRef } from "react";
import { addressStore } from "../../../stores/AddressStore";
import { motion, AnimatePresence } from "framer-motion";
import { CubeIcon } from "@heroicons/react/24/outline";
import "../form.css";
import NextButton from "../Buttons/NextButton";

const StepOne = ({
  register,
  errors,
  onNext,
  initialSize = "small",
  initialDuration = 1,
}) => {
  const [selectedSize, setSelectedSize] = useState(addressStore.selectedSize);
  const [duration, setDuration] = useState(addressStore.duration);
  const [popover, setPopover] = useState({
    show: false,
    content: "",
    position: {},
  });
  const containerRef = useRef(null);

  const sizes = [
    {
      key: "small",
      name: "Small",
      description: "Perfect for individual projects.",
    },
    { key: "medium", name: "Medium", description: "Great for small teams." },
    { key: "large", name: "Large", description: "Ideal for larger projects." },
    {
      key: "extraLarge",
      name: "Extra Large",
      description: "Best for enterprise-scale solutions.",
    },
  ];

  const calculatePrice = (sizeKey, dur) => {
    const basePrice = { small: 50, medium: 75, large: 100, extraLarge: 150 };
    return basePrice[sizeKey] * dur;
  };

  const [price, setPrice] = useState(
    calculatePrice(initialSize, initialDuration)
  );

  const selectSize = (sizeKey) => {
    setSelectedSize(sizeKey);
    setPrice(calculatePrice(sizeKey, duration));
    addressStore.setSelectedSize(sizeKey);
  };

  const handleSelectDuration = (newDuration) => {
    setDuration(newDuration);
    setPrice(calculatePrice(selectedSize, newDuration));
    addressStore.setDuration(newDuration);
  };

  const handleShowPopover = (size, event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setPopover({
      show: true,
      content: size.description,
      position: {
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + buttonRect.width / 2 + window.scrollX,
      },
    });
  };

  return (
    <div className="space-y-6 relative" ref={containerRef}>
      {popover.show && (
        <div
          className="absolute z-10 p-4 bg-white rounded shadow"
          style={{
            top: popover.position.top,
            left: popover.position.left,
            transform: "translateX(-50%)",
          }}
        >
          <p>{popover.content}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {sizes.map((size) => (
          <div
            key={size.key}
            className={`p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer relative ${
              selectedSize === size.key ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => selectSize(size.key)}
          >
            <CubeIcon
              className={`w-5 h-5 mb-2 ${
                selectedSize === size.key ? "text-blue-500" : "text-gray-700"
              }`}
            />
            <span
              className={`text-gray-700 ${
                selectedSize === size.key ? "text-blue-500" : "text-gray-700"
              }`}
            >
              {size.name}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        {Array.from({ length: 6 }, (_, i) => i + 1).map((dur) => (
          <button
            key={dur}
            className={`px-4 py-2 rounded-lg text-sm font-medium border-2 ${
              duration === dur
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-300 text-gray-700"
            }`}
            onClick={() => handleSelectDuration(dur)}
          >
            {dur} hr{dur > 1 ? "s" : ""}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="p-6 border border-gray-200 shadow rounded-lg bg-white">
          <h2 className="text-4xl font-semibold text-gray-800">
            ${price.toFixed(2)}
          </h2>
        </div>
      </div>

      {errors.duration && (
        <p className="text-red-500 text-xs italic">{errors.duration.message}</p>
      )}

      {/* Right-aligned Next Button */}
      <div className="flex justify-end mt-4">
        <NextButton onClick={onNext}>Next</NextButton>
      </div>
    </div>
  );
};

export default StepOne;
