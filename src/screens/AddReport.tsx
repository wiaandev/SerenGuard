import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Chip, Divider, Menu, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { pickImage } from "../utils/functions/pickImage";
import { analyzeImage } from "../services/google-cloud";
import { getCurrentUser } from "../firebase/firebase-auth";
import { onCreateReport } from "../firebase/firebase-db";
import { CrimeTypes } from "../constants/enums/CrimeType";
import { UserLocationContext } from "../context/user-location.context";
import * as Location from "expo-location";
import { colors } from "../utils/colors";
import { Timestamp } from "firebase/firestore";

const defaultValues = {
  name: "",
  crimeType: "",
};


export default function AddReport() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>();
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


  const convertToAddress = async () => {
    const reverseGeoCodeAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
    setAddress(
      `${reverseGeoCodeAddress[0].streetNumber} ${reverseGeoCodeAddress[0].street}, ${reverseGeoCodeAddress[0].district}, ${reverseGeoCodeAddress[0].city}, ${reverseGeoCodeAddress[0].postalCode}`
    );
  };

  const onSubmitReport = async () => {
    await convertToAddress().then((res) => console.log("RES ", res));
    if (address) {
      await onCreateReport({
        name: values.name,
        img: imageUri,
        crimeType: selectedCrime,
        labels: labels,
        uid: uid,
        lat: location.coords.latitude,
        long: location.coords.longitude,
        address: address,
        createdAt: Timestamp.now(),
      });
    }

  };

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 20, backgroundColor: colors.black }}
    >
      <ScrollView bounces={false}>
        <Text
          onPress={() => navigator.navigate("Home" as never)}
          style={{ color: colors.white }}
        >
          Go Back
        </Text>

        <Text
          style={{
            color: colors.white,
            fontSize: 30,
            fontWeight: "700",
            marginTop: 30,
          }}
        >
          Add Report
        </Text>

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: 350,
              height: 300,
              alignSelf: "center",
              borderRadius: 10,
              margin: 10,
            }}
          />
        )}

        <TextInput
          mode="flat"
          label={"Report Name"}
          value={name}
          autoCapitalize="none"
          onChangeText={(formValue) =>
            setValues({ ...values, name: formValue })
          }
          style={{ marginTop: 20, borderColor: colors.orange }}
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
              style={{ width: 100 }}
            />
          ))}
        </Menu>

        <Button
          mode="outlined"
          icon={!imageUri ? "camera-plus" : "file-replace"}
          onPress={() => pickImage({ setImageUri })}
          style={{
            marginBottom: 10,
            borderColor: colors.orange,
            padding: 20,
            marginVertical: 30,
          }}
        >
          <Text>{!imageUri ? "Take Photo" : "Change Photo"}</Text>
        </Button>
        <Text>{selectedCrime}</Text>
        <Button
          mode="contained"
          onPress={() => analyzeImage({ imageUri, setLabels })}
          style={{ marginBottom: 10 }}
          disabled={!imageUri}
        >
          <Text>Analyse Photo</Text>
        </Button>

        {labels.length > 1 && (
          <>
            <Divider
              bold={true}
              style={{ borderColor: "red", marginVertical: 20 }}
            />

            <Text
              style={{
                color: colors.white,
                fontWeight: "700",
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              Labels
            </Text>

            {labels.length > 0 && (
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  flex: 2,
                  flexWrap: "wrap",
                  padding: 20,
                  gap: 15,
                  backgroundColor: colors.orange_darker,
                  borderRadius: 10,
                }}
              >
                {labels.map((label: any) => (
                  <Chip key={label.mid}>{label.description}</Chip>
                ))}
              </View>
            )}

            <Divider
              bold={true}
              style={{ borderColor: "red", marginVertical: 20 }}
            />
          </>
        )}

        <Button
          icon={"cloud-upload"}
          mode="contained"
          // onPress={() => uploadMedia({ setUploading, setImageUri, imageUri })}
          onPress={onSubmitReport}
          disabled={labels.length < 1}
          style={{ marginVertical: 20 }}
        >
          Submit Report
        </Button>

        <Text>{getCurrentUser()?.displayName}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
