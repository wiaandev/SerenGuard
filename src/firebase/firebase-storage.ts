import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../config/config";
import { Alert } from "react-native";

type uploadProps = {
  setImageUri: (imageUri: string | null) => void;
  imageUri: string | null;
  setUploading: (uploading: boolean) => void;
};

//upload media files
export const uploadMedia = async ({
  setUploading,
  setImageUri,
  imageUri
}: uploadProps) => {
  setUploading(true);
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Media library access is required to select photos");
      return;
    }

    const { uri } = await FileSystem.getInfoAsync(imageUri as string);
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        reject(new TypeError("Network Request Failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileName: any = imageUri?.substring(imageUri?.lastIndexOf("/") + 1);
    const ref = firebase.storage().ref().child(fileName);

    await ref.put(blob);

    // this is the link that will be sent to the django/ postgreSQL
    const downloadURL = await ref.getDownloadURL();

    //add axios post to post image alongwith other things to the database

    setUploading(false);
    Alert.alert("Photo Uploaded!");
    setImageUri(null);
    console.log(downloadURL);
  } catch (error) {
    console.log(error);
    setUploading(false);
  }
};
