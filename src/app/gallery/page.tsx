"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
}

const dummyImages: GalleryItem[] = [
  { id: 1, title: "Mountain View", imageUrl: "/images/img1.jpg" },
  { id: 2, title: "Sunset Beach", imageUrl: "/images/img2.jpg" },
  { id: 3, title: "City Lights", imageUrl: "/images/img3.jpg" },
  { id: 4, title: "Forest Trail", imageUrl: "/images/img4.jpg" },
  { id: 5, title: "Desert Dunes", imageUrl: "/images/img5.jpg" },
  { id: 6, title: "Snowy Peaks", imageUrl: "/images/img6.jpg" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const handleImageClick = (image: GalleryItem) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="px-80 py-60">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {dummyImages.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer group"
            onClick={() => handleImageClick(item)}
          >
            <div className="relative h-60 w-full overflow-hidden rounded-lg shadow-md">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="mt-2 text-center font-medium">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-lg p-4 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking on the image
          >
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-black text-xl font-bold hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-3 text-center">
              {selectedImage.title}
            </h2>
            <div className="relative w-full h-[60vh]">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
