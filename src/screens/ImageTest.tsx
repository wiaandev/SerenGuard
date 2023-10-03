import {
  View,
  Text,
  Image,
  TouchableOpacityComponent,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { apiKey } from "../../config/api";

export default function ImageTest() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [labels, setLabels] = useState([]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const analyzeImage = async () => {
    try {
      if (!imageUri) {
        alert("Please select an image!");
        return;
      }

      //API Key
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      //read the image file and convert to base64
      const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiUrl, requestData);
      setLabels(apiResponse.data.responses[0].labelAnnotations);
    } catch (error) {
      console.log(error);
      alert("Error analyzing image. Please try again later.");
    }
  };
  return (
    <SafeAreaView>
      <Text>This is an image being tested...</Text>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />
      )}

      <TouchableOpacity onPress={pickImage}>
        <Text>Pick an Image</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={analyzeImage}>
        <Text>Analyze it</Text>
      </TouchableOpacity>
      {
        labels.length > 0 && (
            <View>
                <Text>Labels: </Text>
                {
                    labels.map((label) => (
                        <Text key={label.mid}>
                            {label.description}
                        </Text>
                    ))
                }
            </View>
        )
      }
    </SafeAreaView>
  );
}
