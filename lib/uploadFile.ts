import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 } from "uuid";

export const uploadFile = async (file: File, folder: string) => {
  const fileRef = ref(storage, `${folder}/${v4()}`);
  const snapshot = await uploadBytes(fileRef, file);
  const name = file.name;
  const { contentType: type, size } = snapshot.metadata;
  const downloadURL = await getDownloadURL(snapshot.ref);
  return { downloadURL, type, size, name };
};

export const listFiles = async () => {
  const fileRefs = await listAll(ref(storage, "messages"));
  const downloadURLs = await Promise.all(
    fileRefs.items.map(async (fileRef) => await getDownloadURL(fileRef))
  );
  return downloadURLs;
};
