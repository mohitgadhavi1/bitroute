// "use client";

import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Popup = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0  bg-opacity-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white  relative min-w-[50vw] min-h-[50vh] max-w-[90vw] max-h-[90vh]  p-6 rounded-lg shadow-lg">
        <button
          className="absolute top-4 right-4 text-black hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
