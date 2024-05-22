// useFileUpload.ts
import { uploadFile } from "@/lib/uploadFile";
import { useState } from "react";

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<Error | null>(null);

  const uploadFileAsync = async (file: File, folder: string) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const data = await uploadFile(file,folder);
      return data;
    } catch (error) {
      setUploadError(error as Error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadError, uploadFileAsync };
};
