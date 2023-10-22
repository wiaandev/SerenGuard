import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { pickImage } from "../utils/functions/pickImage";
import { analyzeImage } from "../services/google-cloud";
import { uploadMedia } from "../firebase/firebase-storage";
import { getCurrentUser } from "../firebase/firebase-auth";

export default function AddReport() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [labels, setLabels] = useState<string[]>([]);

  //states for file uploading
  const [uploading, setUploading] = useState(false);

  const navigator = useNavigation();

  console.log("labels: ", labels);

  return (
    <SafeAreaView>
      <Text onPress={() => navigator.navigate("Home" as never)}>Go Back</Text>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />
      )}

      <Button
        mode="contained"
        onPress={() => pickImage({ setImageUri })}
        style={{ marginBottom: 10 }}
      >
        <Text>Take photo</Text>
      </Button>
      
      <Button
        mode="contained"
        onPress={() => analyzeImage({ imageUri, setLabels })}
        style={{ marginBottom: 10 }}
        disabled={!imageUri}
      >
        <Text>Analyze it</Text>
      </Button>

      {labels.length > 0 && (
        <View>
          <Text>Labels: </Text>
          {labels.map((label: any) => (
            <Text key={label.mid}>{label.description}</Text>
          ))}
        </View>
      )}

        <Button
          icon={"cloud-upload"}
          mode="outlined"
          onPress={() => uploadMedia({ setUploading, setImageUri, imageUri })}
          disabled={labels.length < 1}
        >
          Upload to Firebase
        </Button>

      <Text>{getCurrentUser()?.displayName}</Text>
    </SafeAreaView>
  );
}
