import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationSearch from "../components/custom/LocationSearch";
import { Avatar, Button, IconButton, MD3Colors } from "react-native-paper";
import { checkIsOfficer, onLogOut } from "../firebase/firebase-auth";
import { UserContext } from "../context/user.context";
import { getAuth } from "firebase/auth";
import { colors } from "../utils/colors";

export default function Home() {
  const { loggedInUser, getCurrentSignedInUser } = useContext(UserContext);

  const [isOfficer, setIsOfficer] = useState<boolean>(false);

  const logoutUser = () => {};

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

  return (
    <SafeAreaView>
      <View style={{position: 'absolute', top: 200, zIndex: 999, backgroundColor: 'white', padding: 30, left: 0, alignItems: 'center'}}>
        {isOfficer ? (
          <IconButton icon="police-badge" size={30} iconColor={colors.orange} />
        ) : (
          <IconButton
            icon={"home-account"}
            size={30}
            iconColor={colors.black}
          />
        )}
        <Text style={isOfficer ? styles.officerStyle : styles.userStyle}>
          {loggedInUser?.displayName}
        </Text>
        <Text style={{ fontWeight: "bold" }}>{loggedInUser?.email}</Text>
        <Image
          source={{ uri: loggedInUser?.photoURL }}
          style={styles.profileImg}
        />
      </View>
      <LocationSearch />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userStyle: {
    position: "absolute",
    top: 550,
    backgroundColor: colors.black,
    padding: 20,
    zIndex: 999,
    elevation: 5,
    margin: 10,
    borderRadius: 20,
    color: colors.orange,
    fontWeight: "bold",
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  officerStyle: {
    position: "absolute",
    top: 550,
    backgroundColor: colors.black,
    padding: 20,
    zIndex: 999,
    elevation: 5,
    margin: 10,
    borderRadius: 20,
    color: colors.white,
    fontWeight: "bold",
  },
});
