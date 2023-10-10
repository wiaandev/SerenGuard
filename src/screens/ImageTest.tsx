import {
  View,
  Text,
  Image,
  TouchableOpacityComponent,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { apiKey } from "../../config/api";

import { firebase } from "../../config/config";
import { Button } from "react-native-paper";

export default function ImageTest() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [labels, setLabels] = useState([]);

  //states for file uploading
  const [uploading, setUploading] = useState(false);

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

  //upload media files
  const uploadMedia = async () => {
    setUploading(true);
    try {
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
      {labels.length > 0 && (
        <View>
          <Text>Labels: </Text>
          {labels.map((label: any) => (
            <Text key={label.mid}>{label.description}</Text>
          ))}
        </View>
      )}

      <Button icon={"cloud-upload"} mode="outlined" onPress={uploadMedia}>
        Upload to Firebase
      </Button>
    </SafeAreaView>
  );
}
