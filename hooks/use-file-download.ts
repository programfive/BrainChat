import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export const useFileDownload = (filePath: string) => {
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const downloadFile = async () => {
      try {
        const storage = getStorage();
        const fileRef = ref(storage, filePath);
        const url = await getDownloadURL(fileRef);
        setDownloadURL(url);
      } catch (error) {
        setError(error as Error);
      }
    };

    if (filePath) {
      downloadFile();
    }
  }, [filePath]);

  return { downloadURL, error };
};