import { motion, AnimatePresence } from "framer-motion";


const Modal = ({ sizeKey, onClose, sizes }) => {
    const size = sizes.find(s => s.key === sizeKey);
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
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