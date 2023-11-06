import { View, Text, Image, Dimensions, ScrollView, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Chip,
  Divider,
  Menu,
  Modal,
  TextInput,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { pickImage, takePhoto } from "../utils/functions/pickImage";
import { analyzeImage } from "../services/google-cloud";
import { getCurrentUser } from "../firebase/firebase-auth";
import { onCreateReport } from "../firebase/firebase-db";
import CrimeType, { CrimeTypes } from "../constants/enums/CrimeType";
import { UserLocationContext } from "../context/user-location.context";
import * as Location from "expo-location";
import { colors } from "../utils/colors";
import { Timestamp } from "firebase/firestore";
import DropDown from "react-native-paper-dropdown";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import ReportModal from "../components/custom/ReportModal";

const defaultValues = {
  name: "",
  crimeType: "",
};

type AddReportScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Report">;
};

export default function AddReport({ navigation }: AddReportScreenProps) {
  const { location, setLocation } = useContext(UserLocationContext);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>();
  const [district, setDistrict] = useState<string | null>("");
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState(defaultValues);
  const { name, crimeType } = values;
  const uid = getCurrentUser()?.uid;

  const [showModal, setShowModal] = useState<boolean>(false);

  const [visible, setVisible] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState("");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onCrimeSelected = (crime: string) => {
    setSelectedCrime(crime);
    closeMenu();
  };

  // Dropdown states
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

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
    setDistrict(reverseGeoCodeAddress[0].district);
  };

  const onSubmitReport = async () => {
    await convertToAddress().then((res) => console.log("RES ", res));
    if (address) {
      let reportAdded = await onCreateReport({
        name: values.name,
        img: imageUri,
        crimeType: selectedCrime,
        labels: labels,
        uid: uid,
        lat: location.coords.latitude,
        long: location.coords.longitude,
        address: address,
        neighbourhood: district,
        createdAt: Timestamp.now(),
      });
      if (reportAdded) {
        // Alert.alert("Success", "Report added successfully", [
        //   { text: "OK", onPress: () => navigation.navigate("Home") },
        // ]);
        setShowModal(true);
      }
    }
  };

  const onNavigateBack = () => {
    navigation.navigate("Home");
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

        <View style={{ marginTop: 20 }}>
          <DropDown
            label={"Crime Type"}
            mode="flat"
            visible={showMultiSelectDropDown}
            showDropDown={() => setShowMultiSelectDropDown(true)}
            onDismiss={() => setShowMultiSelectDropDown(false)}
            value={selectedCrime}
            list={CrimeTypes.map((crime) => ({ label: crime, value: crime }))}
            setValue={setSelectedCrime}
            multiSelect={false}
            dropDownItemTextStyle={{ color: "white" }}
          />
        </View>
        <Button
          mode="outlined"
          icon={"image"}
          onPress={() => pickImage({ setImageUri })}
          style={{
            marginBottom: 10,
            borderColor: colors.orange,
            padding: 20,
            marginVertical: 30,
          }}
        >
          <Text>Pick from gallery</Text>
        </Button>

        <Text>{selectedCrime}</Text>
        <Button
          mode="contained"
          onPress={() => analyzeImage({ imageUri, setLabels })}
          style={{ marginBottom: 10, backgroundColor: colors.orange }}
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
          style={{ marginVertical: 20, backgroundColor: colors.orange }}
        >
          Submit Report
        </Button>
        {showModal && (
          <ReportModal
            vicinity={district}
            modalVisible={showModal}
            setModalVisible={setShowModal}
            navigateToHome={onNavigateBack}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
