import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { analyzeImage } from "../services/google-cloud";
import { pickImage } from "../utils/functions/pickImage";
import { uploadMedia } from "../firebase/firebase-storage";

export default function ImageTest() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [labels, setLabels] = useState<string[]>([]);

  //states for file uploading
  const [uploading, setUploading] = useState(false);

  console.log("labels: ", labels)

  return (
    <SafeAreaView>
      <Text>This is an image being tested...</Text>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />
      )}

      <TouchableOpacity onPress={() => pickImage({ setImageUri })}>
        <Text>Pick an Image</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => analyzeImage({imageUri, setLabels} )}>
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

      <Button
        icon={"cloud-upload"}
        mode="outlined"
        onPress={() => uploadMedia({ setUploading, setImageUri, imageUri })}
      >
        Upload to Firebase
      </Button>
    </SafeAreaView>
  );
}
