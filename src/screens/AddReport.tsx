import { View, Text, Image } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Menu, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { pickImage } from "../utils/functions/pickImage";
import { analyzeImage } from "../services/google-cloud";
import { getCurrentUser } from "../firebase/firebase-auth";
import { onCreateReport } from "../firebase/firebase-db";
import { CrimeTypes } from "../constants/enums/CrimeType";
import { UserLocationContext } from "../context/user-location.context";

const defaultValues = {
  name: "",
  crimeType: "",
};

export default function AddReport() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState(defaultValues);
  const { name, crimeType } = values;
  const uid = getCurrentUser()?.uid;

  const [visible, setVisible] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState("");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onCrimeSelected = (crime: string) => {
    setSelectedCrime(crime);
    closeMenu();
  };

  //states for file uploading
  const [uploading, setUploading] = useState(false);

  const navigator = useNavigation();

  console.log("labels: ", labels);

  const onSubmitReport = async () => {
    console.log("start of function");
    await onCreateReport({
      name: values.name,
      img: imageUri,
      crimeType: selectedCrime,
      labels: labels,
      uid: uid,
      lat: location.coords.latitude,
      long: location.coords.longitude
    });
    console.log("end of adding function");
  };

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

      <TextInput
        mode="flat"
        label={"Report Name"}
        value={name}
        autoCapitalize="none"
        onChangeText={(formValue) => setValues({ ...values, name: formValue })}
      />

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Select Violation</Button>}
      >
        {CrimeTypes.map((crime) => (
          <Menu.Item
            title={crime}
            key={crime}
            onPress={() => onCrimeSelected(crime)}
          />
        ))}
      </Menu>
      <Text>{selectedCrime}</Text>
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
        // onPress={() => uploadMedia({ setUploading, setImageUri, imageUri })}
        onPress={onSubmitReport}
        disabled={labels.length < 1}
      >
        Add Report
      </Button>

      <Text>{getCurrentUser()?.displayName}</Text>
    </SafeAreaView>
  );
}
