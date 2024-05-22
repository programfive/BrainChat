"use client";
import React, { useState } from "react";
import { useFileUpload } from "@/hooks/use-file-upload";

function FirebaseImageUpload() {
  const [img, setImg] = useState<File | null>(null);
  const { uploadFileAsync, isUploading, uploadError } = useFileUpload();
  const handleUpload = async () => {
    if (img) {
      const downloadURL = await uploadFileAsync(img);
    }
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => setImg(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload</button>
      <br />
    </div>
  );
}

export default FirebaseImageUpload;
