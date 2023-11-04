import { View, Text, Image, StyleSheet } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { colors } from "../utils/colors";
import DistrictMap from "../components/custom/DistrictMap";
import { getReportsByArea } from "../firebase/firebase-db";
import { useFocusEffect } from "@react-navigation/native";

interface DetailProps {
  details: GooglePlaceDetail;
  data: GooglePlaceData;
}

type DetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Detail">;
};

export default function NeighbourhoodDetail({
  route,
  navigation,
}: {
  route: { params: DetailProps };
  navigation: DetailScreenProps["navigation"];
}) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });

  const [reports, setReports] = useState([]);

  const { data, details } = route.params;
  console.log(data);
  console.log(details);
  useEffect(() => {
    setMapRegion({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, []);

  const getReports = async () => {
    const reports: any = await getReportsByArea(details?.vicinity);
    setReports(reports);
  };

  useFocusEffect(
    useCallback(() => {
      getReports();
    }, [])
  );

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.black, flex: 1, padding: 20 }}
    >
      <Text
        onPress={() => navigation.navigate("Home")}
        style={{ marginVertical: 10, color: colors.white }}
      >
        Go Back
      </Text>
      <Text style={styles.heading}>{details?.vicinity}</Text>
      <Text style={styles.subHeading}>
        {details?.address_components[2].long_name}
      </Text>
      <Text style={styles.subHeading}>{data?.description}</Text>
      <Text style={styles.subHeading}>{details?.formatted_address}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={styles.subHeading}> {reports.length} report(s) in area</Text>
        <Text style={styles.subHeading}> x - most report types</Text>
      </View>
      <Image source={{ uri: details?.icon }} />
      <Image source={{ uri: details?.icon }} />
      <DistrictMap
        lat={details.geometry.location.lat}
        long={details.geometry.location.lng}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    color: colors.white,
    fontWeight: "bold",
  },

  subHeading: {
    fontSize: 18,
    color: colors.white,
    fontStyle: "italic",
  },
});
