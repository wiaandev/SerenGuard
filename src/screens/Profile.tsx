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
// import { getOfficerReports } from "../firebase/firebase-db";
import { checkIsOfficer, onLogOut } from "../firebase/firebase-auth";
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
  let [userId, setUserId] = useState<any>();

  const logoutUser = () => {
    onLogOut();
    navigation.navigate("Login");
  };

  const renderItem = ({ item }: any) => {
    console.log(item);

    return <ReportCard {...item} />;
  };

  console.log(loggedInUser);
  console.log(getCurrentSignedInUser);

  useEffect(() => {
    getCurrentSignedInUser();

    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        const uuid = user.uid;
        console.log("USER :", uuid);
        setUserId(uuid as string);
        console.log("USER ID:", userId);

        checkIsOfficer(uuid)
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

  const getOfficersReports = async () => {
    const officerReports = await getOfficerReports(userId as string);
    setReports(officerReports);
  };

  useFocusEffect(
    useCallback(() => {
      getOfficersReports();
    }, [])
  );

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
          () => console.log("HEH", userId.uuid);
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
            Reports
          </Text>
          <FlatList data={reports} renderItem={renderItem} />
        </>
      )}
      <Button
        onPress={logoutUser}
        mode="contained"
        style={{ marginTop: "auto" }}
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
