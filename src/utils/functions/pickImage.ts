import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

type pickImageProps = {
  setImageUri: (result: string) => void;
};

export const takePhoto = async ({ setImageUri }: pickImageProps) => {
  try {
    const result = Camera.useCameraPermissions();
    console.log(result);
    // const permission = await permissions.getAsync(permissions.CAMERA);
    // if (permission.status !== "granted") {
    // const newpermission = await permissions.askAsync(permissions.CAMERA);
    // if (newpermission.status === "granted") {
    //its granted.
    let imageResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.7,
    });
    if (!imageResult.canceled) {
      setImageUri(imageResult.assets[0].uri);
    }
    console.log(result);
    // }
    // }
  } catch (error) {
    console.log(error);
  }
};

export const pickImage = async ({ setImageUri }: pickImageProps) => {
  try {
    // const permission = await permissions.getAsync(permissions.CAMERA);
    // if (permission.status !== "granted") {
    // const newpermission = await permissions.askAsync(permissions.CAMERA);
    // if (newpermission.status === "granted") {
    //its granted.
    let imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.7,
    });
    if (!imageResult.canceled) {
      setImageUri(imageResult.assets[0].uri);
    }
    console.log(imageResult);
    // }
    // }
  } catch (error) {
    console.log(error);
  }
};
