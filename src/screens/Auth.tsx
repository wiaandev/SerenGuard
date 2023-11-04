import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../types/RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GlobalStyles } from "../utils/globals";
import { colors } from "../utils/colors";

type AuthScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Auth">;
};

export default function Auth({ navigation }: AuthScreenProps) {
  return (
    <ImageBackground
      style={[GlobalStyles.container, styles.container]}
      source={require("../assets/auth-screen.png")}
    >
      <SafeAreaView>
        <Text style={styles.heading}>SerenGuard</Text>
        <Text style={styles.tagline}>Report Crimes & inform your community </Text>

        <Button
          mode="contained"
          onPress={() => navigation.navigate("Register")}
          labelStyle={{color: colors.white}}
          style={{marginBottom: 10, marginTop: 100, backgroundColor: colors.orange}}
        >
          Register
        </Button>

        <Button mode="outlined" onPress={() => navigation.navigate("Login")} style={{backgroundColor: "transparent", marginVertical: 10}}>
          Login
        </Button>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 50,
    fontWeight: "800",
    color: colors.white,
    textAlign: 'center'
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.white,
    textAlign: 'center'
  },
  container: {
    justifyContent: 'center',
  }
});
