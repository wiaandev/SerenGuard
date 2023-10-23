import * as ImagePicker from "expo-image-picker";

type pickImageProps = {
    setImageUri: (result: string) => void;
}

export const pickImage = async ({setImageUri}: pickImageProps) => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.7,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };