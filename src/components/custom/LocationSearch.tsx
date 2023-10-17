import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../context/user-location.context";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "../../../config/api";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationSearch = () => {
  const navigator = useNavigation();

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });

  const addReport = () => {
    navigator.navigate("ImageTest" as never);
  };

  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, []);

  console.log(location);

  return (
    <SafeAreaView style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2}
        fetchDetails={true}
        query={{
          key: GOOGLE_MAPS_KEY,
          language: "en", // language of the results
        }}
        onPress={(data, details = null) => console.log(details)}
        onFail={(error) => console.error(error)}
      />
      <MapView
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
      />
      <FAB
        icon="bullhorn"
        label="Report"
        style={styles.fab}
        onPress={addReport}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.9,
    top: 50,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 100,
  },
  container: {
    backgroundColor: "gray",
  },
});

export default LocationSearch;
