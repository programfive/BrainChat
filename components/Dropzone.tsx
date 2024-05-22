"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IoClose } from "react-icons/io5";
import { FaFile, FaFilePdf, FaFileVideo } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
interface DropzoneProps {
  onFileUpload: (file: File) => void;
  children: React.ReactNode;
  onClose: () => void;
  setFilePreview: any;
  filePreview: File | null;
  setPreviewUrl: any | null;
  previewUrl: string;
}

const Dropzone: React.FC<DropzoneProps> = ({
  onFileUpload,
  children,
  onClose,
  setFilePreview,
  setPreviewUrl,
  previewUrl,
  filePreview,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const newFile = acceptedFiles[0];
        setFilePreview(newFile);
        onFileUpload(newFile);
        if (newFile.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(newFile);
        } else {
          setPreviewUrl(null);
        }
      }
    },
    [onFileUpload, setFilePreview, setPreviewUrl]
  );

  const handleClearFile = () => {
    setFilePreview(null);
    setPreviewUrl(null);
    onClose();
  };

  const video = [".mp4", ".mp3", ".mov", ".avi"];
  const image = [".jpg", ".jpeg", ".png", ".gif"];
  const pdf = [".pdf"];
  const document = [".doc", ".docx"];

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": image,
      "video/*": video,
      "application/pdf": pdf,
      "application/msword": document,
    },
  });

  const fileExtension = "." + filePreview?.name.split(".").pop();

  return (
    <>
      <motion.div
        className="absolute bottom-20 z-40"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
      >
        {previewUrl && (
          <div className="rounded-lg overflow-hidden">
            <Image
              className="bg-white dark:bg-background"
              src={previewUrl}
              alt="Preview image"
              width={300}
              height={300}
            />
          </div>
        )}
        {filePreview && !previewUrl && (
          <div className=" bg-gray-100 dark:bg-background  border border-border  shadow-sm rounded-lg overflow-hidden sm:w-64 w-52 h-24 p-4">
            {document.includes(fileExtension!) && (
              <div className="flex gap-2 items-center dark:text-white text-gray-600  h-full">
                <FaFile size={35} />
                <span className="ml-2 truncate text-foreground dark:text-muted-foreground text-base ">
                  {filePreview.name}
                </span>
              </div>
            )}
            {video.includes(fileExtension!) && (
              <div className="flex gap-2 items-center dark:text-white text-gray-600  h-full">
                <FaFileVideo size={35} />
                <span className="ml-2 truncate text-foreground dark:text-muted-foreground text-base ">
                  {filePreview.name}
                </span>
              </div>
            )}
            {pdf.includes(fileExtension!) && (
              <div className="flex gap-2 items-center dark:text-white text-gray-600  h-full">
                <FaFilePdf size={35} />
                <span className="ml-2 truncate text-foreground dark:text-muted-foreground text-base ">
                  {filePreview.name}
                </span>
              </div>
            )}
          </div>
        )}
        {filePreview && (
          <div className="bg-white dark:bg-background p-1 rounded-full flex items-center justify-center m-2 absolute top-0 right-0">
            <button onClick={handleClearFile}>
              <IoClose size={20} />
            </button>
          </div>
        )}
      </motion.div>
      <div {...getRootProps()}>
        <input {...getInputProps()} ref={inputRef} />
        {children}
      </div>
    </>
  );
};

export default Dropzone;
