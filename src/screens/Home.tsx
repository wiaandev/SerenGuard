import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Platform,
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
          width: Dimensions.get("screen").width * 0.95,
          top: Platform.OS === "ios" ? 70 : 40,
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          padding: 10,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search Neighbourhood"
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
              height: 60,
              fontSize: 16,
            },
            listView: {
              width: Dimensions.get("screen").width * 0.9
            }
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
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 5
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
