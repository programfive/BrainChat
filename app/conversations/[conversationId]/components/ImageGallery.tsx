import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Button } from "@/components/ui/button";

interface ImageData {
  images: string[];
  imageSelectedIndex: number;
}

const ImageGallery: React.FC<ImageData> = ({ images, imageSelectedIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(imageSelectedIndex);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <button
        onClick={handlePrevImage}
        className="absolute hidden md:flex top-1/2 left-4 transform -translate-y-1/2 bg-electric-violet-500 p-4 rounded-full  justify-center items-center text-white md:left-8"
      >
        <MdArrowBackIos size={24} />
      </button>

      <button
        onClick={handleNextImage}
        className="absolute top-1/2 right-4  hidden md:flex  transform -translate-y-1/2 bg-electric-violet-500 p-4 rounded-full  justify-center items-center text-white md:right-8"
      >
        <MdArrowForwardIos size={24} />
      </button>
      <div className="z-50 space-y-4 overflow-x-auto  relative w-[850px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={images[currentIndex]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-auto"
          >
            <div className="relative  pb-[62.5%]">
              <Image
                src={images[currentIndex]}
                alt={`image ${currentIndex}`}
                objectFit="contain"
                className="rounded-lg"
                layout="fill"
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className=" flex md:hidden justify-center items-center gap-4">
          <Button
            variant="outline"
            className="focus:bg-primary focus:border-none focus:text-white"
            onClick={handleNextImage}
          >
            <MdArrowBackIos size={20} />
            <span>Previous</span>
          </Button>
          <Button
            variant="outline"
            className="focus:bg-primary focus:border-none focus:text-white"
            onClick={handlePrevImage}
          >
            <span>Next</span>
            <MdArrowForwardIos size={20} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
