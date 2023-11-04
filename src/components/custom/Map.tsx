import { StyleSheet, Dimensions, View, Image, Platform } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import MapView, {
  Callout,
  Heatmap,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { UserLocationContext } from "../../context/user-location.context";
import { Badge, FAB, Text } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/user.context";
import { checkIsOfficer } from "../../firebase/firebase-auth";
import { getAuth } from "firebase/auth";
import { mapStyle } from "../../constants/mapStyle";
import { colors } from "../../utils/colors";
import { getAllReports } from "../../firebase/firebase-db";
import { ReportType } from "../../types/ReportTypes";
import { GlobalStyles } from "../../utils/globals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timestamp } from "firebase/firestore";

const Map = () => {
  const { loggedInUser, getCurrentSignedInUser } = useContext(UserContext);

  const [isOfficer, setIsOfficer] = useState<boolean>(false);
  const [reports, setReports] = useState<[]>();
  const [points, setPoints] = useState<
    { latitude: number; longitude: number; weight: number }[]
  >([]);

  useEffect(() => {
    getCurrentSignedInUser();

    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

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
  const onNavAlerts = () => {
    navigator.navigate("Alert" as never);
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


  const getReports = async () => {
    const reports: any = await getAllReports();
    setReports(reports);

    // for (let i = 0; i < reports.length; i++) {
    //   let report = reports[i];

    //   if (report.lat && report.long) { // Check if lat and long fields exist in the report
    //     setPoints((prevPoints) => [
    //       ...prevPoints,
    //       { latitude: report.lat, longitude: report.long, weight: 1 },
    //     ]);
    //   }
    // }
  };

  useFocusEffect(
    useCallback(() => {
      getReports();
    }, [])
  );

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (error) {
      console.log("Error @clearOnboarding", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        customMapStyle={mapStyle}
      >
        {/* <Heatmap
          points={points}
          radius={40}
          opacity={1}
          gradient={{
            colors: ["black", "purple", "red", "orange", "white"],
            startPoints:
              Platform.OS === "ios"
                ? [0.01, 0.04, 0.1, 0.45, 0.5]
                : [0.1, 0.25, 0.5, 0.75, 1],
            colorMapSize: 2000,
          }}
        ></Heatmap> */}
        {reports?.map((report: ReportType) => {
          const reportTimestamp = report.createdAt;
          const currentTimestamp = Timestamp.now();

          // Calculate the time difference in milliseconds
          const timeDifference =
            currentTimestamp.toMillis() - reportTimestamp.toMillis();

          // Calculate the time difference in hours
          const hoursDifference = timeDifference / (60 * 60 * 1000);

          // Create a string that indicates the time difference
          let calculatedDate = "now";

          if (hoursDifference >= 2 && hoursDifference < 3) {
            calculatedDate = "2 hours ago";
          } else if (hoursDifference >= 3) {
            calculatedDate = "3+ hours ago";
          }
          return (
            <>
              <Marker
                coordinate={{
                  latitude: parseFloat(report?.lat) || 0, // Use parseFloat to ensure it's a number
                  longitude: parseFloat(report?.long) || 0, // Use parseFloat to ensure it's a number
                }}
                image={require("../../assets/pin.png")}
                title="Report"
                description="Report Description"
              >
                <Callout tooltip>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>{report.name}</Text>
                    <Text style={styles.address}>{report.address}</Text>
                    <Text style={styles.address}>
                      {report.crimeType} committed
                    </Text>
                    <Text style={styles.time}>Reported {calculatedDate}</Text>
                    <Text style={styles.time}>{report.createdAt.toDate().toString()}</Text>
                    <Text>
                      <Image
                        style={styles.image}
                        source={{ uri: report?.img as string }}
                        resizeMode="contain"
                      />{" "}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            </>
          );
        })}
      </MapView>
      <View style={[GlobalStyles.flexCol, styles.fabContainer]}>
        {/* <View>
          <FAB
            icon="bullhorn"
            label="Alerts"
            style={styles.fabAlert}
            onPress={onNavAlerts}
            animated={true}
            color={colors.black}
          />
          <Badge style={styles.badgeStyle}>12</Badge>
        </View> */}
        {/* <FAB
          label="Clear Async Storage"
          style={styles.fabAlert}
          onPress={clearOnboarding}
          animated={true}
          color={colors.black}
        /> */}
        {isOfficer && (
          <FAB
            icon="plus"
            color={colors.white}
            label="Report"
            style={styles.fab}
            onPress={addReport}
            animated={true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    height: 300,
  },
  fab: {
    backgroundColor: colors.orange,
  },
  fabAlert: {
    backgroundColor: colors.white,
  },
  fabContainer: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 100,
    gap: 20,
  },
  container: {
    backgroundColor: "brown",
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
  },
  address: {
    fontSize: 10,
    color: colors.black,
    fontStyle: "italic",
  },
  time: {
    fontSize: 10,
    color: colors.black,
    fontStyle: "italic",
    opacity: 0.5,
  },
  badgeStyle: {
    position: "absolute",
    top: -5,
    right: -4,
  },
});

export default Map;
