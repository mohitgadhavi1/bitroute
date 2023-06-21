import React, { useRef, useState } from "react";

const HoverMenu = ({ children, items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMenuOpen = () => {
    // Handle menu open logic here
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    // Handle menu close logic here
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  const handleMenuHover = () => {
    clearTimeout(timeoutRef.current);
  };

  return (
    <div className="relative">
      <button
        onMouseEnter={handleMenuOpen}
        onMouseLeave={handleMenuClose}
        className="text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
      >
        {children}
      </button>
      {isMenuOpen && (
        <div
          className="absolute  right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10 "
          onMouseEnter={handleMenuHover}
          onMouseLeave={handleMenuClose}
        >
          {items.map((item, i) => {
            return (
              <a
                href="#"
                key={i}
                className="block py-2 px-4  hover:bg-gray-100"
              >
                {item}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HoverMenu;
