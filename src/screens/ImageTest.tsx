import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { analyzeImage } from "../services/google-cloud";
import { pickImage } from "../utils/functions/pickImage";
import { uploadMedia } from "../firebase/firebase-storage";
import { getCurrentUser, onLogOut } from "../firebase/firebase-auth";
import { useNavigation } from "@react-navigation/native";

export default function ImageTest() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [labels, setLabels] = useState<string[]>([]);

  //states for file uploading
  const [uploading, setUploading] = useState(false);

  const navigator = useNavigation();

  console.log("labels: ", labels);

  const logout = () => {
    onLogOut();
    navigator.navigate("Login" as never);
  };

  return (
    <SafeAreaView>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />
      )}

      <Button mode="contained" onPress={() => pickImage({ setImageUri })} style={{marginBottom: 10}}>
        <Text>Take photo</Text>
      </Button>

      <Button mode="contained" onPress={() => analyzeImage({ imageUri, setLabels })} style={{marginBottom: 10}}>
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
      >
        Upload to Firebase
      </Button>

      <Button icon={"logout"} mode="outlined" onPress={logout}>
        Log Out
      </Button>

      <Text>{getCurrentUser()?.displayName}</Text>
    </SafeAreaView>
  );
}
