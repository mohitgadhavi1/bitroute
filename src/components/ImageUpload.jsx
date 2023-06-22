import React, { useState } from "react";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

 

  return (
    <div>
      <label
        title="upload image"
        htmlFor="imageUpload"
        className=" mb-2 cursor-pointer w-24 h-24 rounded-lg border-2 border-dashed
         border-gray-300 bg-gray-100 flex justify-center items-center"
      >
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="w-24 h-24 object-cover rounded-lg"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        )}
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="sr-only"
      />
      {selectedImage && (
        <div className="flex items-center mt-2">
          <p className="text-sm mr-2">{selectedImage.name}</p>
          <button
            onClick={handleRemoveImage}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
