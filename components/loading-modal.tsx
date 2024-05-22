"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const modalAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
export const LoadingModal = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      {...modalAnimation}
      role="dialog"
      aria-live="polite"
      aria-label="Loading"
    >
      <ClipLoader size={40} color="#0284c7" />
    </motion.div>
  );
};
