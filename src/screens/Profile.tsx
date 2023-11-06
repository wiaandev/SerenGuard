import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { UserContext } from "../context/user.context";
import { ResponseType } from "axios";
import { getAuth } from "firebase/auth";
import { colors } from "../utils/colors";
import { Button } from "react-native-paper";
import {
  checkIsOfficer,
  getCurrentUser,
  onLogOut,
} from "../firebase/firebase-auth";
import { getOfficerReports } from "../firebase/firebase-db";
import { useFocusEffect } from "@react-navigation/native";
import ReportCard from "../components/custom/ReportCard";
import { ReportCardType } from "../types/ReportCardType";

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Profile">;
};

export default function Profile({ navigation }: ProfileScreenProps) {
  const { loggedInUser, getCurrentSignedInUser } = useContext(UserContext);
  const [reports, setReports] = useState<any>({});
  const [isOfficer, setIsOfficer] = useState<boolean>();
  let [userId, setUserId] = useState<string>();

  const logoutUser = () => {
    onLogOut();
    navigation.navigate("Login");
  };

  const renderItem = ({ item }: any) => {
    return <ReportCard {...item} />;
  };

  console.log(loggedInUser);
  console.log(getCurrentSignedInUser);

  const testOfficerReportGetter = async () => {
    const currentlySignedInUser = loggedInUser;

    if (
      currentlySignedInUser.uid !== null ||
      currentlySignedInUser.uid !== undefined
    ) {
      console.log(currentlySignedInUser.uid, "Something");
      const officerReports = await getOfficerReports(
        currentlySignedInUser.uid as string
      );
      setReports(officerReports);
    } else {
      console.log("Undefined, check in Firebase");
    }
  };

  useEffect(() => {
    testOfficerReportGetter();
  }, []);

  useEffect(() => {
    let unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        const uuid = user.uid;
        setUserId(uuid);

        checkIsOfficer(uuid)
          .then((result: any) => {
            setIsOfficer(result);
          })
          .catch((error) => {
            console.log("error checking if user is an officer", error);
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

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.black, gap: 10, padding: 20 }}
    >
      <Text
        onPress={() => navigation.goBack()}
        style={{ alignSelf: "flex-start", color: colors.white }}
      >
        Go Back
      </Text>
      <Image
        source={{ uri: loggedInUser?.photoURL }}
        style={styles.profileImg}
      />
      <Text
        style={{
          color: colors.white,
          fontWeight: "700",
          fontSize: 32,
          alignSelf: "center",
        }}
        onPress={() => {
          () => console.log("HEH", userId);
        }}
      >
        {loggedInUser.displayName}
      </Text>
      <Text
        style={{
          color: colors.white,
          fontSize: 18,
          fontStyle: "italic",
          alignSelf: "center",
        }}
      >
        {loggedInUser.email}
      </Text>
      <Text
        style={{
          color: colors.white,
          fontSize: 18,
          fontStyle: "italic",
          alignSelf: "center",
        }}
      >
        {loggedInUser.createdAt}
      </Text>

      {isOfficer && (
        <>
          <Text
            style={{ color: colors.orange, fontSize: 18, fontWeight: "700" }}
          >
            Your Reports
          </Text>
          <FlatList
            data={reports}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
      <Button
        onPress={logoutUser}
        mode="contained"
        style={{ marginTop: "auto", backgroundColor: colors.orange }}
        buttonColor={colors.orange}
      >
        Logout
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
});
