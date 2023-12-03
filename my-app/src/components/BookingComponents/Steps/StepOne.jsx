import React, { useState, useRef, useEffect } from "react";
import { formStore } from "../../../stores/FormStore";
import { motion, AnimatePresence } from "framer-motion";
import { CubeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import "../form.css";
import NextButton from "../Buttons/NextButton";
import Modal from "../Modals/Modal";

const StepOne = ({
  register,
  errors,
  onNext,
  initialSize = "small",
  initialDuration = 1,
}) => {
  const [selectedSize, setSelectedSize] = useState(formStore.selectedSize);
  const [duration, setDuration] = useState(formStore.duration);
  const [popover, setPopover] = useState({
    show: false,
    content: "",
    position: {},
  });
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalSize, setSelectedModalSize] = useState(null);
  const [price, setPrice] = useState(0);


  const sizes = [
    {
      key: "small",
      name: "Small",
      description: "Small text goes here.",
    },
    { key: "medium", name: "Medium", description: "Medium text goes here." },
    { key: "large", name: "Large", description: "Large text goes here." },
    {
      key: "extraLarge",
      name: "Extra Large",
      description: "XL text goes here.",
    },
  ];

  const fetchPrice = async (sizeKey, dur) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/api/booking/price?selection=${sizeKey}&duration=${dur}`
      );
      if (response.ok) {
        const data = await response.json();
        setPrice(data.price);
      } else {
        setPrice(0);
      }
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };


  useEffect(() => {
    if (price===0){
      fetchPrice(initialSize, initialDuration);
    }
  }, [initialSize, initialDuration]);

  const handleInfoClick = (sizeKey) => {
    setSelectedModalSize(sizeKey);
    setIsModalOpen(true);
  };

  const selectSize = (sizeKey) => {
    setSelectedSize(sizeKey);
    fetchPrice(sizeKey, duration);
    formStore.setSelectedSize(sizeKey);
  };

  const handleSelectDuration = (newDuration) => {
    setDuration(newDuration);
    fetchPrice(selectedSize, newDuration);
    formStore.setDuration(newDuration);
    //Cancel Existing Selections For Calendar
    formStore.setChosenAvailability(null);
    formStore.setDate(null);
  };

  return (
    <div className="space-y-6 relative" ref={containerRef}>
      <div className="grid grid-cols-2 gap-4">
        {sizes.map((size) => (
          <div
            key={size.key}
            className={`p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer relative ${
              selectedSize === size.key ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => selectSize(size.key)}
          >
            <InformationCircleIcon
              className="w-5 h-5 absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => handleInfoClick(size.key)}
            />
            <CubeIcon
              className={`w-5 h-5 mb-2 ${
                selectedSize === size.key ? "text-blue-500" : "text-gray-700"
              }`}
            />
            <span
              className={`text-gray-700 ${
                selectedSize === size.key ? "!text-blue-500" : "text-gray-700"
              }`}
            >
              {size.name}
            </span>
          </div>
        ))}
      </div>

      <div>
        <AnimatePresence>
          {isModalOpen && (
            <Modal
              sizeKey={selectedModalSize}
              onClose={() => setIsModalOpen(false)}
              sizes={sizes}
            />
          )}
        </AnimatePresence>
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

      <div className="flex justify-end mt-4">
        <NextButton onClick={onNext}>Next</NextButton>
      </div>
    </div>
  );
};

export default StepOne;
