import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ sizeKey, onClose, sizes }) => {
  const size = sizes.find(s => s.key === sizeKey);

  // Simple and elegant entrance and exit animations
  const modalVariants = {
    hidden: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
    >
      <motion.div
        variants={modalVariants}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">{size?.name}</h2>
        <p>{size?.description}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
