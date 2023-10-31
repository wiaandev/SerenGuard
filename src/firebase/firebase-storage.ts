import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/config";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const uploadToStorage: any = async (
  fileUri: string,
  refName: string
) => {
  try {
    console.log("Busy Uploading...");
    const response = await fetch(fileUri);
    if (!response.ok) {
      throw new Error("Network request failed");
    }

    const blob: any = await response.blob();
    const uploadRef = ref(storage, refName);
    await uploadBytes(uploadRef, blob);
    blob.close();

    return getDownloadURL(uploadRef);
  } catch (error: any) {
    if (error.code === "storage/retry-limit-exceeded") {
      await delay(5000);
      return await uploadToStorage(fileUri, refName);
    } else {
      console.error("Error uploading to firebase storage", error);
      throw error;
    }
  }
};
