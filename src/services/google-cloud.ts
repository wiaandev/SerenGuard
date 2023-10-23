import { API_REQUEST } from "../../config/api";
import * as FileSystem from "expo-file-system";
import axios from "axios";

type analyzeImageProps = {
  imageUri: string | null;
  setLabels: (labels: string[]) => void;
};

export const analyzeImage = async ({
  imageUri,
  setLabels,
}: analyzeImageProps) => {
  console.log(imageUri);
  try {
    if (!imageUri) {
      alert("Please select an image!");
      return;
    }

    //API Key
    const apiUrl = API_REQUEST;

    //read the image file and convert to base64
    const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const requestData = {
      requests: [
        {
          image: {
            content: base64ImageData
          },
          features: [
            {
              "maxResults": 3,
              type: "LABEL_DETECTION"
            },
          ]
        }
      ]
    }

    console.log(requestData);
    const apiResponse = await axios.post(apiUrl, requestData);
    console.log(apiResponse.data);
    setLabels(apiResponse.data.responses[0].labelAnnotations);
  } catch (error) {
    console.log(error);
    alert("Error analyzing image. Please try again later.");
  }
};
