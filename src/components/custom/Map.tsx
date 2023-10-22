import { StyleSheet, Dimensions, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../context/user-location.context";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../context/user.context";
import { checkIsOfficer } from "../../firebase/firebase-auth";
import { getAuth } from "firebase/auth";
import { mapStyle } from "../../constants/mapStyle";

const Map = () => {
  const { loggedInUser, getCurrentSignedInUser } = useContext(UserContext);

  const [isOfficer, setIsOfficer] = useState<boolean>(false);

  useEffect(() => {
    getCurrentSignedInUser();

    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);

        checkIsOfficer(uid)
          .then((result: any) => {
            setIsOfficer(result);
          })
          .catch((error) => {
            console.log("error checking if user is officer", error);
            setIsOfficer(false);
          });
      } else {
        setIsOfficer(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const navigator = useNavigation();

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });

  const addReport = () => {
    navigator.navigate("Report" as never);
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
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        customMapStyle={mapStyle}
      />
      {isOfficer && (
        <FAB
          icon="bullhorn"
          label="Report"
          style={styles.fab}
          onPress={addReport}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 100,
  },
  container: {
    backgroundColor: "brown",
  },
});

export default Map;
