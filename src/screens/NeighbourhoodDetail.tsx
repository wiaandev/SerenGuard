import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { MapOverlay, Overlay } from "react-native-maps";

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
    <SafeAreaView>
      <Text onPress={() => navigation.navigate("Home")}>Go Back</Text>
      <Text>{details?.place_id}</Text>
      <Text>Neighbourhood: {details?.vicinity}</Text>
      <Text>{data?.description}</Text>
      <Text>{details?.formatted_address}</Text>
      <Image source={{ uri: details?.icon }} />
      <Image source={{ uri: details?.icon }} />
    </SafeAreaView>
  );
}
