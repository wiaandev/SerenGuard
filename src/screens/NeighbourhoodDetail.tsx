import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { colors } from "../utils/colors";

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
  const { data, details } = route.params;
  console.log(data);
  console.log(details);
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
        style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: 'center', marginVertical: 10 }}
      >
        <Text style={styles.subHeading}> 16 reports in area</Text>
        <Text style={styles.subHeading}> x - most report types</Text>
      </View>
      <Image source={{ uri: details?.icon }} />
      <Image source={{ uri: details?.icon }} />
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
