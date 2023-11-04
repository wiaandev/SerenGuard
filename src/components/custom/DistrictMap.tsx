import { StyleSheet, Dimensions, View, Image, Platform } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Text } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { mapStyle } from "../../constants/mapStyle";
import { colors } from "../../utils/colors";
import { getAllReports } from "../../firebase/firebase-db";
import { ReportType } from "../../types/ReportTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timestamp } from "firebase/firestore";

const DistrictMap = ({ long, lat }: any) => {
  const [reports, setReports] = useState<[]>();

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

  useEffect(() => {
    setMapRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  }, []);

  const getReports = async () => {
    const reports: any = await getAllReports();
    setReports(reports);
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
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
      >
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
                    <Text style={styles.time}>
                      {report.createdAt.toDate().toString()}
                    </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width * 0.93,
    height: Dimensions.get("screen").height * 0.3,
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

export default DistrictMap;
