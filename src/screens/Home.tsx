import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, IconButton, MD3Colors } from "react-native-paper";
import { checkIsOfficer, onLogOut } from "../firebase/firebase-auth";
import { UserContext } from "../context/user.context";
import { getAuth } from "firebase/auth";
import { colors } from "../utils/colors";
import Map from "../components/custom/Map";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "../../config/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function Home({ navigation }: HomeScreenProps) {
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

  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          position: "absolute",
          zIndex: 999,
          width: Dimensions.get("screen").width * 0.9,
          top: 60,
          marginHorizontal: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={3}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: "en", // language of the results
          }}
          onPress={(data, details = null) => {
            console.log("DATA: ", data);
            console.log("DETAILS: ", details);
            navigation.navigate("Detail", {
              data,
              details,
            } as any);
          }}
          onFail={(error) => console.error(error)}
          debounce={20}
          keepResultsAfterBlur={false}
          isRowScrollable={false}
          styles={{
            textInput: {
              height: 70,
              padding: 10,
              fontSize: 16,
            },
          }}
        />

        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{ uri: loggedInUser?.photoURL }}
            style={styles.profileImg}
          />
        </Pressable>
      </View>

      <Map />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
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
  map: {
    position: "absolute",
    zIndex: 9999,
  },
});
